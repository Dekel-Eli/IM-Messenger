using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Transfer
    {
        // from
        public string From { get; set; }
        // to
        public string To { get; set; }
        // content (text)
        public string Content { get; set; }
    }
}
