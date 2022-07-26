using Microsoft.AspNetCore.SignalR;

namespace footsapp_server.Hubs
{
    public class ChatHub : Hub
    {
        //string usernameId;
        public async Task SendMessage(string senderName, string receiverName, int chatId)
        {
            await Clients.All.SendAsync("ReceiveMessage", senderName, receiverName, chatId);
        }

        public async Task SendInvite(string inviterName, string inviteeName)
        {
            await Clients.All.SendAsync("ReceiveInvite", inviterName, inviteeName);
        }
    }
}
