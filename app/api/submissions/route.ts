import { type NextRequest, NextResponse } from "next/server";

function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token provided");
  }

  const token = authHeader.substring(7);
  if (!token) {
    throw new Error("Invalid token format");
  }

  return token;
}

export async function GET(request: NextRequest) {
  try {
    const token = verifyToken(request);

    // First, get the current user's profile to get their ID
    const profileResponse = await fetch(`${process.env.BACKEND_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!profileResponse.ok) {
      return NextResponse.json({ error: "Failed to get user profile" }, { status: profileResponse.status });
    }

    const userData = await profileResponse.json();
    // console.log("Current user data:", userData)

    // Then fetch reports for this specific user
    const reportsUrl = `${process.env.BACKEND_URL}/reports`;
    // console.log("Fetching reports from:", reportsUrl)

    const response = await fetch(reportsUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to fetch reports:", errorData);
      return NextResponse.json({ error: errorData.message || "Failed to fetch reports" }, { status: response.status });
    }

    const data = await response.json();
    // console.log("Raw reports data:", data)
    
    // Filter reports for the current user and transform the data
    const transformedData = data
      .filter((report: any) => report.userId === userData.id)
      .map((report: any) => ({
        id: report.id,
        phoneNumber: report.phoneNumber,
        name: report.user?.name || "Unknown",
        message: report.message,
        category: report.category,
        status: report.status.toLowerCase(),
        createdAt: report.createdAt,
      }));

    // console.log("Transformed reports:", transformedData)
    return NextResponse.json(transformedData);
  } catch (error) {
    console.error("Error in GET /api/submissions:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = verifyToken(request);
    const body = await request.json();

    // Get user profile to include user_id in the report
    const profileResponse = await fetch(`${process.env.BACKEND_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!profileResponse.ok) {
      return NextResponse.json({ error: "Failed to get user profile" }, { status: profileResponse.status });
    }

    const userData = await profileResponse.json();

    // Transform the request body to match the Prisma schema's expected format
    const transformedBody = {
      phoneNumber: body.phoneNumber,
      message: body.message,
      category: body.category.toUpperCase(), // Convert category to uppercase
      userId: userData.id // Use userId to match Prisma schema
    };

    console.log("Creating report with data:", transformedBody);

    const response = await fetch(`${process.env.BACKEND_URL}/reports`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(transformedBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to create report:", errorData);
      return NextResponse.json({ error: errorData.message || "Failed to create submission" }, { status: response.status });
    }

    const data = await response.json();
    console.log("Created report:", data);
    
    // Transform the response to match the frontend's expected format
    const transformedData = {
      id: data.id,
      phoneNumber: data.phoneNumber,
      name: data.user?.name || "Unknown",
      message: data.message,
      category: data.category,
      status: data.status.toLowerCase(),
      createdAt: data.createdAt
    };

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error("Error in POST /api/submissions:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
