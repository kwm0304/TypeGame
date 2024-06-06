using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class ChangeWinnerTimeAndAverageGameTimeType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Step 1: Add new temporary columns with the new type
            migrationBuilder.AddColumn<double>(
                name: "WinnerTimeTemp",
                table: "Games",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "AverageGameTimeTemp",
                table: "AspNetUsers", // Assuming Player table name is AspNetUsers
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            // Step 2: Copy data from the old columns to the new columns
            migrationBuilder.Sql(
                @"
                UPDATE Games
                SET WinnerTimeTemp = DATEDIFF(SECOND, '1900-01-01', WinnerTime);
                ");

            migrationBuilder.Sql(
                @"
                UPDATE AspNetUsers
                SET AverageGameTimeTemp = DATEDIFF(SECOND, '1900-01-01', AverageGameTime);
                ");

            // Step 3: Drop the old columns
            migrationBuilder.DropColumn(
                name: "WinnerTime",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "AverageGameTime",
                table: "AspNetUsers");

            // Step 4: Rename the new columns to the old columns' names
            migrationBuilder.RenameColumn(
                name: "WinnerTimeTemp",
                table: "Games",
                newName: "WinnerTime");

            migrationBuilder.RenameColumn(
                name: "AverageGameTimeTemp",
                table: "AspNetUsers",
                newName: "AverageGameTime");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Reverse the above steps for Down migration

            // Step 1: Add the old columns back with the original type
            migrationBuilder.AddColumn<TimeSpan>(
                name: "WinnerTimeOld",
                table: "Games",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0));

            migrationBuilder.AddColumn<TimeSpan>(
                name: "AverageGameTimeOld",
                table: "AspNetUsers",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0));

            // Step 2: Copy data back to the old columns
            migrationBuilder.Sql(
                @"
                UPDATE Games
                SET WinnerTimeOld = DATEADD(SECOND, WinnerTime, '1900-01-01');
                ");

            migrationBuilder.Sql(
                @"
                UPDATE AspNetUsers
                SET AverageGameTimeOld = DATEADD(SECOND, AverageGameTime, '1900-01-01');
                ");

            // Step 3: Drop the new columns
            migrationBuilder.DropColumn(
                name: "WinnerTime",
                table: "Games");

            migrationBuilder.DropColumn(
                name: "AverageGameTime",
                table: "AspNetUsers");

            // Step 4: Rename the old columns back to the original names
            migrationBuilder.RenameColumn(
                name: "WinnerTimeOld",
                table: "Games",
                newName: "WinnerTime");

            migrationBuilder.RenameColumn(
                name: "AverageGameTimeOld",
                table: "AspNetUsers",
                newName: "AverageGameTime");
        }
    }
}
