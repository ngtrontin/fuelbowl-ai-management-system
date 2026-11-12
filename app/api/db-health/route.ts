import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        current_database() AS database_name,
        current_user AS username,
        NOW() AS server_time
    `);

    return NextResponse.json({
      success: true,
      data: result.rows[0],
    });

  } catch (error) {
    console.error("POSTGRES ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error
          ? error.message
          : "Unknown error",
      },
      { status: 500 }
    );
  }
}