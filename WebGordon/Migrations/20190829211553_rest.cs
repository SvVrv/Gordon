using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebGordon.Migrations
{
    public partial class rest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tblTorgs",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ProductId = table.Column<long>(nullable: false),
                    SellerId = table.Column<long>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: false),
                    TorgTime = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblTorgs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblTorgs_tblProducts_ProductId",
                        column: x => x.ProductId,
                        principalTable: "tblProducts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tblTorgs_AspNetUsers_SellerId",
                        column: x => x.SellerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tblTorgBets",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ClientId = table.Column<long>(nullable: false),
                    Bet = table.Column<decimal>(nullable: false),
                    StartDate = table.Column<DateTime>(nullable: false),
                    TorgId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblTorgBets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tblTorgBets_AspNetUsers_ClientId",
                        column: x => x.ClientId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tblTorgBets_tblTorgs_TorgId",
                        column: x => x.TorgId,
                        principalTable: "tblTorgs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblTorgBets_ClientId",
                table: "tblTorgBets",
                column: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_tblTorgBets_TorgId",
                table: "tblTorgBets",
                column: "TorgId");

            migrationBuilder.CreateIndex(
                name: "IX_tblTorgs_ProductId",
                table: "tblTorgs",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_tblTorgs_SellerId",
                table: "tblTorgs",
                column: "SellerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblTorgBets");

            migrationBuilder.DropTable(
                name: "tblTorgs");
        }
    }
}
