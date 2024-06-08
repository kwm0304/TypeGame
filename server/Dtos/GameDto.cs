namespace server.Dtos;

public class GameDto
{
    public double WinnerTime { get; set; }
    public double WordsPerMinute { get; set; }
    public double Accuracy { get; set; }
    public string Player1Username { get; set; }
    public string Player2Username { get; set; }
}
