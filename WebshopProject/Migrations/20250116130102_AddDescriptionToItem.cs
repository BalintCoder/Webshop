using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebshopProject.Migrations
{
    /// <inheritdoc />
    public partial class AddDescriptionToItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "ItemModels",
                type: "longtext",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "ItemModels");
        }
    }
}
