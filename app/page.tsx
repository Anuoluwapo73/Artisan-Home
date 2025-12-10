"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Shop from "./components/Shop";
import Footer from "./components/Footer";
import { Button } from "@/components/ui/button";
import { Truck, Shield, Headphones, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading
    if (!session) {
      router.push("/auth/login");
      return;
    }
  }, [session, status, router]);

  // Show loading or redirect immediately if not authenticated
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-700 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect, don't show anything
  }

  return (
    <div className="w-full">
      <Header />

      <Hero />

      <div className="mx-4 sm:mx-6 lg:mx-7">
        <Shop />
        
        {/* Why Choose Us Section */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="playfair-display-regular text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                Why Choose Artisan Home
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg lg:text-xl">
                Quality craftsmanship meets modern convenience
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center p-4 sm:p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-orange-100 dark:bg-orange-900/20 mb-3 sm:mb-4">
                  <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-orange-700" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Free Delivery</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Complimentary shipping on all orders over $500
                </p>
              </div>

              <div className="text-center p-4 sm:p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-orange-100 dark:bg-orange-900/20 mb-3 sm:mb-4">
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-orange-700" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Quality Guarantee</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  2-year warranty on all furniture pieces
                </p>
              </div>

              <div className="text-center p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-orange-100 dark:bg-orange-900/20 mb-3 sm:mb-4">
                  <Headphones className="w-6 h-6 sm:w-8 sm:h-8 text-orange-700" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Dedicated customer service team always ready to help
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Collection CTA */}
        <section className="py-12 sm:py-16 mb-16 sm:mb-20">
          <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] rounded-xl sm:rounded-2xl overflow-hidden bg-cover bg-center"
            style={{
              backgroundImage: "url('https://res.cloudinary.com/dloa5kpxd/image/upload/v1763732880/image_1_ln6ki2.jpg')"
            }}>
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
              <h2 className="playfair-display-regular text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
                New Spring Collection
              </h2>
              <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl leading-relaxed">
                Refresh your space with our latest arrivals. Handpicked pieces that blend style and comfort.
              </p>
              <Button className="bg-orange-700 hover:bg-orange-800 text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-4 sm:py-6">
                <Link href="/furniture">
                  Explore Collection
                </Link>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
