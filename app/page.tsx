"use client"
import Header from "./components/Header";
import Hero from "./components/Hero";
import Shop from "./components/Shop";
import Footer from "./components/Footer";
import { validateSession } from "./utils/validateSession";
import { Button } from "@/components/ui/button";
import { Truck, Shield, Headphones, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Page() {
  validateSession();
  return (
    <div className="w-full">
      <Header />

      <Hero />

      <div className="mx-7">
        <Shop />
        
        {/* Why Choose Us Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="playfair-display-regular text-4xl font-bold mb-4">
                Why Choose Artisan Home
              </h2>
              <p className="text-muted-foreground text-xl">
                Quality craftsmanship meets modern convenience
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/20 mb-4">
                  <Truck className="w-8 h-8 text-orange-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Free Delivery</h3>
                <p className="text-muted-foreground">
                  Complimentary shipping on all orders over $500
                </p>
              </div>

              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/20 mb-4">
                  <Shield className="w-8 h-8 text-orange-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
                <p className="text-muted-foreground">
                  2-year warranty on all furniture pieces
                </p>
              </div>

              <div className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/20 mb-4">
                  <Headphones className="w-8 h-8 text-orange-700" />
                </div>
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-muted-foreground">
                  Dedicated customer service team always ready to help
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Collection CTA */}
        <section className="py-16 mb-20">
          <div className="relative h-[400px] rounded-2xl overflow-hidden bg-cover bg-center"
            style={{
              backgroundImage: "url('https://res.cloudinary.com/dloa5kpxd/image/upload/v1763732880/image_1_ln6ki2.jpg')"
            }}>
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
              <h2 className="playfair-display-regular text-4xl md:text-5xl font-bold text-white mb-4">
                New Spring Collection
              </h2>
              <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl">
                Refresh your space with our latest arrivals. Handpicked pieces that blend style and comfort.
              </p>
              <Button className="bg-orange-700 hover:bg-orange-800 text-lg px-8 py-6">
                <Link href="/furniture">
                  Explore Collection
                </Link>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
