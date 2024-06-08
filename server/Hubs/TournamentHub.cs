using System.Security.Claims;
using Microsoft.AspNetCore.SignalR;
using server.Data;
using server.Models;

namespace server.Hubs;

public class TournamentHub : Hub
{
  private readonly ServerDbContext _context;
  public static Queue<string> GamesJoined = new Queue<string>();
  public static List<string> ActiveGames = new List<string>();
  public TournamentHub(ServerDbContext context)
  {
    _context = context;
  }
  //create tournaments for ppl to join
  //4,6,8 players
  //
}