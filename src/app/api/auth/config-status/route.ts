import { NextResponse } from "next/server"

export async function GET() {
  const googleConfigured =
    !!process.env.GOOGLE_CLIENT_ID &&
    !!process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_CLIENT_ID !== "your_google_client_id_here"

  return NextResponse.json({ googleConfigured })
}
