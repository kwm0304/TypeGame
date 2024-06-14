namespace server.Dtos;

public class MultiPlayerGameDto
{
    public double WinnerTime { get; set; }
    public double Player1WordsPerMinute { get; set; }
    public double Player2WordsPerMinute { get; set; }
    public double Player1Accuracy { get; set; }
    public double Player2Accuracy { get; set; }
    public string Player1Username { get; set; }
    public string Player2Username { get; set; }
}
