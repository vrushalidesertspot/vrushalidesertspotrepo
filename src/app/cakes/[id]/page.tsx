import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cakes } from "@/data/cakes";
import { Cake } from "@/types";

interface CakeDetailPageProps {
  params: { id: string };
}

export default async function CakeDetailPage({ params }: CakeDetailPageProps) {
  const { id } = await params;
  const cake: Cake | undefined = cakes.find((item) => item.id === id);

  if (!cake) {
    notFound();
  }

  return (
    <div className="pt-20 min-h-screen bg-primary-cream">
      <section className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <div className="rounded-3xl overflow-hidden shadow-2xl bg-primary-cream">
            <div className="relative h-96 md:h-[28rem]">
              <Image
                src={cake.image}
                alt={cake.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <div className="text-sm uppercase tracking-[0.25em] text-primary-rose font-semibold">
                {cake.category}
              </div>
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-primary-dark">
                {cake.name}
              </h1>
              <p className="text-primary-dark/70 text-lg leading-8">
                {cake.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl bg-white p-6 shadow-lg">
                <h2 className="text-sm text-primary-dark/60 uppercase tracking-[0.2em] mb-3">Price</h2>
                <p className="font-playfair text-3xl font-bold text-primary-rose">₹{cake.price}</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-lg">
                <h2 className="text-sm text-primary-dark/60 uppercase tracking-[0.2em] mb-3">Rating</h2>
                <p className="text-primary-dark text-xl font-semibold">{cake.rating} / 5</p>
                <p className="text-primary-dark/50 text-sm">{cake.reviews} reviews</p>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-primary-dark mb-4">Cake Details</h2>
              <div className="grid grid-cols-1 gap-3 text-primary-dark/70">
                <div>
                  <span className="font-semibold text-primary-dark">Flavors:</span> {cake.flavors.join(", ")}
                </div>
                <div>
                  <span className="font-semibold text-primary-dark">Weights:</span> {cake.weights.map((w) => `${w} kg`).join(", ")}
                </div>
                <div>
                  <span className="font-semibold text-primary-dark">Eggless:</span> {cake.isEggless ? "Yes" : "No"}
                </div>
                <div>
                  <span className="font-semibold text-primary-dark">Bestseller:</span> {cake.isBestseller ? "Yes" : "No"}
                </div>
                <div>
                  <span className="font-semibold text-primary-dark">Trending:</span> {cake.isTrending ? "Yes" : "No"}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href={`/custom?image=${encodeURIComponent(cake.image)}&name=${encodeURIComponent(cake.name)}`}
                className="inline-flex items-center justify-center rounded-full bg-primary-rose px-8 py-4 text-white font-semibold text-lg hover:bg-primary-hotPink transition-colors"
              >
                Customize & Order
              </Link>
              <Link
                href="/cakes"
                className="inline-flex items-center justify-center rounded-full border border-primary-pink px-8 py-4 text-primary-dark font-semibold text-lg hover:bg-primary-cream transition-colors"
              >
                Back to Cakes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
