using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Dtos;
using server.Interfaces;

using server.Models;
using server.Services;

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
    var player = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == username);
    if (player == null)
    {
      return Unauthorized("Invalid username, please try again");
    }
    Game game = new Game
    {
      WinnerId = player.Id,
      Winner = player,
      Participants = new List<Player> { player },
      IsComplete = true,
      WinnerTime = gameDto.WinnerTime,
      WordsPerMinute = gameDto.WordsPerMinute,
      Accuracy = gameDto.Accuracy,
      PlayedAt = DateTime.Now
    };
    var result = _gameRepository.SaveGame(game);
    
    return Ok("Game saved successfully");
  }
}
