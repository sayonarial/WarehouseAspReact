using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WarehouseAspReact.Migrations
{
    public partial class UserhasItems : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Storages_Storages_StorageId",
                table: "Storages");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "WhItems",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Weight",
                table: "WhItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "StorageId",
                table: "Storages",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_WhItems_UserId",
                table: "WhItems",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Storages_Storages_StorageId",
                table: "Storages",
                column: "StorageId",
                principalTable: "Storages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WhItems_Users_UserId",
                table: "WhItems",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Storages_Storages_StorageId",
                table: "Storages");

            migrationBuilder.DropForeignKey(
                name: "FK_WhItems_Users_UserId",
                table: "WhItems");

            migrationBuilder.DropIndex(
                name: "IX_WhItems_UserId",
                table: "WhItems");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "WhItems");

            migrationBuilder.DropColumn(
                name: "Weight",
                table: "WhItems");

            migrationBuilder.AlterColumn<int>(
                name: "StorageId",
                table: "Storages",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Storages_Storages_StorageId",
                table: "Storages",
                column: "StorageId",
                principalTable: "Storages",
                principalColumn: "Id");
        }
    }
}
