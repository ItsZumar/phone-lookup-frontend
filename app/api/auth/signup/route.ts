import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    const response = await fetch(`${process.env.BACKEND_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Registration failed" },
        { status: response.status }
      )
    }

    // After registration, log the user in
    const loginResponse = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const loginData = await loginResponse.json()

    if (!loginResponse.ok) {
      return NextResponse.json(
        { error: "Registration successful but login failed" },
        { status: 500 }
      )
    }

    // Transform the response to match frontend expectations
    return NextResponse.json({
      token: loginData.access_token,
      user: {
        ...loginData.user,
        role: loginData.user.role.toLowerCase()
      }
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
