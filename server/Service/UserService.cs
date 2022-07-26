
using Domain;
using Newtonsoft.Json;
using System.Text;


namespace Service
{
    public class UserService
    {
        private readonly ContactsService _cservice;
        private static User currentUser;
        private string _userId;

        List<User> users;
        public UserService(ContactsService cservice)
        {
            _cservice = cservice;
            users = _cservice.getAllUsers();        
        }

        private List<StoredChat> chats;

        public bool Register(User user)
        {
            try
            {
                // TODO: should validate user doent exist? or maybe relay on client.
                //if (this.users.Exists(u => u.Username == user.Username)) return false;
                user.Id = this.users.Select(u => u.Id).Max() + 1;
                user.Chats = new List<StoredChat>();
                user.ChatsIds = new List<int>();
                user.Contacts = new List<User>();
                user.ContactsIds = new List<int>();
                this.users.Add(user);
                _cservice.SetUsers(this.users);
                //SetCurrentUser(user);
                return true;
            }
            catch (Exception e)
            {
                throw new Exception("User already exists");
            }
        }
        public List<User> AddContact(Contact contact, string _userId)
        {
            try
            {
                _cservice.AddContact(contact, _userId);
                this.users = _cservice.getAllUsers();
                currentUser = _cservice.getCurrentUser(_userId);

                // invitation to the contact on the given server  
                if (contact.Server != null)
                {
                    var content = new StringContent(JsonConvert.SerializeObject(contact),
                        Encoding.UTF8, "application/json");
                    var res = new HttpClient()
                        .PostAsync($"{contact.Server}/api/invitations", content);
                }

                return currentUser.Contacts;
                
            }
            catch (Exception)
            {
                throw new Exception("Error while trying to add contact");
            }

        }

        public User GetUser(int id)
        {
            if (users == null) {
                //GetAllUsers();
                return null;
            }
            var user = GetUserDM(id);
            if (user != null )
            {
                if (user.ContactsIds.Any())
                {
                    List<User> contacts = new List<User>();
                    user.ContactsIds.ForEach(contact => contacts.Add(GetUserDM(contact)));
                    user.Contacts = contacts;
                }

            }
            return user;
        }

        public User UserAuth(string username, string password)
        {
            if (users == null)
            {
                // get all users from json file
                //GetAllUsers();
                return null;
            }
            var user = _cservice.getAllUsers().FirstOrDefault(user => String.Equals(username, user.Username));
            if (user != null)
            {
                if(user.Password != password)
                {
                    return null;
                }
                currentUser = user;
                if (user.ContactsIds != null && user.ContactsIds.Count() > 0 && user.Contacts == null)
                {
                    List<User> contacts = new List<User>();
                    user.ContactsIds.ForEach(contact => contacts.Add(GetUserDM(contact)));
                    contacts.RemoveAll(c => c == null);
                    user.Contacts = contacts;
                }
                if (user.ChatsIds != null && user.ChatsIds.Count() > 0 && user.Chats == null)
                {
                    List<StoredChat> chats = new List<StoredChat>();
                    user.ChatsIds.ForEach(id => chats.Add(getChat(id)));
                    user.Chats = chats;
                }
                //SetCurrentUser(user);
            }
            return user;
        }

        public void CreateUser(User user)
        {
            //TODO: VALIDATE USER
            users.Add(user);   
        }

        public User GetCurrentUser(string _userId)
        {
            currentUser = _cservice.getAllUsers().FirstOrDefault(user => String.Equals(_userId, user.Username));
            //_cservice.getCurrentUser(_userId);

            return currentUser;
        }

        private User GetUserDM(int id)
        {
            var user = users?.FirstOrDefault(x => x.Id == id);
            return user;
        }

        private StoredChat getChat(int id)
        {
            if (chats == null)
            {
                using (StreamReader r = new StreamReader("..//Service//chats.json"))
                {
                    string json = r.ReadToEnd();
                    chats = JsonConvert.DeserializeObject<List<StoredChat>>(json);
                    chats.ForEach(chat => 
                        chat.Participants.ForEach(id => {
                            if (chat.ParticipantsName == null)
                                chat.ParticipantsName = new List<string>();
                            chat.ParticipantsName.Add(GetUserDM(id).Username);
                        })
                    );

                    chats.RemoveAll(c => c == null);
                }
            }

            return chats.FirstOrDefault(chat=> chat.ChatId == id);
        }

    }
}
