using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data;

public class ServerDbContext : IdentityDbContext<Player>
{
    public DbSet<Game> Games { get; set; }
    public DbSet<MutliPlayerGame> MultiPlayerGames { get; set; }


    public ServerDbContext(DbContextOptions<ServerDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Player>()
                .HasMany(p => p.Games)
                .WithOne(g => g.User)
                .HasForeignKey(g => g.PlayerId)
                .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Player>()
            .HasMany(p => p.MultiPlayerGames)
            .WithMany(m => m.Participants)
            .UsingEntity<Dictionary<string, object>>(
                "PlayerMultiPlayerGame",
                j => j.HasOne<MutliPlayerGame>().WithMany().HasForeignKey("MultiPlayerGameId"),
                j => j.HasOne<Player>().WithMany().HasForeignKey("PlayerId"));

        modelBuilder.Entity<MutliPlayerGame>()
            .HasOne(m => m.Winner)
            .WithMany()
            .HasForeignKey(m => m.WinnerId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}