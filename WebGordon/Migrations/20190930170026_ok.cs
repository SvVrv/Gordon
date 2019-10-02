using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebGordon.Migrations
{
    public partial class ok : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TorgTime",
                table: "tblTorgs");

            migrationBuilder.AddColumn<DateTime>(
                name: "FinishDate",
                table: "tblTorgs",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<decimal>(
                name: "StartPrice",
                table: "tblProducts",
                nullable: false,
                oldClrType: typeof(float));

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "tblProducts",
                nullable: true);
        }
           

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            

            migrationBuilder.DropColumn(
                name: "FinishDate",
                table: "tblTorgs");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "tblProducts");

            migrationBuilder.AddColumn<int>(
                name: "TorgTime",
                table: "tblTorgs",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<float>(
                name: "StartPrice",
                table: "tblProducts",
                nullable: false,
                oldClrType: typeof(decimal));
        }
    }
}
