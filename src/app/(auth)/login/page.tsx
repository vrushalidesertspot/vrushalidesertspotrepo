"use client"

import { useState, useEffect } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import toast from "react-hot-toast"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { sendOTP } from "@/app/actions/otp"

const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

const phoneSchema = z.object({
  phoneNumber: z.string().min(10, "Valid phone number required"),
})

const otpSchema = z.object({
  code: z.string().length(6, "OTP must be 6 digits"),
})

export default function LoginPage() {
  const router = useRouter()
  const [method, setMethod] = useState<"email" | "phone">("email")
  const [googleLoading, setGoogleLoading] = useState(false)
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [otpLoading, setOtpLoading] = useState(false)
  const [phone, setPhone] = useState("")

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
  })

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
  })

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
  })

  const onEmailSubmit = async (values: z.infer<typeof emailSchema>) => {
    setLoading(true)
    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      toast.error("Invalid email or password")
    } else {
      toast.success("Successfully logged in!")
      router.push("/profile")
      router.refresh()
    }
  }

  const onPhoneSubmit = async (values: z.infer<typeof phoneSchema>) => {
    setLoading(true)
    const res = await sendOTP(values.phoneNumber)
    setLoading(false)

    if (res.error) {
      toast.error(res.error)
    } else {
      toast.success("OTP sent to " + values.phoneNumber)
      setPhoneNumber(values.phoneNumber)
      setOtpSent(true)
    }
  }

  const onOtpSubmit = async (values: z.infer<typeof otpSchema>) => {
    setLoading(true)
    const result = await signIn("phone", {
      phoneNumber,
      code: values.code,
      redirect: false,
    })
    setLoading(false)

    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success("Successfully verified and logged in!")
      router.push("/profile")
      router.refresh()
    }
  }

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true)
    try {
      await signIn("google", { callbackUrl: "/profile" })
    } catch (error) {
      toast.error("Google login failed. Please ensure environment variables are set.")
      console.error(error)
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-amber-50 px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <h2 className="font-playfair text-3xl font-bold tracking-tight text-amber-950">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-amber-700">
            Sign in to your Vrushali Desert Spot account
          </p>
        </div>

        {!otpSent && (
          <div className="flex rounded-md bg-amber-100 p-1">
            <button
              onClick={() => setMethod("email")}
              className={`flex-1 rounded-sm py-2 text-sm font-medium transition-colors ${
                method === "email" ? "bg-white text-amber-900 shadow" : "text-amber-700 hover:text-amber-900"
              }`}
            >
              Email
            </button>
            <button
              onClick={() => setMethod("phone")}
              className={`flex-1 rounded-sm py-2 text-sm font-medium transition-colors ${
                method === "phone" ? "bg-white text-amber-900 shadow" : "text-amber-700 hover:text-amber-900"
              }`}
            >
              Phone Number
            </button>
          </div>
        )}

        <div className="mt-8">
          {method === "email" && !otpSent && (
            <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                {...emailForm.register("email")}
                error={emailForm.formState.errors.email?.message}
              />
              <div className="space-y-1">
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  {...emailForm.register("password")}
                  error={emailForm.formState.errors.password?.message}
                />
                <div className="flex justify-end">
                  <Link href="/forgot-password" className="text-xs font-medium text-amber-600 hover:text-amber-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <Button type="submit" className="w-full" isLoading={loading}>
                Sign In
              </Button>
            </form>
          )}

          {method === "phone" && !otpSent && (
            <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-6">
              <Input
                label="Phone Number"
                type="tel"
                placeholder="+1234567890"
                {...phoneForm.register("phoneNumber")}
                error={phoneForm.formState.errors.phoneNumber?.message}
              />
              <Button type="submit" className="w-full" isLoading={loading}>
                Send OTP
              </Button>
            </form>
          )}

          {otpSent && (
            <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-6">
              <Input
                label="6-Digit OTP Code"
                type="text"
                placeholder="123456"
                {...otpForm.register("code")}
                error={otpForm.formState.errors.code?.message}
              />
              <Button type="submit" className="w-full" isLoading={loading}>
                Verify &amp; Sign In
              </Button>
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="text-sm text-amber-600 hover:underline"
                >
                  Use a different method
                </button>
              </div>
            </form>
          )}

          {!otpSent && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-amber-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-amber-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-white relative"
                  onClick={handleGoogleSignIn}
                  isLoading={googleLoading}
                >
                  <svg className="mr-2 h-4 w-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Sign in with Google
                    </span>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>

        {!otpSent && (
          <p className="mt-8 text-center text-sm text-amber-700">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-amber-600 hover:text-amber-500">
              Sign up
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}
