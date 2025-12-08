import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <div
      className="relative w-full h-[70vh] lg:h-[85vh] bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dloa5kpxd/image/upload/v1764169842/hero_lifestyle_inter_360bc5c2_oooobz.jpg')",
      }}
    > 
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

      {/* Text container with animation */}
      <div className="absolute left-6 md:left-12 lg:left-20 top-1/2 -translate-y-1/2 max-w-[700px] animate-fade-in">
        <div className="mb-4 inline-block">
          <span className="text-orange-500 text-sm md:text-base font-semibold tracking-wider uppercase border-l-4 border-orange-500 pl-3">
            New Collection 2025
          </span>
        </div>
        
        <h1 className="playfair-display-regular text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Elevate Your Living <span className="lg:block text-orange-500">Space</span>
        </h1>

        <p className="text-base md:text-lg lg:text-xl text-white/90 mb-10 max-w-[600px] leading-relaxed">
          Discover timeless furniture and decor crafted for modern living. 
          <span className="block mt-2">Premium quality, sustainable materials, exceptional design.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
          <Button className="bg-orange-700 hover:bg-orange-800 text-white px-8 py-6 text-base md:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <Link href="/furniture">
              Shop New Collection
            </Link>
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          <Button className="backdrop-blur-md bg-white/10 border-2 border-white/40 text-white hover:bg-white/20 px-8 py-6 text-base md:text-lg font-semibold transition-all duration-300 hover:scale-105">
            <Link href="/furniture">
              Browse Catalogue
            </Link>
          </Button>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};

export default Hero;
