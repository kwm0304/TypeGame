namespace server.Dtos;

public class GameConnectionDto
{
    public Tuple<string, string> PlayerNames { get; set; }
    public string GameIdentifier =>$"{PlayerNames.Item1}_{PlayerNames.Item2}";
    public GameConnectionDto(string player1, string player2)
    {
        PlayerNames = new Tuple<string, string>(player1, player2);
    }
    
}
