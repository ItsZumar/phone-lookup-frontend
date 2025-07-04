import { NextRequest, NextResponse } from "next/server";

function verifyToken(request: NextRequest): string {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token provided");
  }
  return authHeader.substring(7);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const phoneNumber = searchParams.get("phoneNumber");

    if (!phoneNumber) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    const token = verifyToken(request);

    const response = await fetch(`${process.env.BACKEND_URL}/reports/search?phoneNumber=${encodeURIComponent(phoneNumber)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to search reports:", errorData);
      return NextResponse.json({ error: errorData.message || "Failed to search reports" }, { status: response.status });
    }

    const data = await response.json();
    
    // Transform the response to match the frontend's expected format
    const transformedData = data.map((report: any) => ({
      id: report.id,
      phoneNumber: report.phoneNumber,
      name: report.user?.name || "Unknown",
      message: report.message,
      category: report.category,
      status: report.status.toLowerCase(),
      createdAt: report.createdAt,
    }));

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error("Error in GET /api/search:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
} 