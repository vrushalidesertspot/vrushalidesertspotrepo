import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"

const credentialsProviders = [
  Credentials({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        throw new Error("Invalid credentials")
      }

      const user = await prisma.user.findUnique({
        where: { email: credentials.email as string }
      })

      if (!user || !user.passwordHash) {
        throw new Error("User not found or uses social login")
      }

      const isMatch = await bcrypt.compare(
        credentials.password as string,
        user.passwordHash
      )

      if (!isMatch) {
        throw new Error("Invalid password")
      }

      return user
    }
  }),
  Credentials({
    id: "phone",
    name: "Phone",
    credentials: {
      phoneNumber: { label: "Phone Number", type: "text" },
      code: { label: "OTP Code", type: "text" },
    },
    async authorize(credentials) {
      if (!credentials?.phoneNumber || !credentials?.code) {
        throw new Error("Missing phone number or code")
      }

      const otpRecord = await prisma.otpCode.findFirst({
        where: {
          phoneNumber: credentials.phoneNumber as string,
          code: credentials.code as string,
          expires: { gt: new Date() }
        },
        orderBy: { createdAt: "desc" }
      })

      if (!otpRecord) {
        throw new Error("Invalid or expired OTP")
      }

      let user = await prisma.user.findUnique({
        where: { phoneNumber: credentials.phoneNumber as string }
      })

      if (!user) {
        user = await prisma.user.create({
          data: {
            phoneNumber: credentials.phoneNumber as string,
            authProvider: "phone",
            isVerified: true
          }
        })
      }

      return user
    }
  })
]

// Only add Google provider if real credentials are configured
const googleProvider =
  process.env.GOOGLE_CLIENT_ID &&
  process.env.GOOGLE_CLIENT_SECRET &&
  process.env.GOOGLE_CLIENT_ID !== "your_google_client_id_here"
    ? [Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })]
    : []

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [...googleProvider, ...credentialsProviders],
  callbacks: {
    ...authConfig.callbacks,
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
      }
      return token
    }
  }
})
