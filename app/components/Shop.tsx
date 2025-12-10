import { ArrowRight } from "lucide-react";
import React from "react";
import Link from "next/link";

interface iAppProps {
  url: string;
  name: string;
  amount: string;
  href: string;
}
const items = [
  {
    url: "https://res.cloudinary.com/dloa5kpxd/image/upload/v1763732880/image_1_ln6ki2.jpg",
    name: "Living Room",
    amount: "48 Products",
    href: "/living-room",
  },
  {
    url: "https://res.cloudinary.com/dloa5kpxd/image/upload/v1763732878/image_2_balhe9.jpg",
    name: "BedRoom",
    amount: "36 Products",
    href: "/bedroom",
  },
  {
    url: "https://res.cloudinary.com/dloa5kpxd/image/upload/v1763732872/image_3_g7f1aa.jpg",
    name: "Decor",
    amount: "72 Products",
    href: "/decor",
  },
];
const Shop = () => {
  return (
    <div className="px-2 sm:px-4">
      <header className="pt-6 sm:pt-9 text-center">
        <h3 className="playfair-display-regular text-2xl sm:text-3xl lg:text-4xl font-bold">
          Shop by Category
        </h3>
        <p className="text-muted-foreground text-base sm:text-lg lg:text-xl pt-2 sm:pt-3">
          Explore our curated collections
        </p>
      </header>
      <div className="relative mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-5">
        {items.map((item) => (
          <div
            key={item.name}
            className="
           relative min-h-[20rem] md:min-h-[30rem] lg:min-h-[32rem] xl:min-h-[34rem] 
           bg-cover bg-center rounded-xl shadow-lg hover:shadow-2xl
           transition-all duration-300 hover:scale-[1.02] cursor-pointer group block overflow-hidden"
            style={{
              backgroundImage: `url(${item.url})`,
            }}
          >
            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-300"></div>
            
            {/* Content positioning */}
            <div className="absolute left-4 sm:left-6 bottom-6 sm:bottom-8 flex flex-col gap-2 sm:gap-3 max-w-[85%]">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl playfair-display-regular text-white font-bold leading-tight">
                {item.name}
              </h3>
              <p className="text-white/90 text-sm sm:text-base lg:text-lg">{item.amount}</p>
              <div className="flex text-white text-sm sm:text-base lg:text-lg font-bold gap-2 sm:gap-3 items-center group-hover:gap-3 sm:group-hover:gap-4 transition-all mt-2">
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            
            {/* Subtle border on hover */}
            <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-orange-500/30 transition-colors duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
