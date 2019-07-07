using Microsoft.EntityFrameworkCore.Migrations;

namespace WebGordon.Migrations
{
    public partial class Createuser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tblClients",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false),
                    Nick = table.Column<string>(maxLength: 100, nullable: true),
                    Description = table.Column<string>(maxLength: 1000, nullable: true),
                    Image = table.Column<string>(maxLength: 128, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblClients", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblClients_AspNetUsers_Id",
                        column: x => x.Id,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblClients");
        }
    }
}
