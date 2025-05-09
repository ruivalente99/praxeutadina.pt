import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Return a basic response for now
    return NextResponse.json({ 
      message: "Team API endpoint",
      status: "operational" 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}