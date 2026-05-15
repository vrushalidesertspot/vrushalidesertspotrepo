"use server"

import prisma from "@/lib/prisma"
import { Resend } from "resend"
import crypto from "crypto"

export async function forgotPassword(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      // Don't leak whether user exists
      return { success: true }
    }

    const token = crypto.randomBytes(32).toString("hex")
    const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    await prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expires
      }
    })

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password?token=${token}`

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: "Acme <onboarding@resend.dev>", // replace with verified domain
        to: email,
        subject: "Reset your password - Vrushali Desert Spot",
        html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`
      })
    } else {
      console.log(`[SIMULATED EMAIL] to ${email}: Reset password link is ${resetUrl}`)
    }

    return { success: true }
  } catch (error) {
    console.error("Forgot password error:", error)
    return { error: "Failed to send reset email" }
  }
}

export async function resetPassword(token: string, password: string) {
  try {
    const resetRecord = await prisma.passwordResetToken.findUnique({
      where: { token }
    })

    if (!resetRecord || resetRecord.expires < new Date()) {
      return { error: "Invalid or expired reset token" }
    }

    const bcrypt = require("bcryptjs")
    const passwordHash = await bcrypt.hash(password, 10)

    await prisma.user.update({
      where: { email: resetRecord.email },
      data: { passwordHash }
    })

    await prisma.passwordResetToken.delete({
      where: { id: resetRecord.id }
    })

    return { success: true }
  } catch (error) {
    console.error("Reset password error:", error)
    return { error: "Failed to reset password" }
  }
}
