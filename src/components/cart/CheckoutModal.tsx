"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { useCartStore } from "@/store/cartStore"
import toast from "react-hot-toast"
import { useSession } from "next-auth/react"

import { sendOrderConfirmation } from "@/app/actions/order"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { data: session } = useSession()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    landmark: "",
  })

  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        name: session.user.name || "",
        email: session.user.email || "",
      }))
    }
  }, [session])

  const WHATSAPP_NUMBER = "919822525258"

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone || !formData.address || !formData.email) {
      toast.error("Please fill in all required fields")
      return
    }

    setLoading(true)

    try {
      // Send Confirmation Email
      await sendOrderConfirmation({
        ...formData,
        items: items,
        total: getTotalPrice()
      })

    // Construct WhatsApp message
    let message = `*New Order from Vrushali Desert Spot*\n\n`
    message += `*Customer Details:*\n`
    message += `Name: ${formData.name}\n`
    message += `Email: ${formData.email}\n`
    message += `Phone: ${formData.phone}\n`
    message += `Address: ${formData.address}\n`
    if (formData.landmark) message += `Landmark: ${formData.landmark}\n`
    message += `\n*Order Items:*\n`

    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.selectedWeight}kg)\n`
      message += `   Flavor: ${item.selectedFlavor}\n`
      message += `   Qty: ${item.quantity}\n`
      if (item.customMessage) message += `   Msg: "${item.customMessage}"\n`
      message += `   Price: ₹${item.price * item.quantity}\n\n`
    })

    message += `*Total Amount: ₹${getTotalPrice()}*\n\n`
    message += `Please confirm my order. Thank you!`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`

    // Redirect to WhatsApp
    window.open(whatsappUrl, "_blank")
    
    toast.success("Order placed! Redirecting to WhatsApp...")
    clearCart()
    onClose()
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 m-auto h-fit max-w-2xl w-[95%] bg-white z-[70] rounded-2xl shadow-2xl p-6 md:p-8 overflow-y-auto max-h-[95vh]"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-playfair text-2xl font-bold text-primary-dark">Complete Your Order</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={24} />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Form Section */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-semibold text-gray-800 border-b pb-2">Delivery Information</h3>
                <Input
                  label="Full Name *"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                />
                <Input
                  label="Email Address *"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="For order summary"
                  required
                />
                <Input
                  label="WhatsApp Number *"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="For order tracking"
                  required
                />
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Delivery Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-rose focus:border-transparent outline-none transition-all min-h-[80px] resize-none"
                    placeholder="Enter your full address"
                    required
                  />
                </div>
                <Input
                  label="Landmark (Optional)"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleInputChange}
                  placeholder="Near by place"
                />
                <Button
                  type="submit"
                  className="w-full py-4 text-lg mt-4"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Place Order on WhatsApp"}
                </Button>
              </form>

              {/* Summary Section */}
              <div className="bg-gray-50 rounded-2xl p-6 h-fit">
                <h3 className="font-semibold text-gray-800 border-b pb-2 mb-4">Order Summary</h3>
                <div className="space-y-4 max-h-[300px] overflow-y-auto mb-4 pr-2">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.selectedFlavor}`} className="flex justify-between text-sm">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.name} x {item.quantity}</p>
                        <p className="text-xs text-gray-500">{item.selectedFlavor} | {item.selectedWeight}kg</p>
                      </div>
                      <span className="font-semibold text-gray-900 ml-4">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{getTotalPrice()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-primary-dark pt-2 border-t border-dashed">
                    <span>Total Amount</span>
                    <span>₹{getTotalPrice()}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-center text-xs text-gray-500 mt-6 italic">
              * By clicking Place Order, you will be redirected to WhatsApp to share your order with us for final confirmation.
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
