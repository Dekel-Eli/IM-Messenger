using System.Text.Json.Serialization;

namespace Domain
{
    public class Message
    {
        [JsonPropertyName("id")]
        public int MessageId { get; set; }

        [JsonIgnore]
        public int SenderId { get; set; }

        [JsonIgnore]
        public int ReciverId { get; set; }

        [JsonPropertyName("created")]
        public string Date { get; set; }

        [JsonIgnore]
        public MessageContent Content { get; set; }
        
        [JsonPropertyName("content")]
        public string ContentData { get; set; }

        public bool Sent { get; set; }
    }

    
    public class StoredMessage
    {
        public int MessageId { get; set; }

        public int SenderId { get; set; }

        public int ReciverId { get; set; }
        
        public string Date { get; set; }

        public MessageContent Content { get; set; }
        
    }
    
    public class MessageContent
    {
        public string Type { get; set; }
        public string Data { get; set; }
    }

}
