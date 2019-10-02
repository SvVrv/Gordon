using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebGordon.ViewModels
{
    public class ChangeAccountViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Telnumber { get; set; }
        public string Email { get; set; }
        public string Description { get; set; }
        public string Changed { get; set; }
    }
}
