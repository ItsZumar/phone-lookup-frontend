import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    console.log("Frontend received data:", body)

    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      console.log("Missing required fields:", { 
        name: !!body.name, 
        email: !!body.email, 
        subject: !!body.subject, 
        message: !!body.message 
      })
      return NextResponse.json(
        { error: "All fields are required: name, email, subject, message" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Validate message length
    if (body.message.length < 10) {
      console.log("Message too short:", body.message.length)
      return NextResponse.json(
        { error: "Message must be at least 10 characters long" },
        { status: 400 }
      )
    }

    if (body.message.length > 1000) {
      return NextResponse.json(
        { error: "Message must be less than 1000 characters" },
        { status: 400 }
      )
    }

    // Validate subject length
    if (body.subject.length < 5) {
      console.log("Subject too short:", body.subject.length)
      return NextResponse.json(
        { error: "Subject must be at least 5 characters long" },
        { status: 400 }
      )
    }

    if (body.subject.length > 200) {
      return NextResponse.json(
        { error: "Subject must be less than 200 characters" },
        { status: 400 }
      )
    }

    console.log("Sending to backend:", {
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
    })

    // Forward to backend
    const response = await fetch(`${process.env.BACKEND_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: body.name,
        email: body.email,
        subject: body.subject,
        message: body.message,
      }),
    })

    const data = await response.json()
    console.log("Backend response:", { status: response.status, data })

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Failed to submit contact form" },
        { status: response.status }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in POST /api/contact:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
