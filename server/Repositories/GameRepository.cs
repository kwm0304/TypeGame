using server.Data;
using server.Interfaces;
using server.Models;

namespace server.Repositories;

public class GameRepository : IGameRepository
{
    private readonly ServerDbContext _context;
    public GameRepository(ServerDbContext context)
    {
        _context = context;
    }

    public async Task SaveGame(Game game)
    {
        _context.Games.Add(game);
        await _context.SaveChangesAsync();
    }
}
