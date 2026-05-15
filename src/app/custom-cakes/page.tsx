"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Cake, Layers, Palette, Sparkles, ShoppingCart, Check } from "lucide-react";
import toast from "react-hot-toast";
import { useCartStore } from "@/store/cartStore";

export default function CustomCakesBuilderPage() {
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedCream, setSelectedCream] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [customTopper, setCustomTopper] = useState(false);
  const [customText, setCustomText] = useState("");
  const addItem = useCartStore((state) => state.addItem);

  const flavors = [
    { id: "chocolate", name: "Chocolate", price: 0, color: "#5C3A21" },
    { id: "vanilla", name: "Vanilla", price: 0, color: "#FFF8F0" },
    { id: "red-velvet", name: "Red Velvet", price: 50, color: "#E91E63" },
    { id: "butterscotch", name: "Butterscotch", price: 0, color: "#D4AF37" },
    { id: "black-forest", name: "Black Forest", price: 50, color: "#3E2723" },
    { id: "strawberry", name: "Strawberry", price: 30, color: "#FF69B4" },
  ];

  const sizes = [
    { id: "0.5", name: "0.5 kg", price: 499, serves: "4-6" },
    { id: "1", name: "1 kg", price: 799, serves: "8-10" },
    { id: "1.5", name: "1.5 kg", price: 1099, serves: "12-15" },
    { id: "2", name: "2 kg", price: 1399, serves: "16-20" },
    { id: "3", name: "3 kg", price: 1999, serves: "25-30" },
  ];

  const creams = [
    { id: "whipped", name: "Whipped Cream", price: 0 },
    { id: "buttercream", name: "Buttercream", price: 50 },
    { id: "cream-cheese", name: "Cream Cheese", price: 80 },
    { id: "ganache", name: "Chocolate Ganache", price: 100 },
  ];

  const themes = [
    { id: "birthday", name: "Birthday", price: 100, icon: "🎂" },
    { id: "wedding", name: "Wedding", price: 200, icon: "💒" },
    { id: "floral", name: "Floral", price: 150, icon: "🌸" },
    { id: "minimalist", name: "Minimalist", price: 50, icon: "✨" },
    { id: "kids", name: "Kids Theme", price: 120, icon: "🎈" },
    { id: "custom", name: "Custom Design", price: 200, icon: "🎨" },
  ];

  const totalPrice = useMemo(() => {
    let price = 0;
    const size = sizes.find((s) => s.id === selectedSize);
    if (size) price += size.price;
    const flavor = flavors.find((f) => f.id === selectedFlavor);
    if (flavor) price += flavor.price;
    const cream = creams.find((c) => c.id === selectedCream);
    if (cream) price += cream.price;
    const theme = themes.find((t) => t.id === selectedTheme);
    if (theme) price += theme.price;
    if (customTopper) price += 150;
    return price;
  }, [selectedSize, selectedFlavor, selectedCream, selectedTheme, customTopper]);

  const handleAddToCart = () => {
    if (!selectedFlavor || !selectedSize || !selectedCream || !selectedTheme) {
      toast.error("Please select all required options");
      return;
    }

    const customCake = {
      id: `custom-${Date.now()}`,
      name: "Custom Cake",
      category: "Custom Cakes",
      price: totalPrice,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800",
      rating: 5,
      reviews: 0,
      description: `Custom ${selectedFlavor} cake with ${selectedCream} and ${selectedTheme} theme`,
      flavors: [selectedFlavor],
      weights: [parseFloat(selectedSize)],
      isEggless: true,
      isBestseller: false,
      isTrending: false,
    };

    addItem(customCake, selectedFlavor, parseFloat(selectedSize), customText);
    toast.success("Custom cake added to cart!");
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
              Custom Cake Builder
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto mb-8">
              Design your perfect cake with our interactive builder
            </p>
            <Link
              href="/custom-cakes/add"
              className="inline-flex mx-auto rounded-full bg-white px-8 py-4 text-primary-rose font-semibold hover:bg-primary-cream transition"
            >
              Add Your Own Cake
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Builder Options */}
            <div className="space-y-8">
              {/* Flavor Selection */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="font-playfair text-2xl font-bold text-primary-dark mb-4 flex items-center">
                  <Cake className="w-6 h-6 mr-2 text-primary-rose" />
                  Select Flavor
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {flavors.map((flavor) => (
                    <motion.button
                      key={flavor.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedFlavor(flavor.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedFlavor === flavor.id
                          ? "border-primary-rose bg-primary-rose/10"
                          : "border-primary-pink/30 hover:border-primary-rose"
                      }`}
                    >
                      <div
                        className="w-12 h-12 rounded-full mx-auto mb-2"
                        style={{ backgroundColor: flavor.color }}
                      />
                      <p className="font-medium text-primary-dark">{flavor.name}</p>
                      {flavor.price > 0 && (
                        <p className="text-sm text-primary-rose">+₹{flavor.price}</p>
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Size Selection */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="font-playfair text-2xl font-bold text-primary-dark mb-4 flex items-center">
                  <Layers className="w-6 h-6 mr-2 text-primary-rose" />
                  Select Size
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {sizes.map((size) => (
                    <motion.button
                      key={size.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedSize(size.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedSize === size.id
                          ? "border-primary-rose bg-primary-rose/10"
                          : "border-primary-pink/30 hover:border-primary-rose"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-primary-dark">{size.name}</p>
                          <p className="text-sm text-primary-dark/60">Serves {size.serves}</p>
                        </div>
                        <p className="font-bold text-primary-rose">₹{size.price}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Cream Selection */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="font-playfair text-2xl font-bold text-primary-dark mb-4 flex items-center">
                  <Palette className="w-6 h-6 mr-2 text-primary-rose" />
                  Select Cream Type
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {creams.map((cream) => (
                    <motion.button
                      key={cream.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedCream(cream.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedCream === cream.id
                          ? "border-primary-rose bg-primary-rose/10"
                          : "border-primary-pink/30 hover:border-primary-rose"
                      }`}
                    >
                      <p className="font-medium text-primary-dark">{cream.name}</p>
                      {cream.price > 0 && (
                        <p className="text-sm text-primary-rose">+₹{cream.price}</p>
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Theme Selection */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="font-playfair text-2xl font-bold text-primary-dark mb-4 flex items-center">
                  <Sparkles className="w-6 h-6 mr-2 text-primary-rose" />
                  Select Theme
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {themes.map((theme) => (
                    <motion.button
                      key={theme.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedTheme(theme.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedTheme === theme.id
                          ? "border-primary-rose bg-primary-rose/10"
                          : "border-primary-pink/30 hover:border-primary-rose"
                      }`}
                    >
                      <div className="text-3xl mb-2">{theme.icon}</div>
                      <p className="font-medium text-primary-dark">{theme.name}</p>
                      <p className="text-sm text-primary-rose">+₹{theme.price}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Custom Options */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="font-playfair text-2xl font-bold text-primary-dark mb-4">
                  Custom Options
                </h3>
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 rounded-xl border border-primary-pink/30 hover:border-primary-rose cursor-pointer">
                    <div>
                      <p className="font-medium text-primary-dark">Custom Topper</p>
                      <p className="text-sm text-primary-dark/60">Add a personalized topper</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-primary-rose font-medium">+₹150</span>
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={customTopper}
                          onChange={(e) => setCustomTopper(e.target.checked)}
                          className="sr-only"
                        />
                        <div
                          className={`w-6 h-6 rounded-full border-2 transition-all ${
                            customTopper
                              ? "bg-primary-rose border-primary-rose"
                              : "border-primary-pink"
                          }`}
                        >
                          {customTopper && (
                            <Check className="w-4 h-4 text-white m-0.5" />
                          )}
                        </div>
                      </div>
                    </div>
                  </label>

                  <div>
                    <label className="block text-primary-dark font-medium mb-2">
                      Custom Text on Cake
                    </label>
                    <input
                      type="text"
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder="e.g., Happy Birthday!"
                      className="w-full px-4 py-3 rounded-xl border border-primary-pink/30 focus:outline-none focus:ring-2 focus:ring-primary-rose bg-primary-cream"
                      maxLength={50}
                    />
                    <p className="text-sm text-primary-dark/50 mt-1">
                      {customText.length}/50 characters
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Preview Panel */}
            <div className="lg:sticky lg:top-24 h-fit space-y-6">
              {/* Live Preview */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="font-playfair text-2xl font-bold text-primary-dark mb-4">
                  Live Preview
                </h3>
                <div className="relative h-80 rounded-xl overflow-hidden bg-gradient-to-br from-primary-cream to-primary-lightPink mb-4">
                  <AnimatePresence mode="wait">
                    {selectedFlavor && (
                      <motion.div
                        key={selectedFlavor}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <div
                          className="w-48 h-48 rounded-full shadow-2xl"
                          style={{
                            backgroundColor:
                              flavors.find((f) => f.id === selectedFlavor)?.color || "#FFB6C1",
                          }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {customText && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-8 left-0 right-0 text-center"
                    >
                      <p className="font-playfair text-xl font-bold text-primary-dark bg-white/80 rounded-full px-4 py-2 inline-block">
                        {customText}
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* Order Summary */}
                <div className="space-y-3 border-t border-primary-pink/20 pt-4">
                  <div className="flex justify-between">
                    <span className="text-primary-dark/70">Flavor:</span>
                    <span className="font-medium text-primary-dark">
                      {selectedFlavor
                        ? flavors.find((f) => f.id === selectedFlavor)?.name
                        : "Not selected"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-dark/70">Size:</span>
                    <span className="font-medium text-primary-dark">
                      {selectedSize
                        ? sizes.find((s) => s.id === selectedSize)?.name
                        : "Not selected"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-dark/70">Cream:</span>
                    <span className="font-medium text-primary-dark">
                      {selectedCream
                        ? creams.find((c) => c.id === selectedCream)?.name
                        : "Not selected"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary-dark/70">Theme:</span>
                    <span className="font-medium text-primary-dark">
                      {selectedTheme
                        ? themes.find((t) => t.id === selectedTheme)?.name
                        : "Not selected"}
                    </span>
                  </div>
                  {customTopper && (
                    <div className="flex justify-between">
                      <span className="text-primary-dark/70">Custom Topper:</span>
                      <span className="font-medium text-primary-dark">+₹150</span>
                    </div>
                  )}
                  <div className="border-t border-primary-pink/20 pt-3 flex justify-between items-center">
                    <span className="font-playfair text-xl font-bold text-primary-dark">
                      Total Price:
                    </span>
                    <span className="font-playfair text-2xl font-bold text-primary-rose">
                      ₹{totalPrice}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  className="w-full mt-6 bg-gradient-to-r from-primary-rose to-primary-hotPink text-white px-8 py-4 rounded-full font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
