using Service;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace footsapp_server.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {

        private readonly ContactsService _service;
        private string _userId;

        //  constructor
        public ContactsController(ContactsService service)
        {
            _service = service;
        }

        [HttpGet]
        public List<Contact> GetContacts()
        {
            try
            {
                _userId = User.Claims.FirstOrDefault(c => c.Type == "UsserId").Value;
                return _service.GetContacts(_userId);
            }
            catch (Exception )
            {
                return null;
            }
        }

        // TODO: add a Post for api/[controller]
        [HttpPost]
        public IActionResult PostContact([FromBody] Contact contact)
        {
            GetUserId();
            _service.AddContact(contact, _userId);
            return Ok();
        }


        [HttpGet("{id}")]
        public Contact Get(string id)
        {
            try {
                _userId = User.Claims.FirstOrDefault(c => c.Type == "UsserId").Value;
                var contact = _service.GetContact(id, _userId);
                return contact; 
            } catch (Exception)
            {
                return null;
            }
        }

        // PUT api/<contacts>/5
        [HttpPut("{id}")]
        public void Put(string id, [FromBody] UpdateContact value)
        {
            GetUserId();
            //Contact contactValues = JsonConvert.DeserializeObject<Contact>(value);
            //_service.UpdateContact(id, contactValues);
            _service.UpdateContact(_userId, id, value);
        }

        // DELETE api/<contacts>/5
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            GetUserId();
            _service.DeleteContact(id, _userId);
        }

        [HttpGet("{id}/messages")]
        public List<Message> GetMessages(string id)
        {
            GetUserId();
            var currentUser = _service.getCurrentUser(_userId);
            var chat = _service.GetMessages(id, currentUser);
            return chat?.Messages ?? null;
        }

        [HttpPost("{id}/messages")]
        public IActionResult Post([FromRoute] string id, [FromBody] string content )
        {
            if (content != null)
            {
                GetUserId();
                //var data = JsonConvert.SerializeObject(content);
                //data = data.ToString();
                _service.AddMessage(content, id, true, _userId);
                return Ok();
            }
            return BadRequest(" no content");
        }

        [HttpGet("{id}/messages/{id2}")]
        public Message GetMessage(string id, int id2)
        {
            GetUserId();
            var currentUser = _service.getCurrentUser(_userId);
            var messages = _service.GetMessages(id, currentUser);
            if (messages == null)
            {
                return null;
            }
            Message message = messages.Messages.Find(x => x.MessageId == id2);
            return message;
        }

        [HttpPut("{id}/messages/{id2}")]
        public void PutMessage([FromRoute] string id, [FromRoute] int id2, [FromBody]string message)
        {
            GetUserId();
            //var data = JsonConvert.SerializeObject(message).ToString();
            _service.UpdateMessage(id, id2, message, _userId);
        }

        [HttpDelete("{id}/messages/{id2}")]
        public void DeleteMessage(string id, int id2)
        {
            GetUserId();
            _service.DeleteMessage(id, id2, _userId);
        }

        private void GetUserId()
        {
            _userId = User.Claims.FirstOrDefault(c => c.Type == "UsserId").Value;
        }
    }
    
}
