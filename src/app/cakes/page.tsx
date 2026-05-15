"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Grid, List, Heart, Eye } from "lucide-react";
import { cakes } from "@/data/cakes";
import CakeCard from "@/components/cakes/CakeCard";

const categories = ["All", "Birthday Cakes", "Wedding Cakes", "Chocolate Cakes", "Fruit Cakes", "Cupcakes", "Premium Cakes"];

export default function CakesPage() {
  const searchParams = useSearchParams();
  const queryCategory = searchParams?.get("category") ?? "All";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(queryCategory);
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    if (queryCategory) {
      setSelectedCategory(queryCategory);
    }
  }, [queryCategory]);

  const filteredAndSortedCakes = useMemo(() => {
    let filtered = cakes;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter((cake) => cake.category === selectedCategory);
    }

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(
        (cake) =>
          cake.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cake.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
      default:
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

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
              Our Premium Cakes
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Explore our exquisite collection of handcrafted cakes for every celebration
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-dark/50" />
              <input
                type="text"
                placeholder="Search cakes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-primary-pink/30 focus:outline-none focus:ring-2 focus:ring-primary-rose bg-primary-cream"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-primary-rose text-white shadow-lg"
                      : "bg-primary-cream text-primary-dark hover:bg-primary-pink/30"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Sort and View Options */}
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-full border border-primary-pink/30 focus:outline-none focus:ring-2 focus:ring-primary-rose bg-primary-cream"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-full transition-colors ${
                    viewMode === "grid" ? "bg-primary-rose text-white" : "bg-primary-cream text-primary-dark"
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-full transition-colors ${
                    viewMode === "list" ? "bg-primary-rose text-white" : "bg-primary-cream text-primary-dark"
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-primary-dark/70">
            Showing {filteredAndSortedCakes.length} {filteredAndSortedCakes.length === 1 ? "cake" : "cakes"}
          </p>
        </div>
      </section>

      {/* Cakes Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredAndSortedCakes.length > 0 ? (
            <div
              className={`grid gap-8 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {filteredAndSortedCakes.map((cake, index) => (
                <CakeCard key={cake.id} cake={cake} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-2xl text-primary-dark/60 mb-4">No cakes found</p>
              <p className="text-primary-dark/40">Try adjusting your search or filters</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
