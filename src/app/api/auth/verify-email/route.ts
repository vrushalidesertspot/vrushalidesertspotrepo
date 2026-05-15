import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const token = searchParams.get("token")

  if (!token) {
    return NextResponse.redirect(new URL("/login?error=InvalidToken", req.url))
  }

  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token }
    })

    if (!verificationToken || verificationToken.expires < new Date()) {
      return NextResponse.redirect(new URL("/login?error=ExpiredToken", req.url))
    }

    await prisma.user.update({
      where: { email: verificationToken.identifier },
      data: { 
        emailVerified: new Date(),
        isVerified: true
      }
    })

    await prisma.verificationToken.delete({
      where: { token }
    })

    return NextResponse.redirect(new URL("/login?success=EmailVerified", req.url))
  } catch (error) {
    console.error("Verification error:", error)
    return NextResponse.redirect(new URL("/login?error=SomethingWentWrong", req.url))
  }
}
