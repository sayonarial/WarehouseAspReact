using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WarehouseAspReact.Migrations
{
    public partial class relationshipchanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WhItems_Users_UserId",
                table: "WhItems");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "WhItems");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "WhItems",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_WhItems_Users_UserId",
                table: "WhItems",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WhItems_Users_UserId",
                table: "WhItems");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "WhItems",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "OwnerId",
                table: "WhItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_WhItems_Users_UserId",
                table: "WhItems",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
