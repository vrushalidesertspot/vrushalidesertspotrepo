"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { categories } from "@/data/cakes";
import { cakes } from "@/data/cakes";
import CategoryCard from "@/components/categories/CategoryCard";

export default function CategoriesPage() {
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
              Cake Categories
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Browse our wide range of cake categories and find the perfect one for your celebration
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary-dark mb-4">
              Popular Categories
            </h2>
            <p className="text-primary-dark/70 text-lg max-w-2xl mx-auto">
              Our most loved cake categories
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Birthday Cakes */}
            <Link href="/cakes?category=Birthday+Cakes">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative h-80 rounded-3xl overflow-hidden cursor-pointer card-hover"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-pink to-primary-rose" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800')] bg-cover bg-center opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-playfair text-3xl font-bold text-white mb-2">
                    Birthday Cakes
                  </h3>
                  <p className="text-white/80 mb-4">
                    {cakes.filter((c) => c.category === "Birthday Cakes").length} options
                  </p>
                  <span className="inline-block bg-white text-primary-rose px-6 py-2 rounded-full font-medium">
                    Explore
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* Wedding Cakes */}
            <Link href="/cakes?category=Wedding+Cakes">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative h-80 rounded-3xl overflow-hidden cursor-pointer card-hover"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-gold to-primary-rose" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800')] bg-cover bg-center opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-playfair text-3xl font-bold text-white mb-2">
                    Wedding Cakes
                  </h3>
                  <p className="text-white/80 mb-4">
                    {cakes.filter((c) => c.category === "Wedding Cakes").length} options
                  </p>
                  <span className="inline-block bg-white text-primary-rose px-6 py-2 rounded-full font-medium">
                    Explore
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* Chocolate Cakes */}
            <Link href="/cakes?category=Chocolate+Cakes">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative h-80 rounded-3xl overflow-hidden cursor-pointer card-hover"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-dark to-primary-rose" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800')] bg-cover bg-center opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-playfair text-3xl font-bold text-white mb-2">
                    Chocolate Cakes
                  </h3>
                  <p className="text-white/80 mb-4">
                    {cakes.filter((c) => c.category === "Chocolate Cakes").length} options
                  </p>
                  <span className="inline-block bg-white text-primary-rose px-6 py-2 rounded-full font-medium">
                    Explore
                  </span>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-rose to-primary-hotPink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Create your own custom cake with our premium custom cake builder
            </p>
            <Link
              href="/custom-cakes"
              className="inline-block bg-white text-primary-rose px-8 py-4 rounded-full font-medium hover:bg-primary-cream transition-all duration-300 transform hover:scale-105 shadow-lg text-lg"
            >
              Build Custom Cake
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
