import { type NextRequest, NextResponse } from "next/server";

function verifyAdmin(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token provided");
  }

  const token = authHeader.substring(7);
  if (!token) {
    throw new Error("Invalid token format");
  }

  console.log("Admin verification - token length:", token.length);
  return token;
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = verifyAdmin(request);
    const { blocked } = await request.json();
    const { id } = await params;

    console.log("PATCH /api/admin/users/[id] - Updating user:", { id, blocked, backendUrl: process.env.BACKEND_URL });

    // Determine the endpoint based on the blocked status
    const endpoint = blocked ? `${process.env.BACKEND_URL}/users/${id}/block` : `${process.env.BACKEND_URL}/users/${id}/unblock`;

    // Update user on backend
    const response = await fetch(endpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Backend response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to update user:", errorData);
      return NextResponse.json({ error: errorData.message || "Failed to update user" }, { status: response.status });
    }

    const data = await response.json();
    console.log("Successfully updated user:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in PATCH /api/admin/users/[id]:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = verifyAdmin(request);
    const userId = await Promise.resolve(params.id);

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // Delete the user
    const response = await fetch(`${process.env.BACKEND_URL}/users/${userId}`, {
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
    console.error("Error in DELETE /api/admin/users/[id]:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
