using Microsoft.EntityFrameworkCore.Migrations;

namespace WebGordon.Migrations
{
    public partial class admain : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Main",
                table: "tblPhotos",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Main",
                table: "tblPhotos");
        }
    }
}
