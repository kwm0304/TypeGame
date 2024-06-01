using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data;

public class ServerDbContext : IdentityDbContext<Player>
{
  public DbSet<Game> Games { get; set; }
  public DbSet<Tournament> Tournaments { get; set; }

  public ServerDbContext(DbContextOptions<ServerDbContext> options)
      : base(options)
  {
  }

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    base.OnModelCreating(modelBuilder);

    modelBuilder.Entity<Player>()
        .HasMany(p => p.Games)
        .WithMany(g => g.Participants)
        .UsingEntity<Dictionary<string, object>>(
            "PlayerGame",
            j => j.HasOne<Game>().WithMany().HasForeignKey("GameId"),
            j => j.HasOne<Player>().WithMany().HasForeignKey("PlayerId"));

    modelBuilder.Entity<Game>()
        .HasOne(g => g.Winner)
        .WithMany()
        .HasForeignKey(g => g.WinnerId)
        .OnDelete(DeleteBehavior.Restrict);

    modelBuilder.Entity<Player>()
        .HasMany(p => p.Tournaments)
        .WithMany(t => t.Players)
        .UsingEntity<Dictionary<string, object>>(
            "PlayerTournament",
            j => j.HasOne<Tournament>().WithMany().HasForeignKey("TournamentId"),
            j => j.HasOne<Player>().WithMany().HasForeignKey("PlayerId"));

    modelBuilder.Entity<Tournament>()
        .HasOne(t => t.Winner)
        .WithMany()
        .HasForeignKey(t => t.WinnerId)
        .OnDelete(DeleteBehavior.Restrict);

    modelBuilder.Entity<Tournament>()
        .HasOne(t => t.RunnerUp)
        .WithMany()
        .HasForeignKey(t => t.RunnerUpId)
        .OnDelete(DeleteBehavior.Restrict);

    modelBuilder.Entity<Tournament>()
        .HasOne(t => t.ThirdPlace)
        .WithMany()
        .HasForeignKey(t => t.ThirdPlaceId)
        .OnDelete(DeleteBehavior.Restrict);

    modelBuilder.Entity<Tournament>()
        .HasMany(t => t.Games)
        .WithOne()
        .HasForeignKey(g => g.GameId)
        .OnDelete(DeleteBehavior.Cascade);
  }
}