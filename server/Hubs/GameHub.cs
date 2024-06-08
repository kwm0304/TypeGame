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

  public GameHub(ServerDbContext context)
  {
    _context = context;
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
  }
  public async Task CreateGame(GameConnectionDto conn)
  {
    //pulls 2 players from queue
    string player1Id = conn.PlayerNames.Item1;
    Player player1 = await _context.Users.FirstOrDefaultAsync(p => p.UserName == player1Id);
    string player2Id = conn.PlayerNames.Item2;
    Player player2 = await _context.Users.FirstOrDefaultAsync(p => p.UserName == player2Id);
    //creates GameConnectionDto with usernames
    await Groups.AddToGroupAsync(Context.ConnectionId, conn.GameIdentifier);
    await Clients.Group(conn.GameIdentifier).SendAsync("GameStarted", player1, player2);
  }


}
