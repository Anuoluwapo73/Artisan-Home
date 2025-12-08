"use client"
import Header from "../components/Header";
import AllProducts from "../components/AllProducts";
import Footer from "../components/Footer";
import { validateSession } from "../utils/validateSession";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function FurniturePage() {
  validateSession();
  return (
    <div className="w-full">
      <Header />

      {/* Page Header */}
      <div className="relative w-full h-[40vh] bg-cover bg-center"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dloa5kpxd/image/upload/v1764169842/hero_lifestyle_inter_360bc5c2_oooobz.jpg')"
        }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-white hover:text-white/80 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="playfair-display-regular text-5xl md:text-6xl font-bold text-white mb-4">
            All Furniture
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl">
            Browse our complete collection of premium furniture pieces
          </p>
        </div>
      </div>

      <div className="mx-7 mt-5">
        <AllProducts />
        <Footer />
      </div>
    </div>
  );
}
