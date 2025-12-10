import { Facebook, Instagram, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="px-2 sm:px-4">
      <hr className="border-1" />
      <div className="my-8 sm:my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        <div className="flex flex-col gap-4 sm:gap-5 sm:col-span-2 lg:col-span-1">
          <h2 className="text-xl sm:text-2xl playfair-display-regular">Artisan Home</h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Premium furniture and decor for modern living spaces. Quality
            craftsmanship, timeless design.
          </p>
          <div className="flex gap-4 sm:gap-5">
            <Facebook className="size-5 sm:size-6 cursor-pointer hover:text-orange-700 transition-colors" />
            <Instagram className="size-5 sm:size-6 cursor-pointer hover:text-orange-700 transition-colors" />
            <Twitter className="size-5 sm:size-6 cursor-pointer hover:text-orange-700 transition-colors" />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4">
          <h3 className="text-lg sm:text-xl font-semibold">Shop</h3>
          <div className="flex flex-col gap-2 sm:gap-3">
            <p className="text-sm sm:text-base text-muted-foreground hover:text-orange-700 cursor-pointer transition-colors">New Arrivals</p>
            <p className="text-sm sm:text-base text-muted-foreground hover:text-orange-700 cursor-pointer transition-colors">Furniture</p>
            <p className="text-sm sm:text-base text-muted-foreground hover:text-orange-700 cursor-pointer transition-colors">Decor</p>
            <p className="text-sm sm:text-base text-muted-foreground hover:text-orange-700 cursor-pointer transition-colors">Sale</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4">
          <h3 className="text-lg sm:text-xl font-semibold">Support</h3>
          <div className="flex flex-col gap-2 sm:gap-3">
            <p className="text-sm sm:text-base text-muted-foreground hover:text-orange-700 cursor-pointer transition-colors">Contact Us</p>
            <p className="text-sm sm:text-base text-muted-foreground hover:text-orange-700 cursor-pointer transition-colors">Shipping Info</p>
            <p className="text-sm sm:text-base text-muted-foreground hover:text-orange-700 cursor-pointer transition-colors">Returns</p>
            <p className="text-sm sm:text-base text-muted-foreground hover:text-orange-700 cursor-pointer transition-colors">FAQ</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4 sm:col-span-2 lg:col-span-1">
          <h3 className="text-lg sm:text-xl font-semibold">Newsletter</h3>
          <p className="text-muted-foreground text-sm sm:text-base">
            Subscribe for exclusive offers and updates
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 border border-gray-300 dark:border-gray-600 h-10 sm:h-11 px-3 rounded-md text-sm sm:text-base bg-background"
            />
            <button className="text-white bg-amber-700 hover:bg-amber-800 px-4 sm:px-6 h-10 sm:h-11 rounded-md text-sm sm:text-base font-medium transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <hr className="border-1" />

      <div className="flex py-6 sm:py-8 lg:py-10 text-muted-foreground flex-col text-sm sm:text-base text-center gap-3 sm:gap-4 lg:justify-between lg:flex-row">
        <footer>&copy; 2025 Artisan Home. All rights reserved</footer>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 justify-center lg:justify-end">
          <p className="hover:text-orange-700 cursor-pointer transition-colors">Privacy Policy</p>
          <p className="hover:text-orange-700 cursor-pointer transition-colors">Terms of Service</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
