namespace server.Dtos;

public class GameDto
{
    public TimeSpan WinnerTime { get; set; }
    public int WordsPerMinute { get; set; }
    public double Accuracy { get; set; }
}
