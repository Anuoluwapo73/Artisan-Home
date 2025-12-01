import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <div
      className="relative w-full h-[70vh] lg:h-[85vh] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dloa5kpxd/image/upload/v1764169842/hero_lifestyle_inter_360bc5c2_oooobz.jpg')",
      }}
    > 
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Text container */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 max-w-[700px]">
        <h2 className=" playfair-display-regular text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Elevate Your Living <span className="lg:block">Space</span>
        </h2>

        <p className="text-lg md:text-xl text-white/90 mb-8">
          Discover timeless furniture and decor crafted for modern living. <span className="lg:block">Premium quality, sustainable materials, exceptional design.</span>
        </p>

        <div className="flex sm:gap-4 md:flex-row mt-7 gap-4 md:gap-6">
          <Button className="bg-orange-700 hover:bg-orange-800 ">
            <Link href="#" className="text-[17px]">
              Shop New Collection
            </Link>
            <ArrowRight className="w-5 h-5" />
          </Button>

          <Button className="backdrop-blur-sm bg-background/20 border-white/40 text-white hover:bg-background/30">
            <Link href="#" className="text-[17px]">
              Browse Catalogue
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
