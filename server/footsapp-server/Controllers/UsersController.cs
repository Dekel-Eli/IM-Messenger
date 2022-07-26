using Service;
using Domain;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace footsapp_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserService _service;
        private string _userId;
        
        // constructor
        public UsersController(UserService service)
        {
            _service = service;
        }

        [HttpGet("auth")]
        public User Auth(string username, string password)
        {
            try
            {

                var user = _service.UserAuth(username, password);
                return user;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet("currentUser")]
        public User GetCurrentUser()
        {
            _userId = User.Claims.FirstOrDefault(c => c.Type == "UsserId").Value;
            return _service.GetCurrentUser(_userId);
        }

        // post function to add a new user
        [HttpPost("register")]
        public IActionResult Register(User user)
        {
            try
            {
                _service.Register(user);
                return Ok();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        // post function to add new contact to user
        [HttpPost("addContact")]
        public List<User> AddContact(Contact contact)
        {
            try
            {
                _userId = User.Claims.FirstOrDefault(c => c.Type == "UsserId").Value;
                // adding contact to current user
                var contacts =_service.AddContact(contact, _userId);
                
                
                return contacts;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
