import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cakes, categories } from "@/data/cakes";
import CakeCard from "@/components/cakes/CakeCard";
import { Category } from "@/types";

interface CategoryDetailPageProps {
  params: Promise<{ id: string }>;
}

export const dynamicParams = false;

const categoryDescriptions: Record<string, string> = {
  "Birthday Cakes": "Celebrate every birthday with a vibrant cake designed to delight the guest of honor.",
  "Wedding Cakes": "Elegant tiered cakes crafted for unforgettable wedding moments.",
  "Chocolate Cakes": "Decadent chocolate creations for the ultimate indulgence.",
  "Designer Cakes": "Custom designer cakes with artistic themes and premium detailing.",
  "Photo Cakes": "Sweet memories printed directly onto a deliciously moist cake.",
  "Cupcakes": "Perfect shareable treats for parties, events, and special moments.",
  "Pastries": "Light, flaky, and beautifully finished cake-inspired pastries.",
  "Eggless Cakes": "Delicious eggless cakes made with the finest ingredients for everyone to enjoy.",
  "Kids Theme": "Fun and colorful themed cakes to make your kid’s party magical.",
};

export async function generateStaticParams() {
  return categories.map((category) => ({ id: category.id }));
}

export default async function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  const { id } = await params;
  const category: Category | undefined = categories.find((item) => item.id === id);

  if (!category) {
    notFound();
  }

  const categoryCakes = cakes.filter((cake) => cake.category === category.name);
  const description = categoryDescriptions[category.name] ?? "Browse our delicious cakes in this category and find the perfect flavor for your celebration.";

  return (
    <div className="pt-20 min-h-screen bg-primary-cream">
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-pink/70 via-primary-rose/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.35),_transparent_50%)]" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid gap-10 lg:grid-cols-[0.9fr_0.7fr] items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full bg-primary-rose/10 px-4 py-2 text-sm font-semibold text-primary-rose">
              Category
            </div>
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-primary-dark">
              {category.name}
            </h1>
            <p className="text-primary-dark/75 text-lg max-w-2xl">
              {description}
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="inline-flex items-center rounded-full bg-primary-cream px-5 py-3 text-sm font-semibold text-primary-dark shadow-sm">
                {categoryCakes.length} cakes available
              </span>
              <span className="inline-flex items-center rounded-full bg-primary-cream px-5 py-3 text-sm font-semibold text-primary-dark shadow-sm">
                {category.count} category highlights
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/cakes"
                className="inline-flex items-center justify-center rounded-full border border-primary-pink px-8 py-4 text-primary-dark font-semibold text-lg hover:bg-primary-cream transition-colors"
              >
                View All Cakes
              </Link>
              <Link
                href="/custom"
                className="inline-flex items-center justify-center rounded-full bg-primary-rose px-8 py-4 text-white font-semibold text-lg hover:bg-primary-hotPink transition-colors"
              >
                Customize Your Cake
              </Link>
            </div>
          </div>
          <div className="relative h-96 rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-primary-pink/20">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary-rose font-semibold mb-2">
                Category Collection
              </p>
              <h2 className="font-playfair text-4xl font-bold text-primary-dark">
                Popular {category.name}
              </h2>
            </div>
            <p className="text-primary-dark/70 max-w-2xl">
              Explore the best cakes in this category, each handpicked for flavor, design, and celebration-ready presentation.
            </p>
          </div>

          {categoryCakes.length > 0 ? (
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {categoryCakes.map((cake, index) => (
                <CakeCard key={cake.id} cake={cake} index={index} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-white p-16 text-center shadow-lg">
              <h3 className="text-2xl font-semibold text-primary-dark mb-4">
                No cakes found in this category yet
              </h3>
              <p className="text-primary-dark/60">
                Try another category or create a custom cake tailored to your celebration.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
