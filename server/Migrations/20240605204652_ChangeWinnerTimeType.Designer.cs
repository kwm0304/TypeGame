﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using server.Data;

#nullable disable

namespace server.Migrations
{
    [DbContext(typeof(ServerDbContext))]
    [Migration("20240605204652_ChangeWinnerTimeAndAverageGameTimeType")]
    partial class ChangeWinnerTimeAndAverageGameTimeType
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("PlayerGame", b =>
                {
                    b.Property<int>("GameId")
                        .HasColumnType("int");

                    b.Property<string>("PlayerId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("GameId", "PlayerId");

                    b.HasIndex("PlayerId");

                    b.ToTable("PlayerGame");
                });

            modelBuilder.Entity("PlayerTournament", b =>
                {
                    b.Property<string>("PlayerId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("TournamentId")
                        .HasColumnType("int");

                    b.HasKey("PlayerId", "TournamentId");

                    b.HasIndex("TournamentId");

                    b.ToTable("PlayerTournament");
                });

            modelBuilder.Entity("server.Models.Game", b =>
                {
                    b.Property<int>("GameId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<double>("Accuracy")
                        .HasColumnType("float");

                    b.Property<bool>("IsComplete")
                        .HasColumnType("bit");

                    b.Property<DateTime>("PlayedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("WinnerId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<double>("WinnerTime")
                        .HasColumnType("float");

                    b.Property<int>("WordsPerMinute")
                        .HasColumnType("int");

                    b.HasKey("GameId");

                    b.HasIndex("WinnerId");

                    b.ToTable("Games");
                });

            modelBuilder.Entity("server.Models.Player", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<double>("AverageGameTime")
                        .HasColumnType("float");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<int>("GamesPlayed")
                        .HasColumnType("int");

                    b.Property<int>("GamesWon")
                        .HasColumnType("int");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<int>("Rank")
                        .HasColumnType("int");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("server.Models.Tournament", b =>
                {
                    b.Property<int>("TournamentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TournamentId"));

                    b.Property<bool>("IsComplete")
                        .HasColumnType("bit");

                    b.Property<string>("RunnerUpId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ThirdPlaceId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("WinnerId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("TournamentId");

                    b.HasIndex("RunnerUpId");

                    b.HasIndex("ThirdPlaceId");

                    b.HasIndex("WinnerId");

                    b.ToTable("Tournaments");
                });

            modelBuilder.Entity("server.Models.Game", b =>
                {
                    b.HasOne("server.Models.Tournament", null)
                        .WithMany("Games")
                        .HasForeignKey("GameId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("server.Models.Player", "Winner")
                        .WithMany()
                        .HasForeignKey("WinnerId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("Winner");
                });

            modelBuilder.Entity("server.Models.Tournament", b =>
                {
                    b.HasOne("server.Models.Player", "RunnerUp")
                        .WithMany()
                        .HasForeignKey("RunnerUpId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("server.Models.Player", "ThirdPlace")
                        .WithMany()
                        .HasForeignKey("ThirdPlaceId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("server.Models.Player", "Winner")
                        .WithMany()
                        .HasForeignKey("WinnerId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("RunnerUp");

                    b.Navigation("ThirdPlace");

                    b.Navigation("Winner");
                });

            modelBuilder.Entity("server.Models.Tournament", b =>
                {
                    b.Navigation("Games");
                });
#pragma warning restore 612, 618
        }
    }
}
