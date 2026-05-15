import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/Button"
import prisma from "@/lib/prisma"
import AvatarUpload from "@/components/profile/AvatarUpload"
import { updateAvatar } from "@/app/actions/profile"

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  })

  return (
    <div className="min-h-screen bg-amber-50 px-4 py-12">
      <div className="mx-auto max-w-3xl space-y-8 rounded-xl bg-white p-8 shadow-xl">
        <div className="border-b border-amber-200 pb-6 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <AvatarUpload initialImage={user?.image} onUpload={updateAvatar} />
          <div className="flex-1">
            <h2 className="font-playfair text-3xl font-bold tracking-tight text-amber-950">
              {user?.name || "Member"}
            </h2>
            <p className="mt-1 text-sm text-amber-700">
              Manage your Vrushali Desert Spot account
            </p>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-4 text-center sm:text-left">
            <div>
              <h3 className="text-sm font-medium text-amber-900">Name</h3>
              <p className="mt-1 text-lg text-amber-950">{user?.name || "Not provided"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-amber-900">Email</h3>
              <p className="mt-1 text-lg text-amber-950">{user?.email || "Not provided"}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-amber-900">Phone Number</h3>
              <p className="mt-1 text-lg text-amber-950">{user?.phoneNumber || "Not provided"}</p>
            </div>
          </div>

          <div className="space-y-4 rounded-lg bg-amber-100 p-6 text-center sm:text-left">
            <h3 className="font-medium text-amber-950">Account Security</h3>
            <p className="text-sm text-amber-800">
              Logged in via: <span className="font-semibold capitalize">{user?.authProvider || "Email"}</span>
            </p>
            
            <form
              action={async () => {
                "use server"
                await signOut({ redirectTo: "/" })
              }}
              className="pt-4"
            >
              <Button type="submit" variant="primary" className="w-full sm:w-auto">
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
