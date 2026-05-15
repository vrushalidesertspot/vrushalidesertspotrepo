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
    addItem(cake, cake.flavors[0], cake.weights[0]);
    toast.success(`${cake.name} added to cart!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card-hover"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
        <Link
          href={`/cakes/${cake.id}`}
          className="relative h-64 group cursor-pointer block"
        >
          <Image
            src={cake.image}
            alt={cake.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-primary-pink transition-colors">
            <Heart className="w-5 h-5 text-primary-dark" />
          </button>
          {cake.isBestseller && (
            <div className="absolute top-4 left-4 bg-primary-gold text-white px-3 py-1 rounded-full text-xs font-bold">
              Bestseller
            </div>
          )}
          {cake.isTrending && (
            <div className="absolute top-4 left-4 bg-primary-rose text-white px-3 py-1 rounded-full text-xs font-bold">
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
              <span className="ml-1 text-sm font-medium text-primary-dark">{cake.rating}</span>
            </div>
            <span className="mx-2 text-primary-dark/40">•</span>
            <span className="text-sm text-primary-dark/60">{cake.reviews} reviews</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-playfair text-2xl font-bold text-primary-rose">
              ₹{cake.price}
            </p>
            <button
              onClick={handleAddToCart}
              className="p-3 bg-primary-pink rounded-full hover:bg-primary-rose transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
