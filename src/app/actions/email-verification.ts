"use server"

import prisma from "@/lib/prisma"
import crypto from "crypto"
import { Resend } from "resend"

export async function sendVerificationEmail(email: string) {
  try {
    const token = crypto.randomBytes(32).toString("hex")
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires
      }
    })

    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/verify-email?token=${token}`

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: "Acme <onboarding@resend.dev>", // replace with verified domain
        to: email,
        subject: "Verify your email - Vrushali Desert Spot",
        html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email address.</p>`
      })
    } else {
      console.log(`[SIMULATED EMAIL] to ${email}: Verification link is ${verificationUrl}`)
    }

    return { success: true }
  } catch (error) {
    console.error("Verification email error:", error)
    return { error: "Failed to send verification email" }
  }
}
