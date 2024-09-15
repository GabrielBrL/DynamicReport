using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DynamicReport.Api.Migrations
{
    /// <inheritdoc />
    public partial class AtualizandoColunaTabelaForm : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Tag",
                table: "FORM",
                newName: "Tags");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Tags",
                table: "FORM",
                newName: "Tag");
        }
    }
}
