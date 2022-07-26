using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using footsapp_server.mvc.Models;

namespace footsapp_server.mvc.Data
{
    public class footsapp_servermvcContext : DbContext
    {
        public footsapp_servermvcContext (DbContextOptions<footsapp_servermvcContext> options)
            : base(options)
        {
        }

        public DbSet<footsapp_server.mvc.Models.Rating>? Ranking { get; set; }
    }
}
