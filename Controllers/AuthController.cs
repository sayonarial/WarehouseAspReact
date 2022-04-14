using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using WarehouseAspReact.Models;

namespace WarehouseAspReact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
      
        private readonly byte[] passwordSalt = Encoding.UTF8.GetBytes("__03030840dfksjfs9d++9343rsdfagJjgDKl';sp[opil2937490-");
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;

        public AuthController(ApplicationDbContext context, IConfiguration configuration)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserDto request)
        {

            if (UserExists(request.Username))
            {
                return BadRequest($"Username \"{request.Username}\" already exists!");
            }
            if (String.IsNullOrEmpty(request.Password)) 
            {
                return BadRequest("Missing password");
            }

            var user = new User
            {
                Username = request.Username,
                PasswordHash = CreatePasswordHash(request.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(UserDto request)
        {

            
            if (!UserExists(request.Username) || String.IsNullOrEmpty(request.Username))
            {
                return BadRequest("User not found.");
            }

            var user = _context.Users
               .Single(u => u.Username == request.Username);


            if (!VerifyPasswordHash(request.Password, user.PasswordHash))
            {
                return BadRequest("Wrong password");
            }

            string token = CreateToken(user);

            Response.Cookies.Append(key: "jwt", value: token, new CookieOptions
            {
                HttpOnly = true
            });

            return Ok();
        }

        //[HttpGet("user")]
        //public async Task<ActionResult<UserModel>> User()
        //{
        //    var jwt = Request.Cookies["jwt"];
            
        //    return Ok(jwt);
        //}  



        private bool UserExists(string _username)
        {
            if (_context.Users.Any(u => u.Username == _username))
            {
                return true;
            }
            return false;
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, "Admin")
            };
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("Keys:JwtToken").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }

        

        private byte[] CreatePasswordHash(string password)
        {
            using(var hmac = new HMACSHA512(passwordSalt))
            {
                return hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash)
        {
            using(var hmac  = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);    
            }
        }
        
    }
}
