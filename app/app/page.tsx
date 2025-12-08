"use client"
import Header from "./components/Header";
import Hero from "./components/Hero";
import Shop from "./components/Shop";
import SignOutButton from "./components/SignOut";
import AllProducts from "./components/AllProducts";
import Footer from "./components/Footer";
import { validateSession } from "./utils/validateSession";

export default function Page() {
  validateSession();
  return (
    <div className="w-full">
      <SignOutButton />

      <Header />

      <Hero />

      <div className="mx-7">
        <Shop />
        <AllProducts />
        <Footer />
      </div>
    </div>
  );
}
