using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using Service;
using Domain;

namespace footsapp_server.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        public IConfiguration _configuration;
        private readonly UserService _userService;

        // constructor
        public LoginController(IConfiguration configuration, UserService userService)
        {
            _configuration = configuration;
            _userService = userService;
        }

        [HttpPost]
        public IActionResult Post(string username, string password)
        {
            if (_userService.UserAuth(username, password) != null)
            {
                return Ok(GetToken(username, password));
            }
            // return that authentication failed
            return BadRequest("Username or password is incorrect");
        }

        [HttpPost("Register")]
        public IActionResult Register(User user)
        {
            if (_userService.UserAuth(user.Username, user.Password) == null)
            {
                var ok = _userService.Register(user);
                if (ok)
                {
                    return Ok(GetToken(user.Username, user.Password));

                }
                return BadRequest("An Error Accured");
            }
            return BadRequest("Username is already taken");
        }

        private string GetToken(string username, string password)
        {
            var claims = new[]
                   {
                    new Claim(JwtRegisteredClaimNames.Sub, _configuration["JWTParams:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("UsserId", username),
                };
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWTParams:SecretKey"]));
            var mac = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _configuration["JWTParams:Issuer"],
                audience: _configuration["JWTParams:Audience"],
                claims,
                expires: DateTime.UtcNow.AddMinutes(30),
                signingCredentials: mac
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
