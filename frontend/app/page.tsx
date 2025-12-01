"use client";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Shop from "./components/Shop";
import SignOutButton from "./components/SignOut";
import AllProducts from "./components/AllProducts";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Footer from "./components/Footer";

const products = [
  {
    url: "https://res.cloudinary.com/dloa5kpxd/image/upload/v1763732870/image_4_gvv9wy.jpg",
    category: "Furniture",
    productName: "Modern Accent Chair",
    rating: 4.5,
    amount: "$299",
  },
  {
    url: "https://res.cloudinary.com/dloa5kpxd/image/upload/v1763732842/image_5_tpy2w5.jpg",
    category: "Furniture",
    productName: "Minimalist Sofa",
    rating: 4.8,
    amount: "$899",
  },
  {
    url: "https://res.cloudinary.com/dloa5kpxd/image/upload/v1763732874/image_6_rroh2a.jpg",
    category: "Furniture",
    productName: "Designer Armchair",
    rating: 4.3,
    amount: "$449",
  },
  {
    url: "https://res.cloudinary.com/dloa5kpxd/image/upload/v1763732839/image_7_zosuvw.jpg",
    category: "Furniture",
    productName: "Lounge Chair",
    rating: 4.6,
    amount: "$379",
  },
  {
    url: "https://res.cloudinary.com/dloa5kpxd/image/upload/v1763732836/image_8_vq7jht.jpg",
    category: "Furniture",
    productName: "Dining Chair Set",
    rating: 4.7,
    amount: "$599",
  },
  {
    url: "https://res.cloudinary.com/dloa5kpxd/image/upload/v1763732830/image_9_pbv8jz.jpg",
    category: "Furniture",
    productName: "Reading Chair",
    rating: 3,
    amount: "$329",
  },
  {
    url: "https://res.cloudinary.com/dloa5kpxd/image/upload/v1763732802/image_10_a24ouy.jpg",
    category: "Furniture",
    productName: "Office Chair",
    rating: 5,
    amount: "$549",
  },
  {
    url: "https://res.cloudinary.com/dloa5kpxd/image/upload/v1764169983/modern_minimalist_fu_0a0db875_eegruw.jpg",
    category: "Furniture",
    productName: "Rocking Chair",
    rating: 2,
    amount: "$399",
  },
  {
    url: "https://res.cloudinary.com/dloa5kpxd/image/upload/v1764169874/modern_home_decor_ac_3ceb2041_vrsb0h.jpg",
    category: "Decor",
    productName: "Ceramic Vase",
    rating: 3,
    amount: "$89",
  },
  {
    url: "https://res.cloudinary.com/dloa5kpxd/image/upload/v1763732842/image_5_tpy2w5.jpg",
    category: "Decor",
    productName: "Wall Art Set",
    rating: 1.6,
    amount: "$149",
  },
  {
    url: "https://res.cloudinary.com/dloa5kpxd/image/upload/v1764169972/modern_home_decor_ac_fd9b9cb8_xlfl3e.jpg",
    category: "Lighting",
    productName: "Table Lamp",
    rating: 5,
    amount: "$129",
  },
  {
    url: "https://res.cloudinary.com/dloa5kpxd/image/upload/v1764169905/modern_home_decor_ac_3521a7ec_xgymlj.jpg",
    category: "Textiles",
    productName: "Throw Pillows",
    rating: 3.7,
    amount: "$59",
  },
];

export default function Page() {
  const router = useRouter();
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Handle auth client-side
  useEffect(() => {
    async function checkAuth() {
      const session = await getSession();
      if (!session) router.push("/auth/login");
    }
    checkAuth();
  }, []);

  return (
    <div className="w-full">
      <SignOutButton />

      <Header products={products} setFilteredProducts={setFilteredProducts} />

      <Hero />

      <div className="mx-7">
        <Shop />
        <AllProducts
          products={filteredProducts}
          setFilteredProducts={setFilteredProducts}
        />
        <Footer/>
      </div>
    </div>
  );
}
