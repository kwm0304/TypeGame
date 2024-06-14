using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

public class MutliPlayerGame
{
  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public int MultiPlayerGameId { get; set; }
  public string WinnerId { get; set; }
  [ForeignKey("WinnerId")]
  public Player Winner { get; set; }
  public List<Player> Participants { get; set; }
  public bool IsComplete { get; set; }
  public double WinnerTime { get; set; }
  public double Player1WordsPerMinute { get; set; }
  public double Player2WordsPerMinute { get; set; }
  public double Player1Accuracy { get; set; }
  public double Player2Accuracy { get; set; }
  public DateTime PlayedAt { get; set; }
}
