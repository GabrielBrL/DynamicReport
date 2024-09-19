using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DynamicReport.Api.Migrations
{
    /// <inheritdoc />
    public partial class AdicionandoColunaInnerHtmlNaTabelaForm : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "InnerHtml",
                table: "FORM",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InnerHtml",
                table: "FORM");
        }
    }
}
