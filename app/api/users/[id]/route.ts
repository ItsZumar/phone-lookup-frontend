import { type NextRequest, NextResponse } from "next/server";

function verifyUser(request: NextRequest) {
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

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = verifyUser(request);
    const { name, email } = await request.json();
    const { id } = await params;

    // Update user profile on backend using the new profile endpoint
    const response = await fetch(`${process.env.BACKEND_URL}/users/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.message || "Failed to update user" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = verifyUser(request);
    const userId = await Promise.resolve(params.id);

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Delete the user using the profile endpoint (allows users to delete their own account)
    const response = await fetch(`${process.env.BACKEND_URL}/users/profile`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to delete user:", errorData);
      return NextResponse.json({ error: errorData.message || "Failed to delete user" }, { status: response.status });
    }

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in DELETE /api/users/[id]:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
} 