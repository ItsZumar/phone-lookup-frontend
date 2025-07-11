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

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = verifyToken(request);
    const reportId = params.id;

    if (!reportId) {
      return NextResponse.json({ error: "Report ID is required" }, { status: 400 });
    }

    // First, get the current user's profile to verify ownership
    const profileResponse = await fetch(`${process.env.BACKEND_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!profileResponse.ok) {
      return NextResponse.json({ error: "Failed to get user profile" }, { status: profileResponse.status });
    }

    const userData = await profileResponse.json();

    // Get the report to verify ownership
    const reportResponse = await fetch(`${process.env.BACKEND_URL}/reports/${reportId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!reportResponse.ok) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    const reportData = await reportResponse.json();

    // Verify that the user owns the report - use userId (camelCase) instead of user_id (snake_case)
    if (reportData.userId !== userData.id) {
      return NextResponse.json({ error: "Unauthorized to delete this report" }, { status: 403 });
    }

    // Delete the report
    const deleteResponse = await fetch(`${process.env.BACKEND_URL}/reports/${reportId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!deleteResponse.ok) {
      const errorData = await deleteResponse.json();
      console.error("Failed to delete report:", errorData);
      return NextResponse.json({ error: errorData.message || "Failed to delete report" }, { status: deleteResponse.status });
    }

    return NextResponse.json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error("Error in DELETE /api/submissions/[id]:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id: reportId } = await Promise.resolve(params);

  try {
    const token = verifyToken(request);

    // Get current user's profile to verify ownership
    const userResponse = await fetch(`${process.env.BACKEND_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!userResponse.ok) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userData = await userResponse.json();

    // Get the report
    const response = await fetch(`${process.env.BACKEND_URL}/reports/${reportId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: "Report not found" }, { status: 404 });
      }
      throw new Error("Failed to fetch report");
    }

    const data = await response.json();

    // Verify ownership - use userId (camelCase) instead of user_id (snake_case)
    if (data.userId !== userData.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Transform the data to match frontend expectations
    const transformedData = {
      id: data.id,
      phoneNumber: data.phoneNumber,
      message: data.message,
      category: data.category,
      status: data.status,
      createdAt: data.createdAt,
      name: data.user?.name || "", // Include the user name from the report data
    };

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error("Error in GET /api/submissions/[id]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { id: reportId } = await params;
  try {
    const token = verifyToken(request);

    // Get current user's profile to verify ownership
    const userResponse = await fetch(`${process.env.BACKEND_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!userResponse.ok) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userData = await userResponse.json();

    // Get the report to verify ownership
    const reportResponse = await fetch(`${process.env.BACKEND_URL}/reports/${reportId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!reportResponse.ok) {
      if (reportResponse.status === 404) {
        return NextResponse.json({ error: "Report not found" }, { status: 404 });
      }
      throw new Error("Failed to fetch report");
    }

    const reportData = await reportResponse.json();

    // Verify ownership - use userId (camelCase) instead of user_id (snake_case)
    if (reportData.userId !== userData.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Get the request body
    const body = await request.json();

    // Transform the data to match backend expectations
    const transformedData = {
      phoneNumber: body.phoneNumber,
      message: body.message,
      category: body.category,
    };

    // Update the report using PATCH
    const response = await fetch(`${process.env.BACKEND_URL}/reports/${reportId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(transformedData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Unknown error" }));
      console.error("Backend error response:", errorData);
      throw new Error(`Failed to update report: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();

    // Transform the response to match frontend expectations
    const transformedResponse = {
      id: data.id,
      phoneNumber: data.phoneNumber,
      message: data.message,
      category: data.category,
      status: data.status,
      createdAt: data.createdAt,
    };

    return NextResponse.json(transformedResponse);
  } catch (error) {
    console.error("Error in PATCH /api/submissions/[id]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
