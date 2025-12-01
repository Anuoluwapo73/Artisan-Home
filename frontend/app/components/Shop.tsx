import { ArrowRight } from "lucide-react";
import React from "react";

interface iAppProps {
  url: string;
  name: string;
  amount: string;
}
const items = [
  {
    url: "https://res.cloudinary.com/dloa5kpxd/image/upload/v1763732880/image_1_ln6ki2.jpg",
    name: "Living Room",
    amount: "48 Products",
  },
  {
    url: "https://res.cloudinary.com/dloa5kpxd/image/upload/v1763732878/image_2_balhe9.jpg",
    name: "BedRoom",
    amount: "36 Products",
  },
  {
    url: "https://res.cloudinary.com/dloa5kpxd/image/upload/v1763732872/image_3_g7f1aa.jpg",
    name: "Decor",
    amount: "72 Products",
  },
];
const Shop = () => {
  return (
    <div>
      <header className="pt-9 text-center">
        <h3 className="playfair-display-regular text-4xl font-bold">
          Shop by Category
        </h3>
        <p className="text-muted-foreground text-xl pt-3">
          Explore our curated collections
        </p>
      </header>
      <div className="relative mt-8 sm:px-2 grid lg:grid-cols-3 gap-6 mb-30 md:grid-cols-2 sm:grid-cols-1">
        {items.map((item) => (
          <div
            key={item.name}
            className="
           relative min-h-[40rem] md:min-h-[35rem] lg:min-h-[30rem] bg-cover bg-center rounded-lg "
            style={{
              backgroundImage: `url(${item.url})`,
            }}
          >
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent rounded-lg"></div>
            <div className="absolute left-6 top-5/6 -translate-y-1/2 flex flex-col gap-3">
              <h3 className="text-4xl playfair-display-regular text-white">
                {item.name}
              </h3>
              <p className="text-white  text-lg">{item.amount}</p>
              <p className="flex text-white text-lg font-bold gap-3 items-center">
                Shop Now <ArrowRight />
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
