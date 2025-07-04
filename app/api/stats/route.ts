import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/reports/public/stats`);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to fetch stats:", errorData);
      return NextResponse.json({ error: errorData.message || "Failed to fetch stats" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in GET /api/stats:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 