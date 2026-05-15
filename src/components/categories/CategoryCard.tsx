"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
  index: number;
}

export default function CategoryCard({ category, index }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/categories/${category.id}`}>
        <div className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer card-hover">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="font-playfair text-lg font-bold text-white mb-1">
              {category.name}
            </h3>
            <p className="text-sm text-white/80">{category.count} cakes</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
