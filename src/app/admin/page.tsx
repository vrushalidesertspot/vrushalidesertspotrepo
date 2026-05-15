import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getCakes } from "@/app/actions/cakes"
import AdminCakeList from "@/components/admin/AdminCakeList"

export default async function AdminPage() {
  const session = await auth()

  if (session?.user?.role !== "admin") {
    redirect("/login")
  }

  const cakes = await getCakes()

  return (
    <div className="min-h-screen bg-primary-cream pt-28 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-playfair text-4xl font-bold text-primary-dark">Admin Dashboard</h1>
            <p className="text-primary-dark/60">Manage your menu and availability</p>
          </div>
          <div className="bg-primary-rose text-white px-4 py-2 rounded-full text-sm font-semibold">
            Logged in as Admin
          </div>
        </div>

        <AdminCakeList initialCakes={JSON.parse(JSON.stringify(cakes))} />
      </div>
    </div>
  )
}
