using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos;
using server.Models;

namespace server.Hubs;

public class GameHub : Hub
{
  private readonly ServerDbContext _context;
  public static Queue<string> PlayerPool { get; set; } = new Queue<string>();
  public static Dictionary<string, string> ConnectionUserMap {get;set;} = new Dictionary<string,string>();
  public GameHub(ServerDbContext context)
  {
    _context = context;
  }

  public override async Task OnConnectedAsync()
  {
    string username = Context.User.Identity.Name;
    if (!string.IsNullOrEmpty(username))
    {
      AddPlayerToQueue(username);
    }
    await base.OnConnectedAsync();
  }

  public override async Task OnDisconnectedAsync(Exception ex)
  {
    string username;
    if (ConnectionUserMap.TryGetValue(Context.ConnectionId, out username))
    {
      PlayerPool = new Queue<string>(PlayerPool.Where(p => p != username));
      ConnectionUserMap.Remove(Context.ConnectionId);
    }
    await base.OnDisconnectedAsync(ex);
  }

  public void AddPlayerToQueue(string username)
  {
    PlayerPool.Enqueue(username);
    ConnectionUserMap[Context.ConnectionId] = username;
    CreateGameParticipants();
  }
  public void CreateGameParticipants()
  {
    //create new gameconnectiondto with to players from the queue
    if (PlayerPool.Count >= 2)
    {
      string player1 = PlayerPool.Dequeue();
      string player2 = PlayerPool.Dequeue();

      GameConnectionDto gameConn = new GameConnectionDto(player1, player2);
      CreateGame(gameConn).Wait();
    }
    else Console.WriteLine(PlayerPool.Count);
  }
  public async Task CreateGame(GameConnectionDto conn)
  {
    //pulls 2 players from queue
    string player1Id = conn.PlayerNames.Item1;
    string player2Id = conn.PlayerNames.Item2;

    string player1ConnId = ConnectionUserMap.FirstOrDefault(x => x.Value == player1Id).Key;
    string player2ConnId = ConnectionUserMap.FirstOrDefault(x => x.Value == player2Id).Key;

    string groupName = conn.GameIdentifier;
    //creates GameConnectionDto with usernames
    await Groups.AddToGroupAsync(player1ConnId, groupName);
    await Groups.AddToGroupAsync(player2ConnId, groupName);
    await Clients.Group(conn.GameIdentifier).SendAsync("GameStarted", player1Id, player2Id);
  }
}
