using Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Domain;


namespace footsapp_server.Controllers
{
    [Route("api/invitations")]
    [ApiController]
    public class SenderController : ControllerBase
    {

        private readonly ContactsService _service;
        private string _userId;

        //  constructor
        public SenderController(ContactsService service)
        {
            _service = service;
        }

        [HttpPost]
        public IActionResult Post([FromBody] Invitation invitation)
        {
            _userId = User.Claims.FirstOrDefault(c => c.Type == "UsserId").Value;
            _service.ReceiveInvitation(invitation, _userId);
            return Ok();
        }
    }

    [Route("api/transfer")]
    [ApiController]
    public class ReceiverController : ControllerBase
    {

        private readonly ContactsService _service;
        private string _userId;

        //  constructor
        public ReceiverController(ContactsService service)
        {
            _service = service;
        }

        [HttpPost]
        public IActionResult Post([FromBody] Transfer transfer)
        {
            // TODO: add SignalR
            _userId = User.Claims.FirstOrDefault(c => c.Type == "UsserId").Value;
            _service.ReceiveTransfer(transfer, _userId);
            return Ok();
        }
    }
}
