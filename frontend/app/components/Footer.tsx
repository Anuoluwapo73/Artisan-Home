import { Facebook, Instagram, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div>
      <hr className="border-1" />
      <div className="my-10 px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl playfair-display-regular">Artisan Home</h2>
          <p className="text-muted-foreground">
            Premium furniture and decor for modern living spaces. Quality
            craftsmanship, timeless design.
          </p>
          <div className="flex gap-5 ml-3">
            <Facebook className="size-4" />
            <Instagram className="size-4" />
            <Twitter className="size-4" />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="text-[20px] font-semibold">Shop</h3>
          <p className="text-[17px]">New Arrivals</p>
          <p className="text-[17px]">Furniture</p>
          <p className="text-[17px]">Decor</p>
          <p className="text-[17px]">Sale</p>
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="text-[20px] font-semibold">Support</h3>
          <p className="text-[17px]">Contact Us</p>
          <p className="text-[17px]">Shipping Info</p>
          <p className="text-[17px]">Returns</p>
          <p className="text-[17px]">FAQ</p>
        </div>

        <div className="flex flex-col gap-5">
          <h3 className="text-[20px] font-semibold">Newsletter</h3>
          <p className="text-muted-foreground">
            Subscribe for exclusive offers and updates
          </p>
          <span className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="border-3 w-[65%] h-[40px] p-2 rounded-md"
            />
            <button className="text-white bg-amber-700 w-[35%] h-[40px] p-2 rounded-md">
              Subscribe
            </button>
          </span>
        </div>
      </div>
      <hr className="border-1" />

      <div className="flex py-10 text-muted-foreground flex-col text-[15px] text-center gap-4 md:justify-between md:flex-row">
        <footer>&copy; 2025 Artisan Home. All rights reserved</footer>
        <p>Privacy Policy &nbsp; &nbsp; Terms of Service</p>
      </div>
    </div>
  );
};

export default Footer;
