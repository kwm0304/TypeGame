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
      var newPlayer = new OnlinePlayer
      {
        username = userName, 
        connectionId = Context.ConnectionId
      };
      _playerService.AddPlayerToQueue(newPlayer);
      await Clients.All.SendAsync("UserConnected");
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
