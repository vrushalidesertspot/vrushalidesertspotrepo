"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X, Search, User, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import CartDrawer from "../cart/CartDrawer";
import CheckoutModal from "../cart/CheckoutModal";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleCheckoutTrigger = () => {
    setIsCartOpen(false); // Close cart drawer
    setTimeout(() => setIsCheckoutOpen(true), 300); // Open checkout modal
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Cakes", href: "/cakes" },
    { name: "Categories", href: "/categories" },
    { name: "Custom Cakes", href: "/custom-cakes" },
    { name: "Offers", href: "/offers" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                initial={{ rotate: -10 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl"
              >
                🎂
              </motion.div>
              <span className="font-playfair text-2xl font-bold text-primary-dark">
                Vrushali Desert Spot
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-primary-dark hover:text-primary-rose transition-colors duration-300 font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              <button className="hidden md:flex p-2 hover:bg-primary-pink/50 rounded-full transition-colors">
                <Search className="w-5 h-5 text-primary-dark" />
              </button>
              <button className="hidden md:flex p-2 hover:bg-primary-pink/50 rounded-full transition-colors">
                <Heart className="w-5 h-5 text-primary-dark" />
              </button>
              <Link href="/profile" className="hidden md:flex p-2 hover:bg-primary-pink/50 rounded-full transition-colors">
                <User className="w-5 h-5 text-primary-dark" />
              </Link>
              
              {/* Admin Link */}
              {session?.user?.role === "admin" && (
                <Link
                  href="/admin"
                  className="hidden md:flex text-primary-dark font-medium hover:text-primary-rose transition-colors px-3 py-2 bg-primary-pink/20 rounded-lg"
                >
                  Admin Panel
                </Link>
              )}
              
              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-primary-pink/50 rounded-full transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-primary-dark" />
                {hydrated && totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-primary-rose text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 hover:bg-primary-pink/50 rounded-full transition-colors"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-primary-dark" />
                ) : (
                  <Menu className="w-6 h-6 text-primary-dark" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-md border-t"
            >
              <div className="px-4 py-4 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block py-2 text-primary-dark hover:text-primary-rose transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                {session?.user?.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 text-primary-dark font-bold bg-primary-pink/20 px-3 rounded-lg"
                  >
                    Admin Panel
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onCheckout={handleCheckoutTrigger}
      />

      {/* Checkout Modal */}
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)} 
      />
    </>
  );
}
