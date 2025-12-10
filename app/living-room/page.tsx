"use client"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "../components/Header";
import AllProducts from "../components/AllProducts";
import Footer from "../components/Footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LivingRoomPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      const timer = setTimeout(() => {
        router.push("/auth/login");
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [session, status, router]);

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

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="w-full">
      <Header />

      {/* Page Header */}
      <div className="relative w-full h-[30vh] sm:h-[35vh] lg:h-[40vh] bg-cover bg-center"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dloa5kpxd/image/upload/v1763732880/image_1_ln6ki2.jpg')"
        }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <Link href="/" className="absolute top-4 sm:top-6 lg:top-8 left-4 sm:left-6 lg:left-8 flex items-center gap-2 text-white hover:text-white/80 transition-colors">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Back to Home</span>
          </Link>
          <h1 className="playfair-display-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4">
            Living Room Collection
          </h1>
          <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl">
            Discover furniture that brings comfort and style to your living space
          </p>
        </div>
      </div>

      <div className="mx-4 sm:mx-6 lg:mx-7 mt-4 sm:mt-5">
        <AllProducts />
        <Footer />
      </div>
    </div>
  );
}
