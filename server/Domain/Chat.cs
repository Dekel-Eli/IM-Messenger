using Newtonsoft.Json;

namespace Domain
{
    public class IChat
    {
        [JsonIgnore]
        public int ChatId { get; set; }
        
        [JsonIgnore]
        public string LastUpdateDate { get; set; }

        [JsonIgnore]
        public string LastMessage { get; set; }

        [JsonIgnore]
        public List<int> Participants { get; set; }

        [JsonIgnore]
        public List<string> ParticipantsName { get; set; }

    }
    
    public class Chat: IChat
    {
        public List<Message> Messages { get; set; }

    }

    public class StoredChat
    {
        public int ChatId { get; set; }
        public string LastUpdateDate { get; set; }

        public List<int> Participants { get; set; }
        public List<string> ParticipantsName { get; set; }
        public List<StoredMessage> Messages { get; set; }
    }
}
