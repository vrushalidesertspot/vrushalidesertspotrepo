"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/cakes";
import {
  Upload,
  Tag,
  DollarSign,
  Layers,
  FileText,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";
import { Cake } from "@/types";

const defaultPreview = "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800";

interface AddCakeForm {
  name: string;
  category: string;
  flavor: string;
  weight: string;
  price: string;
  description: string;
  isEggless: string;
  imageFile: File | null;
}

export default function AddCustomCakePage() {
  const [formData, setFormData] = useState<AddCakeForm>({
    name: "",
    category: "",
    flavor: "",
    weight: "",
    price: "",
    description: "",
    isEggless: "false",
    imageFile: null,
  });
  const [imagePreview, setImagePreview] = useState(defaultPreview);
  const [imageBlobUrl, setImageBlobUrl] = useState<string>("");
  const [createdCakes, setCreatedCakes] = useState<Cake[]>([]);
  const [submittedCake, setSubmittedCake] = useState<Cake | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("customCakes");
    if (stored) {
      try {
        setCreatedCakes(JSON.parse(stored));
      } catch {
        window.localStorage.removeItem("customCakes");
      }
    }
  }, []);

  useEffect(() => {
    return () => {
      if (imageBlobUrl) {
        URL.revokeObjectURL(imageBlobUrl);
      }
    };
  }, [imageBlobUrl]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      setFormData((prev) => ({ ...prev, imageFile: null }));
      setImagePreview(defaultPreview);
      return;
    }

    if (imageBlobUrl) {
      URL.revokeObjectURL(imageBlobUrl);
    }

    const url = URL.createObjectURL(file);
    setImageBlobUrl(url);
    setImagePreview(url);
    setFormData((prev) => ({ ...prev, imageFile: file }));
  };

  const saveCustomCakes = (cakesList: Cake[]) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("customCakes", JSON.stringify(cakesList));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, category, flavor, weight, price, description, isEggless, imageFile } = formData;
    if (!name || !category || !flavor || !weight || !price || !description || !imageFile) {
      toast.error("Please complete all fields and upload an image.");
      return;
    }

    const newCake: Cake = {
      id: `custom-${Date.now()}`,
      name,
      category,
      price: Number(price),
      image: imagePreview,
      rating: 5,
      reviews: 0,
      description,
      flavors: [flavor],
      weights: [Number(weight)],
      isEggless: isEggless === "true",
      isBestseller: false,
      isTrending: false,
      isAvailable: true,
    };

    const nextCakes = [newCake, ...createdCakes];
    setCreatedCakes(nextCakes);
    saveCustomCakes(nextCakes);
    setSubmittedCake(newCake);
    toast.success("Your custom cake was created successfully!");

    setFormData({
      name: "",
      category: "",
      flavor: "",
      weight: "",
      price: "",
      description: "",
      isEggless: "false",
      imageFile: null,
    });
    setImagePreview(defaultPreview);
  };

  return (
    <div className="pt-20 min-h-screen bg-primary-cream">
      <section className="bg-gradient-to-r from-primary-rose to-primary-hotPink py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center gap-3 mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-white/90">
            <Upload className="w-5 h-5" />
            New Cake Creator
          </div>
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-4">
            Add Your Own Cake
          </h1>
          <p className="text-white/90 text-lg max-w-3xl mx-auto mb-8">
            Upload an image, select a category, set a price and share the cake details. Your custom cake will be saved locally for review.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/custom-cakes"
              className="inline-flex items-center justify-center rounded-full border border-white/80 px-8 py-4 text-white font-semibold hover:bg-white/10 transition"
            >
              Back to Builder
            </Link>
            <Link
              href="/cakes"
              className="inline-flex items-center justify-center rounded-full bg-white text-primary-rose px-8 py-4 font-semibold hover:bg-primary-cream transition"
            >
              View Cakes
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <form
              onSubmit={handleSubmit}
              className="space-y-8 bg-white rounded-3xl p-8 shadow-xl"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-primary-dark font-medium mb-2">Cake Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-primary-pink/30 bg-primary-cream px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-rose"
                    placeholder="e.g. Raspberry Dream"
                    required
                  />
                </div>

                <div>
                  <label className="block text-primary-dark font-medium mb-2">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-primary-pink/30 bg-primary-cream px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-rose"
                    required
                  >
                    <option value="">Choose category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <label className="block text-primary-dark font-medium mb-2">Flavor *</label>
                  <input
                    type="text"
                    name="flavor"
                    value={formData.flavor}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-primary-pink/30 bg-primary-cream px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-rose"
                    placeholder="e.g. Chocolate Fudge"
                    required
                  />
                </div>
                <div>
                  <label className="block text-primary-dark font-medium mb-2">Weight (kg) *</label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-primary-pink/30 bg-primary-cream px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-rose"
                    placeholder="1.5"
                    required
                  />
                </div>
                <div>
                  <label className="block text-primary-dark font-medium mb-2">Price *</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 h-5 w-5 text-primary-dark/50 -translate-y-1/2" />
                    <input
                      type="number"
                      min="100"
                      step="50"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-primary-pink/30 bg-primary-cream px-12 py-3 focus:outline-none focus:ring-2 focus:ring-primary-rose"
                      placeholder="₹899"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-primary-dark font-medium mb-2">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full rounded-3xl border border-primary-pink/30 bg-primary-cream px-4 py-4 focus:outline-none focus:ring-2 focus:ring-primary-rose"
                  rows={5}
                  placeholder="Write a short description for your custom cake"
                  required
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-primary-dark font-medium mb-2">Eggless?</label>
                  <select
                    name="isEggless"
                    value={formData.isEggless}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-primary-pink/30 bg-primary-cream px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-rose"
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-primary-dark font-medium mb-2">Upload Cake Image *</label>
                  <label className="block cursor-pointer rounded-3xl border border-dashed border-primary-pink/40 bg-primary-cream px-4 py-6 text-center text-primary-dark transition hover:border-primary-rose">
                    <Upload className="mx-auto mb-3 h-6 w-6 text-primary-rose" />
                    <span className="block font-medium">Choose an image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-primary-rose px-8 py-4 text-white font-semibold text-lg hover:bg-primary-hotPink transition"
              >
                Create Cake
              </button>
            </form>

            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="rounded-2xl bg-primary-pink/10 p-3 text-primary-rose">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-primary-rose font-semibold">Preview</p>
                    <h2 className="font-playfair text-2xl font-bold text-primary-dark">Live Cake Preview</h2>
                  </div>
                </div>
                <div className="rounded-[2rem] overflow-hidden border border-primary-pink/20 bg-primary-cream">
                  <div className="relative h-72">
                    <img
                      src={imagePreview}
                      alt={formData.name || "Custom cake preview"}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <p className="font-semibold text-primary-dark text-xl mb-2">
                      {formData.name || "Your cake name will appear here"}
                    </p>
                    <p className="text-sm text-primary-dark/70 mb-4">
                      {formData.description || "Add a description to preview your cake details."}
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-3xl bg-white p-4 shadow-sm">
                        <p className="text-sm text-primary-dark/60">Category</p>
                        <p className="font-medium text-primary-dark">{formData.category || "None"}</p>
                      </div>
                      <div className="rounded-3xl bg-white p-4 shadow-sm">
                        <p className="text-sm text-primary-dark/60">Price</p>
                        <p className="font-medium text-primary-dark">{formData.price ? `₹${formData.price}` : "None"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="rounded-2xl bg-primary-rose/10 p-3 text-primary-rose">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-primary-rose font-semibold">Saved Cakes</p>
                    <h2 className="font-playfair text-2xl font-bold text-primary-dark">Your Creations</h2>
                  </div>
                </div>
                {createdCakes.length === 0 ? (
                  <p className="text-primary-dark/70">No custom cakes created yet. Add one to see it here.</p>
                ) : (
                  <div className="space-y-4">
                    {createdCakes.slice(0, 3).map((cake) => (
                      <div key={cake.id} className="grid gap-4 md:grid-cols-[0.8fr_1.2fr] rounded-3xl bg-primary-cream p-4">
                        <div className="relative h-24 rounded-3xl overflow-hidden">
                          <img src={cake.image} alt={cake.name} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-primary-dark">{cake.name}</p>
                          <p className="text-sm text-primary-dark/70">{cake.category}</p>
                          <p className="mt-2 font-semibold text-primary-rose">₹{cake.price}</p>
                        </div>
                      </div>
                    ))}
                    {createdCakes.length > 3 && (
                      <p className="text-sm text-primary-dark/60">Plus {createdCakes.length - 3} more saved cake(s).</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
