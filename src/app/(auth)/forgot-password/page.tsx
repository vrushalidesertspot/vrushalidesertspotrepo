"use client"

import { useState } from "react"
import Link from "next/link"
import toast from "react-hot-toast"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { forgotPassword } from "@/app/actions/password"

const schema = z.object({
  email: z.string().email("Invalid email address"),
})

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (values: z.infer<typeof schema>) => {
    setLoading(true)
    const result = await forgotPassword(values.email)
    setLoading(false)

    if (result.error) {
      toast.error(result.error)
    } else {
      setSubmitted(true)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-amber-50 px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <h2 className="font-playfair text-3xl font-bold tracking-tight text-amber-950">
            Reset Password
          </h2>
          <p className="mt-2 text-sm text-amber-700">
            {submitted 
              ? "Check your email for a reset link." 
              : "Enter your email address and we'll send you a reset link."}
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              error={errors.email?.message}
            />

            <Button type="submit" className="w-full" isLoading={loading}>
              Send Reset Link
            </Button>
          </form>
        ) : (
          <div className="mt-8 flex justify-center">
            <Button variant="outline" onClick={() => setSubmitted(false)}>
              Try another email
            </Button>
          </div>
        )}

        <p className="mt-8 text-center text-sm text-amber-700">
          Remember your password?{" "}
          <Link href="/login" className="font-semibold text-amber-600 hover:text-amber-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
