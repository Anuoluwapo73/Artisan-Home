import { Star } from "lucide-react";
import React from "react";

interface ProductsCardProps {
  category: string;
  productName: string;
  rating: number;
  amount: string;
  url: string;
}

const ProductsCard = ({
  category,
  productName,
  rating,
  url,
  amount,
}: ProductsCardProps) => {
  return (
    <div className="rounded-xl border-3 min-h-[40rem] md:min-h-[30rem] lg:min-h-[20rem]">
      <img src={url} alt={productName} className="rounded-t-xl  w-full object-cover h-[500px] md:h-[300px]" />
      <div className="flex flex-col gap-1 m-3">
        <p className="text-muted-foreground ">{category}</p>
        <h3 className="text-[20px] font-light playfair-display-regular">
          {productName}
        </h3>

        {rating && (
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.round(rating!) ? "fill-amber-700 outline-none" : "fill-white"
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">
              ({rating})
            </span>
          </div>
        )}

        <p className="text-[20px] font-semibold">{amount}</p>
      </div>
    </div>
  );
};

export default ProductsCard;
