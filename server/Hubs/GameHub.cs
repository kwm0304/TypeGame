using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Dtos;
using server.Models;
using server.Services;

namespace server.Hubs;

public class GameHub : Hub
{
  private readonly ServerDbContext _context;
  private readonly PlayerService _playerService;
  private readonly ApiService _apiService;
  public GameHub(ServerDbContext context, PlayerService playerService, ApiService apiService)
  {
    _context = context;
    _playerService = playerService;
    _apiService = apiService;
    _playerService.GameReady += OnGameReady;
  }

  public override async Task OnConnectedAsync()
  {
    OnlinePlayer newPlayer = new()
    {
      username = Context.User.Identity.Name,
      connectionId = Context.ConnectionId
    };
    _playerService.AddPlayerToQueue(newPlayer);
    await base.OnConnectedAsync();
  }

  public override async Task OnDisconnectedAsync(Exception ex)
  {
    
    await base.OnDisconnectedAsync(ex);
  }

  private async void OnGameReady(GameConnectionDto conn)
  {
    await CreateGame(conn);
  }
  
  public async Task CreateGame(GameConnectionDto conn)
  {
    await Groups.AddToGroupAsync(conn.player1.connectionId, conn.GameIdentifier);
    await Groups.AddToGroupAsync(conn.player2.connectionId, conn.GameIdentifier);
    var content = await _apiService.GetTextAsync();
    await Clients.Group(conn.GameIdentifier).SendAsync("GameText", content);
  }

  //in-game update
  public async Task InGameUpdate(TextUpdate update)
  {
    string groupName = _playerService.GetGroupName(update);
    await Clients.OthersInGroup(groupName).SendAsync("ReceiveUpdate", update);
  }
}