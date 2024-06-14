using System.Security.Claims;
using Microsoft.AspNetCore.SignalR;
using server.Data;
using server.Dtos;
using server.Interfaces;
using server.Services;

namespace server.Hubs;

public class GameHub : Hub
{
  private readonly PlayerService _playerService;
  private readonly IApiService _apiService;
  private readonly ServerDbContext _context;

  public GameHub(PlayerService playerService, IApiService apiService, ServerDbContext context)
  {
    _playerService = playerService;
    _apiService = apiService;
    _playerService.GameReady += OnGameReady;
    _context = context;
  }

  public override async Task OnConnectedAsync()
  {
    string userName = Context.User.Identity.Name;
    if (!string.IsNullOrEmpty(userName))
    {
      Console.WriteLine("UserIdentifier is null");
      foreach (var claim in Context.User.Claims)
      {
        Console.WriteLine($"Claim {claim.Type}: {claim.Value}");
      }

      // Your custom logic for setting newPlayer
      var newPlayer = new OnlinePlayer
      {
        username = userName, // Use the name claim
        connectionId = Context.ConnectionId
        // Additional player properties
      };
      _playerService.AddPlayerToQueue(newPlayer);
      // Notify clients that a user has connected
      await Clients.All.SendAsync("UserConnected");

      // Log the new player connection
      Console.WriteLine($"New player connected: {newPlayer.username}, Connection ID: {newPlayer.connectionId}");
    }

  }


  public override async Task OnDisconnectedAsync(Exception ex)
  {
    await base.OnDisconnectedAsync(ex);
  }

  private async Task OnGameReady(GameConnectionDto conn)
  {
    await CreateGame(conn);
  }

  public async Task CreateGame(GameConnectionDto conn)
  {
    string username1 = conn.player1.username;
    Console.WriteLine("Username from creategame: " + username1);
    await Groups.AddToGroupAsync(conn.player1.connectionId, conn.GameIdentifier);
    await Groups.AddToGroupAsync(conn.player2.connectionId, conn.GameIdentifier);

    var content = await _apiService.GetTextAsync();
    await Clients.Group(conn.GameIdentifier).SendAsync("GameText", conn.player1.username, conn.player2.username, content);
  }

  public async Task InGameUpdate(TextUpdate update)
  {
    string username = update.Sender;
    string groupName = _playerService.GetGroupName(username);
    await Clients.OthersInGroup(groupName).SendAsync("ReceiveUpdate", update);
  }

  public async Task EndGame()
  {
    string username = Context.User.Identity.Name;
    string groupName = _playerService.GetGroupName(username);
    if (groupName != null)
    {
      GameConnectionDto game = _playerService.GetGroupByGroupName(groupName);
      await Groups.RemoveFromGroupAsync(game.player1.connectionId, groupName);
      await Groups.RemoveFromGroupAsync(game.player2.connectionId, groupName);
      _playerService.RemoveActiveGame(groupName);
      await OnDisconnectedAsync(null);
    }
    else
    {
      Console.WriteLine("Game has already ended");
      await OnDisconnectedAsync(null);
    }
  }
}
