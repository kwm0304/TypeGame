// PlayerService.cs
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using server.Dtos;

public class PlayerService
{
  private readonly Queue<OnlinePlayer> _playerPool = new Queue<OnlinePlayer>();
  private readonly Dictionary<string, GameConnectionDto> _activeGames = new Dictionary<string, GameConnectionDto>();
  private readonly IServiceProvider _serviceProvider;

  public event Func<GameConnectionDto, Task> GameReady;

  public PlayerService(IServiceProvider serviceProvider)
  {
    _serviceProvider = serviceProvider;
  }

  public void AddPlayerToQueue(OnlinePlayer player)
  {
    lock (_playerPool)
    {
      _playerPool.Enqueue(player);
    }

    if (_playerPool.Count >= 2)
    {
      var gameDto = CreateGameParticipants();
      _ = OnGameReady(gameDto);
    }
  }

  private GameConnectionDto CreateGameParticipants()
  {
    Console.WriteLine("PlayerPool count: " + _playerPool.Count + "--------------------------------");
    lock (_playerPool)
    {
      OnlinePlayer participant1 = _playerPool.Dequeue();
      OnlinePlayer participant2 = _playerPool.Dequeue();
      
Console.WriteLine("PlayerPool count after deque: " + _playerPool.Count + "--------------------------------");
      Console.WriteLine($"Creating game between {participant1.username} and {participant2.username}");

      var gameDto = new GameConnectionDto
      {
        player1 = participant1,
        player2 = participant2
      };
      _activeGames[gameDto.GameIdentifier] = gameDto;
      return gameDto;
    }
  }

  private async Task OnGameReady(GameConnectionDto gameDto)
  {
    if (GameReady != null)
    {
      using var scope = _serviceProvider.CreateScope();
      var gameService = scope.ServiceProvider.GetRequiredService<GameService>();
      await gameService.HandleGameReady(gameDto);
    }
  }

  public GameConnectionDto GetGroupByGroupName(string groupName)
  {
    if (_activeGames.TryGetValue(groupName, out var gameConnection))
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
    return _activeGames.Keys.ToList();
  }

  public void RemoveActiveGame(string groupName)
  {
    lock (_activeGames)
    {
      _activeGames.Remove(groupName);
    }
  }
}