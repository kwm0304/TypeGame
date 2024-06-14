using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

public class Game
{
  [Key]
  [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
  public int GameId { get; set; }
  public string? PlayerId { get; set; }
  [ForeignKey("PlayerId")]
  public Player User { get; set; }
  public bool IsComplete { get; set; }
  public double Time { get; set; }
  public double WordsPerMinute { get; set; }
  public double Accuracy { get; set; }
  public DateTime PlayedAt { get; set; }
}