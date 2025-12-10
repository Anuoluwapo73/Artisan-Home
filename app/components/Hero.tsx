import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <div
      className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[85vh] bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dloa5kpxd/image/upload/v1764169842/hero_lifestyle_inter_360bc5c2_oooobz.jpg')",
      }}
    > 
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-transparent sm:from-black/50"></div>

      {/* Text container with animation */}
      <div className="absolute left-4 sm:left-6 md:left-12 lg:left-20 top-1/2 -translate-y-1/2 max-w-[90%] sm:max-w-[700px] animate-fade-in">
        <div className="mb-3 sm:mb-4 inline-block">
          <span className="text-orange-500 text-xs sm:text-sm md:text-base font-semibold tracking-wider uppercase border-l-2 sm:border-l-4 border-orange-500 pl-2">
            New Collection 2025
          </span>
        </div>
        
        <h1 className="playfair-display-regular text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
          Elevate Your Living <span className="block sm:inline lg:block text-orange-500">Space</span>
        </h1>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 lg:mb-10 max-w-[95%] sm:max-w-[600px] leading-relaxed">
          Discover timeless furniture and decor crafted for modern living. 
          <span className="hidden sm:block mt-1 sm:mt-2">Premium quality, sustainable materials, exceptional design.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
          <Button className="bg-orange-700 hover:bg-orange-800 text-white px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base md:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <Link href="/furniture" className="flex items-center gap-2">
              Shop New Collection
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </Button>

          <Button className="backdrop-blur-md bg-white/10 border-2 border-white/40 text-white hover:bg-white/20 px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base md:text-lg font-semibold transition-all duration-300 hover:scale-105">
            <Link href="/furniture" className="flex items-center gap-2">
              Browse Catalogue
            </Link>
          </Button>
        </div>
      </div>

   
    </div>
  );
};

export default Hero;
