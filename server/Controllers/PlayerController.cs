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

    var token = _tokenService.CreateToken(player);

    return Ok(new PlayerDto
    {
      Username = player.UserName,
      Email = player.Email,
      Token = token
    });
  }

  [HttpPost("register")]
  public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
  {
    if (!ModelState.IsValid)
    {
      return BadRequest(ModelState);
    }

    var player = new Player
    {
      UserName = registerDto.Username,
      Email = registerDto.Email
    };

    var result = await _userManager.CreateAsync(player, registerDto.Password);
    if (result.Succeeded)
    {
      var token = _tokenService.CreateToken(player);

      return Ok(new PlayerDto
      {
        Username = player.UserName,
        Email = player.Email,
        Token = token
      });
    }

    return StatusCode(500, result.Errors);
  }

  
}
