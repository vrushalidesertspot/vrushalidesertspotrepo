"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const whatsappNumber = "919822525258";
  const whatsappMessage = "Hi! I'm interested in ordering a cake from Vrushali Desert Spot.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="pt-20 min-h-screen bg-primary-cream">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-rose to-primary-hotPink py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-white/90 text-xl max-w-2xl mx-auto">
              Get in touch with us for orders, inquiries, or custom cake requests
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* WhatsApp Contact */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-xl"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center mr-4">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="font-playfair text-2xl font-bold text-primary-dark">
                    WhatsApp
                  </h2>
                  <p className="text-primary-dark/70">Quick response</p>
                </div>
              </div>
              <p className="text-primary-dark/70 mb-6">
                Chat with us directly on WhatsApp for instant support and quick order placement.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#25D366] text-white px-8 py-4 rounded-full font-medium hover:bg-[#128C7E] transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat on WhatsApp
              </a>
              <p className="mt-4 text-sm text-primary-dark/60">
                +91 88068 61955
              </p>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-3xl p-8 shadow-xl"
            >
              <h2 className="font-playfair text-2xl font-bold text-primary-dark mb-6">
                Other Contact Methods
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary-pink/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary-rose" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-dark mb-1">Phone</h3>
                    <p className="text-primary-dark/70">+91 88068 61955</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary-pink/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary-rose" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-dark mb-1">Email</h3>
                    <p className="text-primary-dark/70">hello@vrushalidesertspot.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary-pink/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary-rose" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-dark mb-1">Address</h3>
                    <p className="text-primary-dark/70">
                      123 Baker Street, Sweet Town, ST 413401
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary-pink/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary-rose" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-dark mb-1">Business Hours</h3>
                    <p className="text-primary-dark/70">
                      Mon - Sat: 9:00 AM - 9:00 PM
                      <br />
                      Sunday: 10:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair text-4xl font-bold text-primary-dark mb-4">
              Find Us
            </h2>
            <p className="text-primary-dark/70 text-lg">
              Visit our store or use the map to get directions
            </p>
          </motion.div>
          <div className="bg-primary-cream rounded-3xl p-4 h-96 flex items-center justify-center">
            <p className="text-primary-dark/60 text-center">
              Map integration coming soon...
              <br />
              <span className="text-sm">123 Baker Street, Sweet Town, ST 12345</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
