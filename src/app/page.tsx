"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, Clock, Truck } from "lucide-react";
import { cakes, categories } from "@/data/cakes";
import CakeCard from "@/components/cakes/CakeCard";
import CategoryCard from "@/components/categories/CategoryCard";

export default function Home() {
  const trendingCakes = cakes.filter((cake) => cake.isTrending);
  const bestsellerCakes = cakes.filter((cake) => cake.isBestseller);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-cream via-primary-lightPink/30 to-primary-pink/20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1920')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-playfair text-6xl md:text-8xl font-bold text-primary-dark mb-6">
              Vrushali Desert Spot
            </h1>
            <p className="font-poppins text-xl md:text-2xl text-primary-dark/80 mb-8 max-w-3xl mx-auto">
              Premium Handcrafted Cakes for Every Celebration
            </p>
            <p className="text-lg text-primary-dark/60 mb-12 max-w-2xl mx-auto">
              Indulge in our exquisite collection of artisan cakes, crafted with love and the finest ingredients to make your special moments unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/cakes" className="btn-primary text-lg px-8 py-4">
                Explore Our Cakes
                <ArrowRight className="inline ml-2 w-5 h-5" />
              </Link>
              <Link href="/custom" className="btn-secondary text-lg px-8 py-4">
                Custom Order
              </Link>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          >
            <div className="glass p-6 rounded-2xl">
              <div className="w-12 h-12 bg-primary-pink/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-primary-rose" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-primary-dark mb-2">Premium Quality</h3>
              <p className="text-primary-dark/70">Fresh ingredients and expert craftsmanship</p>
            </div>
            <div className="glass p-6 rounded-2xl">
              <div className="w-12 h-12 bg-primary-pink/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary-rose" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-primary-dark mb-2">Same Day Delivery</h3>
              <p className="text-primary-dark/70">Order before 2 PM for same-day delivery</p>
            </div>
            <div className="glass p-6 rounded-2xl">
              <div className="w-12 h-12 bg-primary-pink/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-primary-rose" />
              </div>
              <h3 className="font-playfair text-xl font-bold text-primary-dark mb-2">Free Delivery</h3>
              <p className="text-primary-dark/70">On orders above ₹999</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary-dark mb-4">
              Explore Our Categories
            </h2>
            <p className="text-primary-dark/70 text-lg max-w-2xl mx-auto">
              Find the perfect cake for every occasion from our diverse collection
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Cakes Section */}
      <section className="py-20 bg-primary-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary-dark mb-4">
              Trending Now
            </h2>
            <p className="text-primary-dark/70 text-lg max-w-2xl mx-auto">
              Our most popular cakes loved by customers
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingCakes.map((cake, index) => (
              <CakeCard key={cake.id} cake={cake} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary-dark mb-4">
              Bestsellers
            </h2>
            <p className="text-primary-dark/70 text-lg max-w-2xl mx-auto">
              Our top-rated cakes that never disappoint
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestsellerCakes.map((cake, index) => (
              <CakeCard key={cake.id} cake={cake} index={index} />
            ))}
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
              Ready to Order Your Dream Cake?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Browse our collection or create a custom cake tailored to your preferences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/cakes" className="bg-white text-primary-rose px-8 py-4 rounded-full font-medium hover:bg-primary-cream transition-all duration-300 transform hover:scale-105 shadow-lg text-lg">
                View All Cakes
              </Link>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-primary-rose transition-all duration-300 transform hover:scale-105 text-lg">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
