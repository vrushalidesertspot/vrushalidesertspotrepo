"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { Cake } from "@/types";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

interface CakeCardProps {
  cake: Cake;
  index: number;
}

export default function CakeCard({ cake, index }: CakeCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (!cake.isAvailable) {
      toast.error("Sorry, this cake is currently out of stock");
      return;
    }
    // Provide defaults for flavors and weights if missing from DB model
    const flavors = (cake as any).flavors || ["Classic"];
    const weights = (cake as any).weights || [0.5, 1, 2];
    addItem(cake as any, flavors[0], weights[0]);
    toast.success(`${cake.name} added to cart!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`card-hover ${!cake.isAvailable ? "opacity-75 grayscale-[0.5]" : ""}`}
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg relative">
        <Link
          href={`/cakes/${cake.id}`}
          className="relative h-64 group cursor-pointer block"
        >
          {cake.image ? (
            <Image
              src={cake.image}
              alt={cake.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">No Image</div>
          )}
          
          {!cake.isAvailable && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
              <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-lg rotate-[-12deg] shadow-xl">
                OUT OF STOCK
              </span>
            </div>
          )}

          <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-primary-pink transition-colors z-20">
            <Heart className="w-5 h-5 text-primary-dark" />
          </button>
          {(cake as any).isBestseller && (
            <div className="absolute top-4 left-4 bg-primary-gold text-white px-3 py-1 rounded-full text-xs font-bold z-20">
              Bestseller
            </div>
          )}
          {(cake as any).isTrending && (
            <div className="absolute top-4 left-4 bg-primary-rose text-white px-3 py-1 rounded-full text-xs font-bold z-20">
              Trending
            </div>
          )}
        </Link>
        <div className="p-5">
          <Link href={`/cakes/${cake.id}`}>
            <h3 className="font-playfair text-xl font-bold text-primary-dark mb-2 hover:text-primary-rose transition-colors cursor-pointer">
              {cake.name}
            </h3>
          </Link>
          <p className="text-sm text-primary-dark/60 mb-3 line-clamp-2">
            {cake.description}
          </p>
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-primary-gold text-primary-gold" />
              <span className="ml-1 text-sm font-medium text-primary-dark">{(cake as any).rating || "4.5"}</span>
            </div>
            <span className="mx-2 text-primary-dark/40">•</span>
            <span className="text-sm text-primary-dark/60">{(cake as any).reviews || "10"} reviews</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-playfair text-2xl font-bold text-primary-rose">
              ₹{cake.price}
            </p>
            <button
              onClick={handleAddToCart}
              disabled={!cake.isAvailable}
              className={`p-3 rounded-full transition-colors ${
                cake.isAvailable 
                ? "bg-primary-pink hover:bg-primary-rose" 
                : "bg-gray-200 cursor-not-allowed"
              }`}
            >
              <ShoppingCart className={`w-5 h-5 ${cake.isAvailable ? "text-white" : "text-gray-400"}`} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
