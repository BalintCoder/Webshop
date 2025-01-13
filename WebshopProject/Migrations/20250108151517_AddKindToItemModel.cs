using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebshopProject.Migrations
{
    /// <inheritdoc />
    public partial class AddKindToItemModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Kind",
                table: "ItemModels",
                type: "longtext",
                nullable: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Kind",
                table: "ItemModels");
        }
    }
}
