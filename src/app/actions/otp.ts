"use server"

import prisma from "@/lib/prisma"
import twilio from "twilio"

export async function sendOTP(phoneNumber: string) {
  try {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString()
    const expires = new Date(Date.now() + 10 * 60 * 1000) // 10 mins

    await prisma.otpCode.create({
      data: {
        phoneNumber,
        code: otpCode,
        expires
      }
    })

    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const fromNumber = process.env.TWILIO_PHONE_NUMBER

    if (accountSid && authToken && fromNumber) {
      const client = twilio(accountSid, authToken)
      await client.messages.create({
        body: `Your Vrushali Desert Spot verification code is: ${otpCode}`,
        from: fromNumber,
        to: phoneNumber
      })
    } else {
      console.log(`[SIMULATED SMS] to ${phoneNumber}: Your code is ${otpCode}`)
    }

    return { success: true }
  } catch (error) {
    console.error("OTP Error:", error)
    return { error: "Failed to send OTP" }
  }
}

export async function verifyOTP(phoneNumber: string, code: string) {
  try {
    const otpRecord = await prisma.otpCode.findFirst({
      where: {
        phoneNumber,
        code,
        expires: { gt: new Date() }
      },
      orderBy: { createdAt: "desc" }
    })

    if (!otpRecord) {
      return { error: "Invalid or expired OTP" }
    }

    // Mark verified or create user
    let user = await prisma.user.findUnique({
      where: { phoneNumber }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          phoneNumber,
          authProvider: "phone",
          isVerified: true
        }
      })
    }

    // Note: since this is server-side, returning true means we should sign them in using NextAuth
    // We would need a custom credentials provider for phone login or use NextAuth to manually sign in.
    
    return { success: true, userId: user.id }
  } catch (error) {
    console.error("Verify Error:", error)
    return { error: "Failed to verify OTP" }
  }
}
