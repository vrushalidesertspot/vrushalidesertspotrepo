"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/auth"

export async function updateAvatar(base64: string) {
  try {
    const session = await auth()
    if (!session?.user) return { error: "Unauthorized" }

    await prisma.user.update({
      where: { id: session.user.id },
      data: { image: base64 }
    })

    return { success: true }
  } catch (error) {
    console.error("Avatar update error:", error)
    return { error: "Failed to update avatar" }
  }
}
