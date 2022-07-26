using System.ComponentModel.DataAnnotations;

namespace footsapp_server.mvc.Models
{
    public class Rating
    { 
        public int Id { get; set; }

        [Range(1, 5, ErrorMessage = "Rating must be between 1 and 5.")]
        public int Rate { get; set; }

        public string Name { get; set; }
        
        [Display(Name = "Description")]
        public string RateDescription { get; set; }
        public string? Time { get; set; }
    
    }
}
