"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Upload, Calendar, MapPin, Phone, Mail, Cake, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { cakes } from "@/data/cakes";

export default function CustomOrderPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    cakeFlavor: "",
    cakeWeight: "",
    cakeTheme: "",
    customMessage: "",
    deliveryDate: "",
    address: "",
    referenceImage: null as File | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [minDeliveryDate, setMinDeliveryDate] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [selectedCakeName, setSelectedCakeName] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setMinDeliveryDate(new Date().toISOString().split("T")[0]);
  }, []);

  const flavors = [
    "Chocolate",
    "Vanilla",
    "Red Velvet",
    "Butterscotch",
    "Black Forest",
    "Pineapple",
    "Strawberry",
    "Mango",
    "Coffee",
    "Fruit Cake",
  ];

  const weights = ["0.5 kg", "1 kg", "1.5 kg", "2 kg", "3 kg", "4 kg", "5 kg"];

  const themes = [
    "Birthday",
    "Wedding",
    "Anniversary",
    "Kids Theme",
    "Floral",
    "Minimalist",
    "Custom Design",
    "Photo Cake",
    "Corporate",
    "Festive",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, referenceImage: file }));
    }
  };

  useEffect(() => {
    setHydrated(true);
    const params = new URLSearchParams(window.location.search);
    const imageQuery = params.get("image");
    const nameQuery = params.get("name");

    if (imageQuery) {
      setPreviewImage(imageQuery);
    } else {
      const randomCake = cakes[Math.floor(Math.random() * cakes.length)];
      setPreviewImage(randomCake.image);
    }

    if (nameQuery) {
      setSelectedCakeName(nameQuery);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);
    toast.success("Custom order submitted successfully!");

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        cakeFlavor: "",
        cakeWeight: "",
        cakeTheme: "",
        customMessage: "",
        deliveryDate: "",
        address: "",
        referenceImage: null,
      });
    }, 3000);
  };

  return (
    <div className="pt-20 min-h-screen bg-primary-cream">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-rose to-primary-hotPink py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-4">
              Custom Cake Order
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Create your dream cake with our premium custom cake ordering service
            </p>
            {hydrated && previewImage && (
              <div className="mt-10 rounded-3xl overflow-hidden shadow-2xl">
                <div className="relative h-72 md:h-96">
                  <Image
                    src={previewImage}
                    alt={selectedCakeName ? `Order ${selectedCakeName}` : "Cake inspiration"}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-end p-6">
                    <div className="bg-white/90 rounded-full px-4 py-2 text-sm font-semibold text-primary-dark">
                      {selectedCakeName ? `Ordering: ${selectedCakeName}` : "Inspiration for your custom cake order"}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-12 shadow-xl text-center"
            >
              <CheckCircle className="w-20 h-20 text-primary-rose mx-auto mb-6" />
              <h2 className="font-playfair text-3xl font-bold text-primary-dark mb-4">
                Order Submitted Successfully!
              </h2>
              <p className="text-primary-dark/70 text-lg mb-6">
                Thank you for your custom order. Our team will contact you within 24 hours to discuss the details.
              </p>
              <p className="text-primary-dark/60">
                WhatsApp: +91 88068 61955
              </p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-primary-dark font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-primary-pink/30 focus:outline-none focus:ring-2 focus:ring-primary-rose bg-primary-cream"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-primary-dark font-medium mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-dark/50" />
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-primary-pink/30 focus:outline-none focus:ring-2 focus:ring-primary-rose bg-primary-cream"
                      placeholder="+91 88068 61955"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label className="block text-primary-dark font-medium mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-dark/50" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-primary-pink/30 focus:outline-none focus:ring-2 focus:ring-primary-rose bg-primary-cream"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Cake Flavor */}
                <div>
                  <label className="block text-primary-dark font-medium mb-2">
                    Cake Flavor *
                  </label>
                  <select
                    name="cakeFlavor"
                    value={formData.cakeFlavor}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-primary-pink/30 focus:outline-none focus:ring-2 focus:ring-primary-rose bg-primary-cream"
                  >
                    <option value="">Select flavor</option>
                    {flavors.map((flavor) => (
                      <option key={flavor} value={flavor}>
                        {flavor}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Cake Weight */}
                <div>
                  <label className="block text-primary-dark font-medium mb-2">
                    Cake Weight *
                  </label>
                  <select
                    name="cakeWeight"
                    value={formData.cakeWeight}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-primary-pink/30 focus:outline-none focus:ring-2 focus:ring-primary-rose bg-primary-cream"
                  >
                    <option value="">Select weight</option>
                    {weights.map((weight) => (
                      <option key={weight} value={weight}>
                        {weight}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Cake Theme */}
                <div className="md:col-span-2">
                  <label className="block text-primary-dark font-medium mb-2">
                    Cake Theme *
                  </label>
                  <select
                    name="cakeTheme"
                    value={formData.cakeTheme}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-primary-pink/30 focus:outline-none focus:ring-2 focus:ring-primary-rose bg-primary-cream"
                  >
                    <option value="">Select theme</option>
                    {themes.map((theme) => (
                      <option key={theme} value={theme}>
                        {theme}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Custom Message */}
                <div className="md:col-span-2">
                  <label className="block text-primary-dark font-medium mb-2">
                    Custom Message on Cake
                  </label>
                  <textarea
                    name="customMessage"
                    value={formData.customMessage}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-primary-pink/30 focus:outline-none focus:ring-2 focus:ring-primary-rose bg-primary-cream"
                    placeholder="Enter custom message (e.g., Happy Birthday John!)"
                  />
                </div>

                {/* Delivery Date */}
                <div>
                  <label className="block text-primary-dark font-medium mb-2">
                    Delivery Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-dark/50" />
                    <input
                      type="date"
                      name="deliveryDate"
                      value={formData.deliveryDate}
                      onChange={handleInputChange}
                      required
                      min={minDeliveryDate}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-primary-pink/30 focus:outline-none focus:ring-2 focus:ring-primary-rose bg-primary-cream"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-primary-dark font-medium mb-2">
                    Delivery Address *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-dark/50" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-primary-pink/30 focus:outline-none focus:ring-2 focus:ring-primary-rose bg-primary-cream"
                      placeholder="Enter delivery address"
                    />
                  </div>
                </div>

                {/* Reference Image */}
                <div className="md:col-span-2">
                  <label className="block text-primary-dark font-medium mb-2">
                    Upload Reference Image (Optional)
                  </label>
                  <div className="relative border-2 border-dashed border-primary-pink/30 rounded-xl p-8 text-center hover:border-primary-rose transition-colors">
                    <input
                      type="file"
                      name="referenceImage"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload className="w-12 h-12 text-primary-rose mx-auto mb-4" />
                    <p className="text-primary-dark/70 mb-2">
                      {formData.referenceImage ? formData.referenceImage.name : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-primary-dark/50 text-sm">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-8 bg-gradient-to-r from-primary-rose to-primary-hotPink text-white px-8 py-4 rounded-full font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Cake className="w-5 h-5 mr-2" />
                    Submit Custom Order
                  </>
                )}
              </motion.button>
            </motion.form>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary-dark mb-4">
              Need Help?
            </h2>
            <p className="text-primary-dark/70 text-lg max-w-2xl mx-auto">
              Contact us directly for quick assistance with your custom order
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass p-6 rounded-2xl text-center">
              <Phone className="w-12 h-12 text-primary-rose mx-auto mb-4" />
              <h3 className="font-playfair text-xl font-bold text-primary-dark mb-2">Call Us</h3>
              <p className="text-primary-dark/70">+91 88068 61955</p>
            </div>

            <div className="glass p-6 rounded-2xl text-center">
              <Mail className="w-12 h-12 text-primary-rose mx-auto mb-4" />
              <h3 className="font-playfair text-xl font-bold text-primary-dark mb-2">Email Us</h3>
              <p className="text-primary-dark/70">hello@vrushalidesertspot.com</p>
            </div>

            <div className="glass p-6 rounded-2xl text-center">
              <MapPin className="w-12 h-12 text-primary-rose mx-auto mb-4" />
              <h3 className="font-playfair text-xl font-bold text-primary-dark mb-2">Visit Us</h3>
              <p className="text-primary-dark/70">123 Baker Street, Sweet Town</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
