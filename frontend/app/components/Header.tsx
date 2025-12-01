"use client";

import { Menu, SearchIcon, ShoppingCart, X } from "lucide-react";

import ThemeChanger from "./ThemeChanger";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { iProduct } from "./AllProducts";

const Header = ({
  products,
  setFilteredProducts,
}: {
  products: iProduct[];
  setFilteredProducts: React.Dispatch<React.SetStateAction<iProduct[]>>;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (value: string) => {
    setSearchQuery(value);

    const results = products.filter((product) =>
      product.productName.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredProducts(results);
  };

  return (
    <div className="sticky top-0 z-50 bg-background border-b-2">
      {/* MOBILE HEADER */}
      <div className="flex md:hidden items-center justify-between py-3 px-5">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>

        <h2 className="text-xl font-bold playfair-display-regular">
          Artisan Home
        </h2>
        <div className="flex gap-6 items-center">
          <ThemeChanger />
          <Sheet>
            <SheetTrigger asChild>
              <ShoppingCart className="size-4 cursor-pointer" />
            </SheetTrigger>

            <SheetContent className="w-full">
              <SheetHeader className="font-semibold text-center text-[18px]">
                Shopping Cart (0)
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMenuOpen && (
        <div className="md:hidden px-5 pb-4 border-t">
          <nav className="flex pl-4 flex-col gap-4 py-3">
            <Link href="">New Arrivals</Link>
            <Link href="">Furniture</Link>
            <Link href="">Decor</Link>
            <Link href="">Sale</Link>
          </nav>
          <div className="relative  md:hidden">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-9 w-full"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* DESKTOP HEADER */}
      <div className="hidden md:flex max-w-7xl lg:px-8 mx-auto py-3 px-4 items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-8">
          <h2 className="playfair-display-regular text-2xl font-bold">
            Artisan Home
          </h2>

          <nav className="flex items-center gap-6">
            <Link href="" className="hover:bg-gray-500/20 rounded-md p-2">
              New Arrivals
            </Link>
            <Link href="" className="hover:bg-gray-500/20 rounded-md p-2">
              Furniture
            </Link>
            <Link href="" className="hover:bg-gray-500/20 rounded-md p-2">
              Decor
            </Link>
            <Link href="" className="hover:bg-gray-500/20 rounded-md p-2">
              Sale
            </Link>
          </nav>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-9 w-64"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <ThemeChanger />
          {/* Cart Sheet */}
          <Sheet>
            <SheetTrigger>
              <ShoppingCart className="size-5 cursor-pointer" />
            </SheetTrigger>

            <SheetContent>
              <SheetHeader>Shopping Cart (0)</SheetHeader>
              {/* Add cart items here */}
            </SheetContent>
          </Sheet>

          {/* Theme Toggle */}
        </div>
      </div>
    </div>
  );
};

export default Header;
