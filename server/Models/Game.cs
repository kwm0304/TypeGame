using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

public class Game
{
  [Key]
  public int GameId { get; set; }
  public string? WinnerId { get; set; }
  [ForeignKey("WinnerId")]
  public Player Winner { get; set; } 
  public List<Player> Participants { get; set; }
  public bool IsComplete { get; set; }
  public TimeSpan WinnerTime { get; set; }
  public int WordsPerMinute { get; set; }
  public double Accuracy { get; set; }
  public DateTime PlayedAt { get; set; }
}