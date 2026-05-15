import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

const providers: NextAuthConfig["providers"] = [
  Credentials({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    // Authorize logic requires DB, handled in auth.ts
    authorize: async () => null
  }),
  Credentials({
    id: "phone",
    name: "Phone",
    credentials: {
      phoneNumber: { label: "Phone Number", type: "text" },
      code: { label: "OTP Code", type: "text" },
    },
    // Authorize logic requires DB, handled in auth.ts
    authorize: async () => null
  })
]

// Only add Google provider if credentials are configured
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_CLIENT_ID !== "your_google_client_id_here") {
  providers.unshift(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  )
}

export default {
  providers,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAuthRoute = nextUrl.pathname.startsWith("/login") ||
                          nextUrl.pathname.startsWith("/register") ||
                          nextUrl.pathname.startsWith("/forgot-password") ||
                          nextUrl.pathname.startsWith("/reset-password")

      const isProtectedRoute = nextUrl.pathname.startsWith("/profile")

      if (isAuthRoute) {
        if (isLoggedIn) return Response.redirect(new URL("/profile", nextUrl))
        return true
      }

      if (isProtectedRoute && !isLoggedIn) {
        return Response.redirect(new URL("/login", nextUrl))
      }

      return true
    },
  },
} satisfies NextAuthConfig
