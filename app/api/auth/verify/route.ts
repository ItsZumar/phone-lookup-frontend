import { type NextRequest, NextResponse } from "next/server"

function verifyToken(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token provided")
  }

  const token = authHeader.substring(7)
  if (!token) {
    throw new Error("Invalid token format")
  }

  return token
}

export async function GET(request: NextRequest) {
  try {
    const token = verifyToken(request)

    // Get user profile from backend
    const response = await fetch(`${process.env.BACKEND_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const userData = await response.json()

    // Transform the user data to match the frontend's expected format
    const transformedUser = {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      role: userData.role.toLowerCase()
    }

    return NextResponse.json({ user: transformedUser })
  } catch (error) {
    console.error("Error in GET /api/auth/verify:", error)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
