using Domain;
using Newtonsoft.Json;


namespace Service
{


    public class ContactsService
    {

        private static List<User> users;

        public ContactsService()
        {
            if (users == null)
            {
                LoadUsers();
            }

        }

        private void LoadUsers()
        {
            using (StreamReader r = new StreamReader("..//Service//fooUsers.json"))
            {
                string json = r.ReadToEnd();
                users = JsonConvert.DeserializeObject<List<User>>(json);
            }            
        }
        public void SetUsers(List<User> users)
        {
            ContactsService.users = users;
        }

        //public void SetCurrentUser(int id)
        //{
        //    if (users != null)
        //    {
        //        currentUser = users.FirstOrDefault(user => user.Id == id);
        //    }
        //}

        public List<User> getAllUsers()
        {
            return users;
        }

        public void SaveUsers()
        {
            using (StreamWriter file = File.CreateText("..//Service//fooUsers.json"))
            {
                JsonSerializer serializer = new JsonSerializer();
                serializer.Serialize(file, users);
            }
        }
        
        public User getCurrentUser(string id)
        {
            return getAllUsers().FirstOrDefault(user => user.Username == id);
        }

        public List<Contact> GetContacts(string _userId)
        {
            var contacts = new List<Contact>();
            var currentUser = getCurrentUser(_userId);
            currentUser?.Contacts?.ForEach(contact =>
                contacts.Add(GetUserAsContact(contact, currentUser))
                );
            return contacts;
        }

        public User getUser(string username)
        {
            var contact = getCurrentUser(username).Contacts.FirstOrDefault(contact => String.Equals(contact.Username, username));
            return contact;
        }

        public Contact GetContact(string username, string _userId)
        {
            var currentUser = getCurrentUser(_userId);
            var contact = currentUser.Contacts.FirstOrDefault(contact => String.Equals(contact.Username, username));
            return GetUserAsContact(contact, currentUser);
        }


        // return new User by contact
        private User ConvertContactToUser(Contact contact, User currentUser)
        {
            var user = new User();
                user.Id = (currentUser.ContactsIds.Count() > 0 ? currentUser.ContactsIds.Max() : 
                0) + 1;
            //getAllUsers().Select(user => user.Id).Max() + 1;            
            user.Username = contact.Username;
            user.Nickname = contact.Nickname;
            user.Password  = "";
            user.Server = contact.Server;
            user.Photo = "";
            user.Contacts = new List<User>();
            user.ContactsIds = new List<int>();
            user.Chats = new List<StoredChat>();
            user.ChatsIds = new List<int>();
            return user;
        }

        // function that adds a new contact to the current user
        public void AddContact(Contact contact, string _userId)
        {
            var currentUser = getCurrentUser(_userId);
            var user = ConvertContactToUser(contact, currentUser);
            if(getAllUsers().FirstOrDefault(u => u.Username == user.Username) != null)
            {
                return;
            }
            currentUser.Contacts.Add(user);
            currentUser.ContactsIds.Add(user.Id);
            var chat = CreateNewChat(contact.Username, currentUser);
            currentUser.Chats.Add(chat);
            currentUser.ChatsIds.Add(chat.ChatId);
            //SaveUsers();

        }
        
        public void ReceiveInvitation(Invitation invitation, string _userId)
        {
            var currentUser = getCurrentUser(_userId);
            var contact = new Contact()
            {
                Username = invitation.From,
                Server = invitation.Server
            };
            var user = ConvertContactToUser(contact, currentUser);
            currentUser.Contacts.Add(user);
            currentUser.ContactsIds.Add(user.Id);
            //SaveUsers();
        }

        private Contact GetUserAsContact(User user, User currentUser)
        {
            Contact contact = new Contact();
            if (user != null)
            {
                contact.Username = user.Username;
                contact.Nickname = user.Nickname;
            // TODO: SET SERVER
                contact.Server = user.Server;
            }
            else
            {
                return null;
            }
            var last = GetMessages(user.Username, currentUser);
            contact.LastDate = last?.LastUpdateDate?? null;
            contact.Last = last?.LastMessage?? null;

            return contact;
        }

        // 

        public void UpdateContact(string _userId, string id, UpdateContact contactValues)
        {
            var currentUser = getCurrentUser(_userId);
            var contact = currentUser.Contacts.FirstOrDefault(contact => contact.Username == id);
            if (contact == null)
            {
                return;
            }
            contact.Nickname = contactValues.Nickname ?? contact.Nickname;
            contact.Server = contactValues.Server ?? contact.Server;
        }

        private StoredChat CreateNewChat(string id, User currentUser)
        {
            var contact = currentUser.Contacts.FirstOrDefault(c => c.Username == id); 
            var chat = new StoredChat();
            chat.ChatId = (currentUser.ChatsIds.Count() > 0 ? currentUser.ChatsIds.Max() : 0) + 1;
            chat.Participants = new List<int>() { currentUser.Id, contact.Id };
            chat.ParticipantsName = new List<string>()
            {
                currentUser.Username, contact.Username
            };
            chat.Messages = new List<StoredMessage>();
            chat.LastUpdateDate = "";
            //currentUser.Chats.Add(chat);
            return chat;
        }
        
        private int GetMaxMessageId(List<Message> messages)
        {
            if(messages.Count() == 0)
            {
                return 0;
            }
            // find the message with the maximal id
            List<int> ids = new List<int>();
            foreach(Message m in messages)
            {
                ids.Add(m.MessageId);
            }
            return ids.Max();
        }
        
        public void AddMessage(string data, string id, bool sent, string _userId)
        {
            //             TODO: validate this is really saved. if not, create save users method
            var currentUser = getCurrentUser(_userId);
            if (currentUser == null)
            {
                throw new Exception("no one is logged in");
            }
            // check that id is a contact of user
            var contact = currentUser.Contacts.FirstOrDefault(c => c.Username == id);
            if (contact == null)
            {
                return;
            }
            
            var chat = GetMessages(id, currentUser);
            var messageId = GetMaxMessageId(chat.Messages) + 1;
            var content = new MessageContent()
            {
                Type = "text",
                Data = data
            };
            var currentDate = DateTime.Now.ToString("yyyy-MM-ddTHH:mm:ss.fffffff");
            StoredMessage stMessage = new StoredMessage()
            {
                MessageId = messageId,
                SenderId = currentUser.Id,
                ReciverId = currentUser.Contacts.FirstOrDefault(c =>
                    String.Equals(c.Username, id)).Id,
                Date = currentDate,
                Content = content,
                //ContentData = data,
                //Sent = sent
            };
            //chat.Messages.Add(message);
            currentUser.Chats.FirstOrDefault( c => c.ChatId == chat.ChatId).Messages
                .Add(stMessage);
            currentUser.Chats.FirstOrDefault(c => c.ChatId == chat.ChatId).LastUpdateDate = currentDate;
        }

        // AddTransfer
        public void ReceiveTransfer(Transfer transfer, string _userId)
        {
            
            AddMessage(transfer.Content, transfer.From, false, _userId);
        }

        public void UpdateMessage(string ContactId, int messageId, string content, string _userId)
        {
            // check that id is a contact of user
            
            var currentUser = getCurrentUser(_userId);
            var contact = currentUser.Contacts.FirstOrDefault(contact => String.Equals(contact.Username, ContactId));
            if (contact == null)
            {
                return;
            }
            var message = currentUser.Chats.FirstOrDefault(chat => 
                chat.ParticipantsName.Contains(ContactId)).Messages
                                    .FirstOrDefault(m => m.MessageId == messageId);

            if (message == null)
            {
                return;
            }
            if (message.Content != null)
            {
                message.Content.Data = content;
                message.Content.Type = "text";
            } else
            {
                message.Content = new MessageContent()
                {
                    Type = "text",
                    Data = content
                };
            }
            //message.ContentData = content;
            
        }

        public Chat GetMessages(string id, User currentUser)
        {
            // check that id is a Contact of currentUser
            var contact = currentUser.Contacts.FirstOrDefault(c => c.Username == id);
            if (contact == null)
            {
                return null;
            }
            // cast StoredChat to Chat

            var chat = currentUser.Chats?.Where(c => c.ParticipantsName != null).ToList();
            var res = chat.FirstOrDefault(chat => chat.ParticipantsName.Contains(id));
            if (res != null) {
                var messages = new Chat()
                {
                    ChatId = res.ChatId,
                    Messages = new List<Message>(),
                };
                res.Messages.ForEach(message =>
                {
                    messages.Messages.Add(new Message()
                    {
                        MessageId = message.MessageId,
                        Date = message.Date,
                        ContentData = message.Content.Data,
                        Sent = message.SenderId == currentUser.Id,
                    });
                });
                var msgMax = res.Messages?.Select(m => m?.MessageId).Max()?? 0;
                var last = res.Messages.LastOrDefault(m => m?.MessageId == msgMax) ?? null;
                messages.LastMessage = last?.Content?.Data ?? null;
                messages.LastUpdateDate = last?.Date ?? null;
                
                return messages;
            }   

            return null;
        }

        public void DeleteContact(string id, string _userName)
        {
            // TODO: adjust when user is ready
            var currentUser = getCurrentUser(_userName);
            var contact = currentUser.Contacts.FirstOrDefault(c => c.Username == id);
            if (contact == null)
            {
                return;
            }
            var chat = currentUser.Chats.FirstOrDefault(c => c.ParticipantsName.Contains(id));
            if (chat == null)
            {
                return;
            }
            currentUser.ChatsIds.Remove(chat.ChatId);
            // remove Contact from contact ids
            var contactIntId = contact.Id;
            currentUser.ContactsIds.Remove(contactIntId);
            currentUser.Contacts.Remove(currentUser.Contacts.FirstOrDefault(contact =>
                String.Equals(contact.Username, id)));
        }

        // function to delte a Message by id
        public void DeleteMessage(string ContactId, int messageId, string _userId)
        {
            var currentUser = getCurrentUser(_userId);
            var chat = GetMessages(ContactId, currentUser);
            if (currentUser != null)
            {
                currentUser?.Chats?.FirstOrDefault(c => c.ParticipantsName.Contains(ContactId))?.Messages
                    .Remove(currentUser?.Chats?.FirstOrDefault(c => c.ChatId == chat.ChatId)?.Messages
                        .FirstOrDefault(message => message?.MessageId == messageId));
            }
        }

    }
}
