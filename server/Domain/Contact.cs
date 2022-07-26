using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Domain

{
    public class Contact
    {

        [Key]
        [JsonPropertyName("id")]
        public string Username { get; set; }

        [JsonPropertyName("name")]
        public string Nickname { get; set; }

        [JsonPropertyName("server")]
        public string Server { get; set; }

        public string Last { get; set; }

        [JsonPropertyName("lastdate")]
        public string LastDate { get; set; }

    }

    public class UpdateContact {
        [JsonPropertyName("name")]
        public string Nickname { get; set; }

        
        public string Server { get; set; }
    }
}
