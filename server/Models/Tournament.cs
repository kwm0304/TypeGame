using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

public class Tournament
{
    [Key]
    public int TournamentId { get; set; }
    public List<Player> Players { get; set; }
    public List<Game> Games { get; set; }
    public string? WinnerId { get; set; }
    [ForeignKey("WinnerId")]
    public Player Winner { get; set; }
    public string? RunnerUpId { get; set; }
    [ForeignKey("RunnerUpId")]
    public Player RunnerUp { get; set; }
    public string? ThirdPlaceId { get; set; }
    [ForeignKey("ThirdPlaceId")]
    public Player ThirdPlace { get; set; }
    public bool IsComplete { get; set; }
}
