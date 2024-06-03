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
public class PlayerController : ControllerBase
{
  private readonly UserManager<Player> _userManager;
  private readonly SignInManager<Player> _signInManager;
  private readonly ITokenService _tokenService;


  public PlayerController(UserManager<Player> userManager, SignInManager<Player> signInManager, ITokenService tokenService)
  {
    _userManager = userManager;
    _signInManager = signInManager;
    _tokenService = tokenService;
  }

  [HttpPost("login")]
  public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
  {
    if (!ModelState.IsValid)
    {
      return BadRequest(ModelState);
    }

    var player = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == loginDto.Username);
    if (player == null)
    {
      return Unauthorized("Invalid username, please try again");
    }

    var result = await _signInManager.CheckPasswordSignInAsync(player, loginDto.Password, false);
    if (!result.Succeeded)
    {
      return Unauthorized("Incorrect credentials provided, please try again");
    }

    return Ok(new PlayerDto
    {
      UserId = player.Id,
      Username = player.UserName,
      Email = player.Email,
      Token = _tokenService.CreateToken(player)
    });
  }

  [HttpPost("register")]
  public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
  {
    try
    {
      if (!ModelState.IsValid)
      return BadRequest(ModelState);

      var player = new Player
      {
        UserName = registerDto.Username,
        Email = registerDto.Email,
      };

      var created = await _userManager.CreateAsync(player, registerDto.Password);

      if (created.Succeeded)
      {
        return Ok(new PlayerDto
        {
          UserId = player.Id,
          Username = player.UserName,
          Email = player.Email,
          Token = _tokenService.CreateToken(player)
        }); 
      } else {
        return StatusCode(500, created.Errors.Select(e => e.Description).ToList());
      }
    }
    catch (Exception e)
    {
      return StatusCode(500, e.Message);
    }
  }


}
