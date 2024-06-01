using System.Security.Claims;
using Microsoft.AspNetCore.SignalR;
using server.Data;
using server.Models;

namespace server.Hubs;

public class GameHub : Hub
{
  private readonly ServerDbContext _context;
  public static Queue<string> GamesJoined = new Queue<string>();
  public static List<string> ActiveGames = new List<string>();
  public GameHub(ServerDbContext context)
  {
    _context = context;
  }

  public override Task OnConnectedAsync()
  {
    var UserId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);
    if (!string.IsNullOrEmpty(UserId))
    {
      var username = _context.Users.FirstOrDefault(u => u.Id == UserId).UserName;
      Clients.Users(HubConnections.OnlineUsers()).SendAsync("ReceivedUserConnection", UserId, username);
      HubConnections.AddUserConnection(UserId, Context.ConnectionId);
    }
    return base.OnConnectedAsync();
  }

  public override Task OnDisconnectedAsync(Exception? exception)
  {
    var UserId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);
    if (HubConnections.HasUserConnection(UserId, Context.ConnectionId))
    {
      var UserConnections = HubConnections.Users[UserId];
      UserConnections.Remove(Context.ConnectionId);

      HubConnections.Users.Remove(UserId);
      if (UserConnections.Any())
      {
        HubConnections.Users.Add(UserId, UserConnections);
      }
    }
    if (!string.IsNullOrEmpty(UserId))
    {
      var userName = _context.Users.FirstOrDefault(u => u.Id == UserId).UserName;
      Clients.Users(HubConnections.OnlineUsers()).SendAsync("ReceivedUserDisconnected", UserId, userName);
      HubConnections.AddUserConnection(UserId, Context.ConnectionId);
    }
    return base.OnDisconnectedAsync(exception);
  }

  //player will be assigned to the next game in the unfilled game queue
  public async Task JoinGame()
  {
    var userId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);
    if (!string.IsNullOrEmpty(userId))
    {
      var user = _context.Users.FirstOrDefault(u => u.Id == userId);
      if (user != null)
      {
        Game game = null;
        if (GamesJoined.Count > 0)
        {
          foreach (var gameIdStr in GamesJoined)
          {
            var queuedGame = _context.Games.FirstOrDefault(g => g.GameId == int.Parse(gameIdStr));
            if (queuedGame != null && queuedGame.Participants.Count < 2)
            {
              game = queuedGame;
              break;
            }
          }
        }

        if (game == null)
        {
          game = new Game
          {
            Participants = new List<Player>(),
            IsComplete = false
          };
          _context.Games.Add(game);
          _context.SaveChanges();
          GamesJoined.Enqueue(game.GameId.ToString());
        }

        game.Participants.Add(user);
        _context.SaveChanges();
        await Groups.AddToGroupAsync(Context.ConnectionId, game.GameId.ToString());

        if (game.Participants.Count == 2)
        {
          var tempQueue = new Queue<string>();
          while (GamesJoined.Count > 0)
          {
            var nowActiveGame = GamesJoined.Dequeue();
            if (nowActiveGame != game.GameId.ToString())
            {
              tempQueue.Enqueue(nowActiveGame);
            }
          }
          GamesJoined = tempQueue;
          ActiveGames.Add(game.GameId.ToString());

          // Start the game when there are 2 participants
          await StartGame(game.GameId);
        }
        await Clients.Group(game.GameId.ToString()).SendAsync("ReceivedGameJoined", game.GameId, userId);
      }
    }
  }

  public async Task LeaveGame()
  {
    var userId = Context.User.FindFirstValue(ClaimTypes.NameIdentifier);
    if (!string.IsNullOrEmpty(userId))
    {
      var user = _context.Users.FirstOrDefault(u => u.Id == userId);
      if (user != null)
      {
        var game = _context.Games.FirstOrDefault(g => g.Participants.Any(p => p.Id == userId));
        if (game != null)
        {
          //remove from participants
          game.Participants.Remove(user);
          _context.SaveChanges();
          //remove player from group
          await Groups.RemoveFromGroupAsync(Context.ConnectionId, game.GameId.ToString());
          //remove from queue
          var tempQueue = new Queue<string>();
          while (GamesJoined.Count > 0)
          {
            var dequeuedGame = GamesJoined.Dequeue();
            if (dequeuedGame != game.GameId.ToString())
            {
              tempQueue.Enqueue(dequeuedGame);
            }
          }
          GamesJoined = tempQueue;
          //delete from db
          _context.Games.Remove(game);
          _context.SaveChanges();

          await Clients.Group(game.GameId.ToString()).SendAsync("ReceivedGameLeft", game.GameId, userId);
        }
      }
    }
  }

  public async Task StartGame(int gameId)
  {
    var game = _context.Games.FirstOrDefault(g => g.GameId == gameId);
    if (game != null && game.Participants.Count == 2 && !game.IsComplete)
    {
      game.IsComplete = false; 
      _context.SaveChanges();

      await Clients.Group(gameId.ToString()).SendAsync("GameStarted", gameId);
    }
  }
}
