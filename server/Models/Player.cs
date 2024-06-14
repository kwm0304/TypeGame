using Microsoft.AspNetCore.Identity;

namespace server.Models;

public class Player : IdentityUser
{
    public int GamesPlayed { get; set; }
    public int GamesWon { get; set; }
    public int GamesLost { get; set; }
    public double WinRate() => (double)GamesWon / (double)GamesPlayed;
    public int Rank { get; set; }
    public List<Game> Games { get; set; } = new();
    public List<MutliPlayerGame> MultiPlayerGames { get; set; } = new();
    public double AverageGameTime { get; set; }
}
