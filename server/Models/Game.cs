using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

public class Game
{
  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public int GameId { get; set; }
  public string? WinnerId { get; set; }
  [ForeignKey("WinnerId")]
  public Player Winner { get; set; } 
  public List<Player> Participants { get; set; }
  public bool IsComplete { get; set; }
  public double WinnerTime { get; set; }
  public double WordsPerMinute { get; set; }
  public double Accuracy { get; set; }
  public DateTime PlayedAt { get; set; }
}