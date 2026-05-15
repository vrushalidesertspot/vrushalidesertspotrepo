"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Heart, Share2, Star, Users, Video, Eye, Globe, Instagram } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-20 min-h-screen bg-primary-cream">
      <section className="bg-gradient-to-r from-primary-rose to-primary-hotPink py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-sm uppercase tracking-[0.4em] text-white/75 mb-4">
              About Us
            </p>
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-6">
              Vrushali’s Dessert Spot
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-white/90 leading-8">
              Learn innovative cake designs ❤️. This channel is for cake lovers. If you like our videos then don’t forget to like, share, & subscribe.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-[1fr_0.9fr] items-start">
          <div className="space-y-8">
            <div className="rounded-[2rem] bg-white p-10 shadow-2xl ring-1 ring-primary-pink/10">
              <div className="flex flex-col gap-6">
                <div className="inline-flex items-center gap-3 rounded-full bg-primary-rose/10 px-4 py-2 text-primary-rose text-sm font-semibold">
                  <Heart className="w-5 h-5" />
                  Cake Community
                </div>
                <div className="space-y-4">
                  <p className="text-primary-dark text-lg leading-8">
                    Vrushali’s Dessert Spot is built for cake lovers and anyone who wants to learn creative cake decoration and design. Our channel shares fresh ideas, step-by-step tutorials, and flavorful inspiration for every celebration.
                  </p>
                  <p className="text-primary-dark text-lg leading-8">
                    We believe every cake should tell a story. That’s why we bring artistic designs, professional tips, and real cake experiences for birthdays, weddings, festive occasions, and custom orders.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-white p-8 shadow-lg border border-primary-pink/10">
                <div className="flex items-center gap-3 mb-4 text-primary-rose">
                  <Video className="w-6 h-6" />
                  <h2 className="font-semibold text-xl">Video Channel</h2>
                </div>
                <p className="text-primary-dark text-sm mb-4">
                  Subscribe and get weekly cake tutorials, recipes, and design ideas.
                </p>
                <Link
                  href="https://www.youtube.com/@VrushalisDessertSpot"
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full bg-primary-pink px-5 py-3 text-white font-semibold hover:bg-primary-hotPink transition"
                >
                  Visit Channel
                </Link>
              </div>

              <div className="rounded-3xl bg-white p-8 shadow-lg border border-primary-pink/10">
                <div className="flex items-center gap-3 mb-4 text-primary-rose">
                  <Globe className="w-6 h-6" />
                  <h2 className="font-semibold text-xl">More Info</h2>
                </div>
                <ul className="space-y-3 text-primary-dark text-sm">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary-rose" />
                    Phone verified
                  </li>
                  <li className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary-rose" />
                    India
                  </li>
                  <li className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-primary-rose" />
                    Joined Nov 29, 2016
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] bg-primary-cream p-10 shadow-2xl border border-primary-pink/20">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-primary-rose font-semibold">Channel Stats</p>
                  <h2 className="font-playfair text-3xl font-bold text-primary-dark">Growth in Numbers</h2>
                </div>
                <Heart className="w-8 h-8 text-primary-rose" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-primary-dark/50">Subscribers</p>
                  <p className="mt-3 text-3xl font-bold text-primary-dark">1.35K</p>
                </div>
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-primary-dark/50">Videos</p>
                  <p className="mt-3 text-3xl font-bold text-primary-dark">438</p>
                </div>
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-primary-dark/50">Views</p>
                  <p className="mt-3 text-3xl font-bold text-primary-dark">1,687,128</p>
                </div>
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-primary-dark/50">Location</p>
                  <p className="mt-3 text-3xl font-bold text-primary-dark">India</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-10 shadow-2xl border border-primary-pink/10">
              <div className="flex items-start gap-4 mb-6">
                <div className="rounded-3xl bg-primary-rose/10 p-3 text-primary-rose">
                  <Share2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-playfair text-2xl font-bold text-primary-dark">Join the Cake Community</h3>
                  <p className="text-primary-dark/70 mt-2">
                    If you like our videos then don’t forget to like, share, & subscribe.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-primary-cream p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-primary-rose font-semibold mb-3">Follow Us</p>
                  <div className="space-y-3">
                    <Link
                      href="https://www.youtube.com/@VrushalisDessertSpot"
                      target="_blank"
                      className="inline-flex items-center gap-2 text-primary-dark font-semibold hover:text-primary-rose transition"
                    >
                      <Video className="w-4 h-4 text-primary-rose" />
                      www.youtube.com/@VrushalisDessertSpot
                    </Link>
                    <Link
                      href="https://www.instagram.com/vrushali__ingawale"
                      target="_blank"
                      className="inline-flex items-center gap-2 text-primary-dark font-semibold hover:text-primary-rose transition"
                    >
                      <Instagram className="w-4 h-4 text-primary-rose" />
                      @vrushali__ingawale
                    </Link>
                  </div>
                </div>
                <div className="rounded-3xl bg-primary-cream p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-primary-rose font-semibold mb-3">Membership</p>
                  <p className="text-primary-dark font-semibold">Phone verified</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
