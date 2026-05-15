"use server"

import { z } from "zod"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"
import { sendVerificationEmail } from "./email-verification"

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export async function registerUser(formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries())
    const parsed = registerSchema.safeParse(data)

    if (!parsed.success) {
      return { error: parsed.error.issues[0].message }
    }

    const { name, email, password } = parsed.data

    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { error: "User with this email already exists" }
    }

    const passwordHash = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    })

    // Send verification email (async, don't wait for it to return success to the user)
    sendVerificationEmail(email)

    return { success: true }
  } catch (error) {
    console.error("Registration error:", error)
    return { error: "Something went wrong" }
  }
}
