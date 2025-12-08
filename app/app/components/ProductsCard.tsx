import {
  Check,
  Heart,
  Loader2,
  Minus,
  PandaIcon,
  Plus,
  Recycle,
  RefreshCcw,
  ShoppingCart,
  Star,
  Truck,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import toast from "react-hot-toast";

export interface ProductsCardProps {
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
  const [open, setOpen] = useState(false);
  const [selectedQty, setSelectedQty] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedQty < 1) return toast.error("Select at least 1 item");
    setIsLoading(true);

    //simulate a short delay so user sees feedback
    setTimeout(() => {
      dispatch(
        addToCart({
          category,
          productName,
          rating,
          amount: parseFloat(amount),
          url,
          quantity: selectedQty,
        })
      );
      toast.success(`${selectedQty} ${productName} added to cart!`);
      setIsLoading(false);
      setOpen(false)
    }, 2000);
  };

  const dispatch = useDispatch();
  const itemInCart = useSelector(
    (state: any) =>
      state.cart.items.find((x: any) => x.productName === productName)
    // category, productName, rating, amount, url
  );

  return (
    <div
      className="rounded-xl border-3 min-h-[40rem] md:min-h-[30rem] lg:min-h-[20rem]"
      onClick={() => setOpen(!open)}
    >
      <img
        src={url}
        alt={productName}
        className="rounded-t-xl  w-full object-cover h-[500px] md:h-[300px]"
      />
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
                  i < Math.round(rating!)
                    ? "fill-amber-700 outline-none"
                    : "fill-white"
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">
              ({Math.floor(Math.random() * (150 - 50 + 1)) + 50} reviews)
            </span>
          </div>
        )}

        <p className="text-[20px] font-semibold">${amount}</p>
      </div>
      {/* Lightbox area */}
      {open && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          {/* Prevent closing when clicking image */}
          <div
            className="relative w-[100%] md:w-[80%] h-[90vh] md:h-[88vh] p-7 md:pt-6 bg-white rounded-sm flex flex-col overflow-auto md:overflow-hidden md:grid md:grid-cols-2 gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <X
                className="absolute top-2 right-2 "
                onClick={() => setOpen(false)}
              />
              <img
                src={url}
                alt={productName}
                className=" h-[70vh] md:h-[48%] rounded-md w-full object-cover "
              />
              <div className="flex gap-2 w-full  mt-3">
                <img
                  src={url}
                  alt={productName}
                  className="w-full h-40 md:h-32 object-cover rounded-md"
                />
                <img
                  src={url}
                  alt={productName}
                  className="w-full h-40 md:h-32 object-cover rounded-md"
                />
                <img
                  src={url}
                  alt={productName}
                  className="w-full h-40 md:h-32 object-cover rounded-md"
                />
              </div>
            </div>

            {/* Second column */}
            <div className="flex flex-col h-full ">
              <div className="flex flex-col gap-2 md:pb-14 lg:pb-18">
                <p className="text-muted-foreground">{category}</p>
                <h2 className="text-2xl playfair-display-regular font-bold">
                  {productName}
                </h2>
                {rating && (
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.round(rating!)
                            ? "fill-amber-700 outline-none"
                            : "fill-white"
                        }`}
                      />
                    ))}{" "}
                    &nbsp; &nbsp;
                    <span className="text-sm text-muted-foreground ml-1">
                      {rating}
                    </span>
                  </div>
                )}
                <h2 className="text-3xl font-bold">${amount}</h2>
                <p className="text-muted-foreground py-4">
                  Expertly crafted with premium materials, this piece combines
                  timeless design with modern functionality. Perfect for
                  elevating any space with sophisticated style and lasting
                  quality.
                </p>
                <span className="flex items-center gap-3">
                  <Check size={14} color="#CC5500" />{" "}
                  <p>In stock and ready to ship</p>
                </span>
                <span className="flex items-center gap-3">
                  <Truck size={14} color="#CC5500" />{" "}
                  <p>Free shipping on orders over $100</p>
                </span>
                <span className="flex items-center gap-3">
                  <RefreshCcw size={14} color="#CC5500" />{" "}
                  <p>30-day return policy</p>
                </span>
              </div>

              <div className="flex flex-col gap-4 mt-5">
                <div className="flex w-fit items-center  gap-7 border-1 rounded-md px-3 py-2">
                  <p>
                    <button>
                      <Minus
                        onClick={() =>
                          setSelectedQty((prev) => Math.max(prev - 1, 1))
                        }
                        size={10}
                        className=" text-black "
                      />
                    </button>
                  </p>
                  <span>{selectedQty}</span>
                  <p>
                    <button>
                      <Plus
                        onClick={() => setSelectedQty((prev) => prev + 1)}
                        size={10}
                        className=" text-black "
                      />
                    </button>
                  </p>
                </div>

                <div className="w-full flex gap-3">
                  {/* Hey */}
                  <button
                    onClick={handleAddToCart}
                    disabled={isLoading}
                    className="flex text-center bg-amber-700 flex-4/5 text-white items-center justify-center rounded-md px-5 py-2"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-4">
                        <Loader2 className="animate-spin" size={15} />{" "}
                        <span>Adding...</span>
                      </div>
                    ) : (
                      <>
                        <ShoppingCart size={15} />
                        &nbsp; Add to Cart
                      </>
                    )}
                  </button>
                  <span className="border-1 rounded-md px-5 py-2">
                    <Heart size={23} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsCard;
