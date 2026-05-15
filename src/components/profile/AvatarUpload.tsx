"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Camera } from "lucide-react"
import toast from "react-hot-toast"
import Image from "next/image"

export default function AvatarUpload({ initialImage, onUpload }: { initialImage?: string | null, onUpload: (base64: string) => Promise<any> }) {
  const [image, setImage] = useState(initialImage || null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB")
      return
    }

    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64 = reader.result as string
      setLoading(true)
      const res = await onUpload(base64)
      setLoading(false)
      
      if (res.success) {
        setImage(base64)
        toast.success("Avatar updated successfully")
      } else {
        toast.error(res.error || "Failed to update avatar")
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-amber-100 bg-amber-50">
        {image ? (
          <Image src={image} alt="Avatar" fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-amber-200">
            <Camera size={40} />
          </div>
        )}
        <label className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
          <Camera className="text-white" />
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={loading} />
        </label>
      </div>
      {loading && <p className="text-xs text-amber-600 animate-pulse">Uploading...</p>}
    </div>
  )
}
