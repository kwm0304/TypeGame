using server.Models;

namespace server.Interfaces;

public interface IGameRepository
{
    Task SaveGame(Game game);
    Task SaveMultiPlayerGame(MutliPlayerGame game);
}
