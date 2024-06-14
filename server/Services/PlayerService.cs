using server.Dtos;

namespace server.Services;

public class PlayerService
{
  private static readonly Queue<OnlinePlayer> PlayerPool = new Queue<OnlinePlayer>(); //onlineplayer -> connId,username
  private readonly Dictionary<string, GameConnectionDto> activeGames = new Dictionary<string, GameConnectionDto>();
  public event Action<GameConnectionDto> GameReady;
  public void AddPlayerToQueue(OnlinePlayer player)
  {
    lock (PlayerPool)
    {
      PlayerPool.Enqueue(player);
    }
    if (PlayerPool.Count >= 2)
    {
      var gameDto = CreateGameParticipants();
      GameReady?.Invoke(gameDto);
    }
  }

  public GameConnectionDto CreateGameParticipants()
  {
    lock (PlayerPool)
    {
      if (PlayerPool.Count < 2)
      {
        throw new InvalidOperationException("Not enough players to create a new game.");
      }

      OnlinePlayer participant1 = PlayerPool.Dequeue();
      OnlinePlayer participant2 = PlayerPool.Dequeue();

      GameConnectionDto gameDto = new()
      {
        player1 = participant1,
        player2 = participant2
      };
      activeGames[gameDto.GameIdentifier] = gameDto;
      return gameDto;
    }
  }

  public GameConnectionDto GetGroupByGroupName(string groupName)
  {
    if (activeGames.TryGetValue(groupName, out var gameConnection))
    {
      return gameConnection;
    }
    throw new KeyNotFoundException("Group not found");
  }

  public string GetGroupName(string username)
  {
    List<string> activeIds = ActiveGameIdentifiers();
    return activeIds.FirstOrDefault(id => id.Contains(username, StringComparison.OrdinalIgnoreCase)) ?? "Game id not found";
  }

  public List<string> ActiveGameIdentifiers()
  {
    return activeGames.Keys.ToList();
  }

    

    internal void RemoveActiveGame(string groupName)
    {
        lock (activeGames)
        {
          activeGames.Remove(groupName);
        }
    }
}