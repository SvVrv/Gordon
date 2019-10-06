using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebGordon.Migrations
{
    public partial class dimdeliv : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_tblTorgBets_tblTorgs_TorgId",
            //    table: "tblTorgBets");

            //migrationBuilder.DropTable(
            //    name: "TorgViewModel");

            //migrationBuilder.DropTable(
            //    name: "UserViewModel");

            //migrationBuilder.AlterColumn<long>(
            //    name: "TorgId",
            //    table: "tblTorgBets",
            //    nullable: false,
            //    oldClrType: typeof(long),
            //    oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Delivery",
                table: "tblProducts",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Dimensions",
                table: "tblProducts",
                nullable: true);

            //migrationBuilder.AddForeignKey(
            //    name: "FK_tblTorgBets_tblTorgs_TorgId",
            //    table: "tblTorgBets",
            //    column: "TorgId",
            //    principalTable: "tblTorgs",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_tblTorgBets_tblTorgs_TorgId",
            //    table: "tblTorgBets");

            migrationBuilder.DropColumn(
                name: "Delivery",
                table: "tblProducts");

            migrationBuilder.DropColumn(
                name: "Dimensions",
                table: "tblProducts");

            //migrationBuilder.AlterColumn<long>(
            //    name: "TorgId",
            //    table: "tblTorgBets",
            //    nullable: true,
            //    oldClrType: typeof(long));

            //migrationBuilder.CreateTable(
            //    name: "TorgViewModel",
            //    columns: table => new
            //    {
            //        Id = table.Column<long>(nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        FinishDate = table.Column<DateTime>(nullable: false),
            //        LastBet = table.Column<decimal>(nullable: false),
            //        ProductDescription = table.Column<string>(nullable: true),
            //        ProductImage = table.Column<string>(nullable: true),
            //        ProductName = table.Column<string>(nullable: true),
            //        ProductQuantity = table.Column<int>(nullable: false),
            //        TorgStatus = table.Column<string>(nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_TorgViewModel", x => x.Id);
            //    });

            //migrationBuilder.CreateTable(
            //    name: "UserViewModel",
            //    columns: table => new
            //    {
            //        Id = table.Column<string>(nullable: false),
            //        Description = table.Column<string>(nullable: true),
            //        Email = table.Column<string>(nullable: true),
            //        Image = table.Column<string>(nullable: true),
            //        Name = table.Column<string>(nullable: true),
            //        Phone = table.Column<string>(nullable: true),
            //        Type = table.Column<string>(nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_UserViewModel", x => x.Id);
            //    });

            //migrationBuilder.AddForeignKey(
            //    name: "FK_tblTorgBets_tblTorgs_TorgId",
            //    table: "tblTorgBets",
            //    column: "TorgId",
            //    principalTable: "tblTorgs",
            //    principalColumn: "Id",
            //    onDelete: ReferentialAction.Restrict);
        }
    }
}
