import { type NextRequest, NextResponse } from "next/server"

function verifyAdmin(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("No token provided")
  }

  return authHeader.substring(7)
}

export async function GET(request: NextRequest) {
  try {
    const token = verifyAdmin(request)

    const response = await fetch(`${process.env.BACKEND_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()
    console.log("Admin users API response:", { status: response.status, dataLength: Array.isArray(data) ? data.length : 'not array' })

    if (!response.ok) {
      return NextResponse.json({ error: data.message || "Unauthorized" }, { status: response.status })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Admin users API error:", error)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
