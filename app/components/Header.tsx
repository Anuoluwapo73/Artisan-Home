"use client";

import { Menu, SearchIcon, ShoppingCart, X, User, LogOut } from "lucide-react";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { setSearchQuery } from "../store/productsSlice";
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
import { CartItems } from "./CartItems";
import { signOut } from "next-auth/react";
import CheckoutModal from "./CheckoutModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const searchQuery = useSelector(
    (state: RootState) => state.products.searchQuery
  );

  const handleSearch = (value: string) => {
    dispatch(setSearchQuery(value));
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/auth/login" });
  };

  const { items, totalAmount } = useSelector((state: any) => state.cart);

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

        <Link href="/">
          <h2 className="text-xl font-bold playfair-display-regular cursor-pointer hover:text-orange-700 transition-colors">
            Artisan Home
          </h2>
        </Link>
        <div className="flex gap-4 items-center">
          <ThemeChanger />
          
          {/* User Menu - Mobile */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <User className="size-5" />
            </Button>
            
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-background border rounded-lg shadow-lg py-2 z-50">
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-2 text-left hover:bg-orange-50 dark:hover:bg-gray-800 flex items-center gap-2 hover:text-orange-700 transition-colors"
                >
                  <LogOut className="size-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>

          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger className="relative">
              <ShoppingCart className="size-5 cursor-pointer" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-700 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {items.length}
                </span>
              )}
            </SheetTrigger>

            <SheetContent className="flex flex-col">
              <SheetHeader>Shopping Cart ({items.length})</SheetHeader>
              {items.length === 0 ? (
                <p className="text-center my-auto">Your cart is empty</p>
              ) : (
                <>
                  <div className="flex-1 overflow-auto">
                    <CartItems />
                  </div>
                  <div className="border-t pt-4 mt-4 bg-background">
                    <div className="flex justify-between px-3 py-2">
                      <p className="text-muted-foreground">Subtotal</p>
                      <p className="font-semibold">${totalAmount}.00</p>
                    </div>
                    <div className="flex justify-between px-3 py-2">
                      <p className="text-muted-foreground">Shipping</p>
                      <p className="font-semibold text-amber-700">Free</p>
                    </div>
                    <hr className="my-3" />
                    <div className="flex justify-between px-3 py-2">
                      <p className="font-bold text-lg">Total</p>
                      <p className="font-bold text-lg">${totalAmount}.00</p>
                    </div>
                    <div className="px-3 py-4">
                      <button 
                        onClick={() => { setIsCartOpen(false); setIsCheckoutModalOpen(true); }}
                        className="w-full bg-amber-700 text-white py-3 rounded-lg font-semibold hover:bg-amber-800 transition-colors duration-200"
                      >
                        Proceed to Checkout (${totalAmount}.00)
                      </button>
                    </div>
                  </div>
                </>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMenuOpen && (
        <div className="md:hidden px-5 pb-4 border-t">
          <nav className="flex pl-4 flex-col gap-4 py-3">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-orange-700 transition-colors">Home</Link>
            <Link href="/furniture" onClick={() => setIsMenuOpen(false)} className="hover:text-orange-700 transition-colors">Furniture</Link>
            <Link href="/decor" onClick={() => setIsMenuOpen(false)} className="hover:text-orange-700 transition-colors">Decor</Link>
            <Link href="/bedroom" onClick={() => setIsMenuOpen(false)} className="hover:text-orange-700 transition-colors">Bedroom</Link>
            <Link href="/living-room" onClick={() => setIsMenuOpen(false)} className="hover:text-orange-700 transition-colors">Living Room</Link>
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
          <Link href="/">
            <h2 className="playfair-display-regular text-2xl font-bold cursor-pointer hover:text-orange-700 transition-colors">
              Artisan Home
            </h2>
          </Link>

          <nav className="flex items-center gap-6">
            <Link href="/" className="hover:bg-orange-50 dark:hover:bg-gray-800 hover:text-orange-700 rounded-md p-2 transition-colors">
              Home
            </Link>
            <Link href="/furniture" className="hover:bg-orange-50 dark:hover:bg-gray-800 hover:text-orange-700 rounded-md p-2 transition-colors">
              Furniture
            </Link>
            <Link href="/decor" className="hover:bg-orange-50 dark:hover:bg-gray-800 hover:text-orange-700 rounded-md p-2 transition-colors">
              Decor
            </Link>
            <Link href="/bedroom" className="hover:bg-orange-50 dark:hover:bg-gray-800 hover:text-orange-700 rounded-md p-2 transition-colors">
              Bedroom
            </Link>
            <Link href="/living-room" className="hover:bg-orange-50 dark:hover:bg-gray-800 hover:text-orange-700 rounded-md p-2 transition-colors">
              Living Room
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
          
          {/* User Menu - Desktop */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <User className="size-5" />
            </Button>
            
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-background border rounded-lg shadow-lg py-2 z-50">
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-2 text-left hover:bg-orange-50 dark:hover:bg-gray-800 flex items-center gap-2 hover:text-orange-700 transition-colors"
                >
                  <LogOut className="size-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Cart Sheet */}
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger className="relative">
              <ShoppingCart className="size-5 cursor-pointer" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-700 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {items.length}
                </span>
              )}
            </SheetTrigger>

            <SheetContent className="max-w-[550px] flex flex-col">
              <SheetHeader>Shopping Cart ({items.length})</SheetHeader>
              {items.length === 0 ? (
                <p className="text-center my-auto">Your cart is empty</p>
              ) : (
                <>
                  <div className="flex-1 overflow-auto">
                    <CartItems />
                  </div>
                  <div className="border-t pt-4 mt-4 bg-background">
                    <div className="flex justify-between px-3 py-2">
                      <p className="text-muted-foreground">Subtotal</p>
                      <p className="font-semibold">${totalAmount}.00</p>
                    </div>
                    <div className="flex justify-between px-3 py-2">
                      <p className="text-muted-foreground">Shipping</p>
                      <p className="font-semibold text-amber-700">Free</p>
                    </div>
                    <hr className="my-3" />
                    <div className="flex justify-between px-3 py-2">
                      <p className="font-bold text-lg">Total</p>
                      <p className="font-bold text-lg">${totalAmount}.00</p>
                    </div>
                    <div className="px-3 py-4">
                      <button 
                        onClick={() => { setIsCartOpen(false); setIsCheckoutModalOpen(true); }}
                        className="w-full bg-amber-700 text-white py-3 rounded-lg font-semibold hover:bg-amber-800 transition-colors duration-200"
                      >
                        Proceed to Checkout (${totalAmount}.00)
                      </button>
                    </div>
                  </div>
                </>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        cartItems={items}
        totalAmount={totalAmount}
      />
    </div>
  );
};

export default Header;

