"use client"

import { useState } from "react"
import { Cake } from "@prisma/client"
import { Plus, Edit2, Trash2, CheckCircle, XCircle, Search } from "lucide-react"
import { updateCake, createCake, deleteCake, seedCakes } from "@/app/actions/cakes"
import toast from "react-hot-toast"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function AdminCakeList({ initialCakes }: { initialCakes: Cake[] }) {
  const router = useRouter()
  const [cakes, setCakes] = useState<Cake[]>(initialCakes)
  const [search, setSearch] = useState("")
  const [editingCake, setEditingCake] = useState<Partial<Cake> | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSeed = async () => {
    if (!confirm("This will add default cakes to your menu. Continue?")) return
    setLoading(true)
    try {
      await seedCakes()
      toast.success("Database seeded! Refreshing...")
      router.refresh()
    } catch (error) {
      toast.error("Failed to seed database")
    } finally {
      setLoading(false)
    }
  }

  const filteredCakes = cakes.filter(cake => 
    cake.name.toLowerCase().includes(search.toLowerCase()) ||
    cake.category?.toLowerCase().includes(search.toLowerCase())
  )

  const handleEdit = (cake: Cake) => {
    setEditingCake(cake)
    setIsModalOpen(true)
  }

  const handleAddNew = () => {
    setEditingCake({
      name: "",
      description: "",
      price: 0,
      isAvailable: true,
      category: "Cakes",
      image: ""
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this cake?")) return
    try {
      await deleteCake(id)
      setCakes(cakes.filter(c => c.id !== id))
      toast.success("Cake deleted")
    } catch (error) {
      toast.error("Failed to delete cake")
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editingCake?.id) {
        const updated = await updateCake(editingCake.id, editingCake)
        setCakes(cakes.map(c => c.id === updated.id ? updated : c))
        toast.success("Cake updated")
      } else {
        const created = await createCake(editingCake)
        setCakes([created, ...cakes])
        toast.success("New cake added")
      }
      setIsModalOpen(false)
    } catch (error) {
      toast.error("Failed to save cake")
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setEditingCake({ ...editingCake, image: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search cakes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-rose outline-none"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={handleSeed}
            disabled={loading}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-2.5 rounded-xl hover:bg-gray-200 transition-all font-semibold"
          >
            Seed Database
          </button>
          <button
            onClick={handleAddNew}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary-rose text-white px-6 py-2.5 rounded-xl hover:bg-primary-dark transition-all font-semibold"
          >
            <Plus className="w-5 h-5" /> Add New
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCakes.map((cake) => (
          <div key={cake.id} className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100 flex flex-col">
            <div className="relative h-48 w-full">
              {cake.image ? (
                <Image src={cake.image} alt={cake.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 italic">No image</div>
              )}
              <div className="absolute top-3 right-3">
                {cake.isAvailable ? (
                  <span className="bg-green-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Available
                  </span>
                ) : (
                  <span className="bg-red-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <XCircle className="w-3 h-3" /> Out of Stock
                  </span>
                )}
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg text-primary-dark leading-tight">{cake.name}</h3>
                <span className="font-bold text-primary-rose">₹{cake.price}</span>
              </div>
              <p className="text-sm text-gray-500 line-clamp-2 mb-4">{cake.description || "No description provided."}</p>
              <div className="mt-auto flex gap-2">
                <button
                  onClick={() => handleEdit(cake)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all font-medium text-sm"
                >
                  <Edit2 className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(cake.id)}
                  className="p-2 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold text-primary-dark">
                {editingCake?.id ? "Edit Cake" : "Add New Cake"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <Plus className="w-6 h-6 rotate-45" />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cake Name</label>
                <input
                  required
                  value={editingCake?.name}
                  onChange={e => setEditingCake({ ...editingCake, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-rose outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={editingCake?.price || ""}
                    onChange={e => setEditingCake({ ...editingCake, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-rose outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={editingCake?.category || ""}
                    onChange={e => setEditingCake({ ...editingCake, category: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-rose outline-none"
                  >
                    <option value="Cakes">Cakes</option>
                    <option value="Custom">Custom</option>
                    <option value="Cupcakes">Cupcakes</option>
                    <option value="Cookies">Cookies</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingCake?.description}
                  onChange={e => setEditingCake({ ...editingCake, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-rose outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cake Image</label>
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0">
                    {editingCake?.image && <Image src={editingCake.image} alt="Preview" fill className="object-cover" />}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary-pink file:text-primary-dark hover:file:bg-primary-rose/20 cursor-pointer"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                <input
                  type="checkbox"
                  id="isAvailable"
                  checked={editingCake?.isAvailable}
                  onChange={e => setEditingCake({ ...editingCake, isAvailable: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-primary-rose focus:ring-primary-rose"
                />
                <label htmlFor="isAvailable" className="text-sm font-medium text-gray-700 cursor-pointer">
                  Available in Stock
                </label>
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-[2] py-3 rounded-xl bg-primary-rose text-white font-semibold hover:bg-primary-dark transition-all disabled:opacity-50"
                >
                  {loading ? "Saving..." : editingCake?.id ? "Update Cake" : "Create Cake"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
