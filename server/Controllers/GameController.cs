using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Dtos;
using server.Interfaces;

using server.Models;

namespace server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GameController : ControllerBase
{
  private readonly IApiService _apiService;
  private readonly UserManager<Player> _userManager;
  private readonly IGameRepository _gameRepository;

  public GameController(IApiService apiService, UserManager<Player> userManager, IGameRepository gameRepository)
  {
    _apiService = apiService;
    _userManager = userManager;
    _gameRepository = gameRepository;
  }

  [HttpGet("v1")]
  public async Task<IActionResult> SinglePlayer()
  {
    try
    {
      var gameText = await _apiService.GetTextAsync();
      return Ok(gameText);
    }
    catch (Exception ex)
    {
      return BadRequest(ex.Message);
    }
  }

[HttpPost("v1")]
  public async Task<IActionResult> SinglePlayerResults([FromQuery] string username,[FromBody] GameDto gameDto)
  {
    try {
    var player = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == username);
    if (player == null)
    {
      return Unauthorized("Invalid username, please try again");
    }
    Game game = new Game
    {
      PlayerId = player.Id,
      User = player,
      IsComplete = true,
      Time = gameDto.Time,
      WordsPerMinute = gameDto.WordsPerMinute,
      Accuracy = gameDto.Accuracy,
      PlayedAt = DateTime.Now
    };
    var result = _gameRepository.SaveGame(game);
    
    return Ok("Game saved successfully");
    } catch (Exception ex)
    {
      return BadRequest(ex.Message);
    }
  }

  [HttpPost("multi")]
  public async Task<IActionResult> MultiPlayerResults([FromBody] MultiPlayerGameDto dto)
  {
    try {
      var player1 = await _userManager.Users.FirstOrDefaultAsync(p1 => p1.UserName == dto.Player1Username);
      var player2 = await _userManager.Users.FirstOrDefaultAsync(p2 => p2.UserName == dto.Player2Username);
      string winnerId = dto.WinnerUsername == player1.UserName ? player1.Id : player2.Id; 
      MutliPlayerGame game = new()
      {
        Participants = {player1, player2},
        IsComplete = true,
        Player1Accuracy = dto.Player1Accuracy,
        Player2Accuracy = dto.Player2Accuracy,
        Player1WordsPerMinute = dto.Player1WordsPerMinute,
        Player2WordsPerMinute = dto.Player2WordsPerMinute,
        PlayedAt = DateTime.Now,
        WinnerTime = dto.WinnerTime,
        Winner = dto.WinnerUsername == player1.UserName? player1 : player2,
        WinnerId = winnerId
      };
      var result = _gameRepository.SaveMultiPlayerGame(game);
      //update players wins and losses, maybe should be property in Player
      return Ok("Multiplayer game saved successfully");
    } catch (Exception ex)
    {
      return BadRequest(ex.Message);
    }
  }
}
