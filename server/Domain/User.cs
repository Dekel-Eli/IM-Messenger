
using Newtonsoft.Json;

namespace Domain
{
    public class User
    {
        public int Id { get; set; }
        public String Username { get; set; }
        public String Nickname { get; set; }
        public string Password { get; set; }
        public string Server { get; set; }
        public List<int> ContactsIds { get; set; }
        public List<User> Contacts { get; set; }
        public List<int> ChatsIds { get; set; }
        public List<StoredChat> Chats { get; set; }
        public string Photo { get; set; }
    }
}
