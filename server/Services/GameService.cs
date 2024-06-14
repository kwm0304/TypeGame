using System.Threading.Tasks;
using server.Dtos;
using Microsoft.AspNetCore.SignalR;
using server.Hubs;
using server.Interfaces;

public class GameService
{
    private readonly IHubContext<GameHub> _hubContext;
    private readonly IApiService _apiService;

    public GameService(IHubContext<GameHub> hubContext, IApiService apiService)
    {
        _hubContext = hubContext;
        _apiService = apiService;
    }

    public async Task HandleGameReady(GameConnectionDto conn)
    {
        await _hubContext.Groups.AddToGroupAsync(conn.player1.connectionId, conn.GameIdentifier);
        await _hubContext.Groups.AddToGroupAsync(conn.player2.connectionId, conn.GameIdentifier);
        var content = await _apiService.GetTextAsync();
        await _hubContext.Clients.Group(conn.GameIdentifier).SendAsync("GameText", conn.player1.username, conn.player2.username, content);
    }
}
