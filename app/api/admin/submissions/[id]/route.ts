import { type NextRequest, NextResponse } from "next/server";

function verifyAdmin(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token provided");
  }

  return authHeader.substring(7);
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = verifyAdmin(request);
    const { status } = await request.json();
    const { id } = await params;

    // Convert status to uppercase to match backend Status enum
    const statusValue = status.toUpperCase();

    // Call the backend admin endpoint to update the submission
    const response = await fetch(`${process.env.BACKEND_URL}/reports/${id}/admin`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: statusValue }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.message || "Failed to update submission" }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating submission:", error);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
