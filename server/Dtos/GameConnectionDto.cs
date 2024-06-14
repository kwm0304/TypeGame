namespace server.Dtos;

public class GameConnectionDto
{
    public OnlinePlayer player1 { get; set; }
    public OnlinePlayer player2 { get; set; }
    public string GameIdentifier => $"{player1.username}_{player2.username}";
    public string GetConnectionIdByUsername(string Username)
    {
        if (player1.username == Username) return player1.connectionId;
        if (player2.username == Username) return player2.connectionId;
        throw new ArgumentException("Username not found in this game");
    }
}
