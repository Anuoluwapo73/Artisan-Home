import { Minus, Plus, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decreaseQty, increaseQty, removeFromCart } from "../store/cartSlice";
import { ProductsCardProps } from "./ProductsCard";
import { clearFilters } from "../store/productsSlice";

export const CartItems = () => {
  const dispatch = useDispatch();

  const { items, totalAmount } = useSelector((state: any) => state.cart);

  return (
    <>
      <div className="mx-4">
        {items.map((item: any) => (
          <div className="mb-4 flex justify-between">
            <div className="flex gap-3">
              <img
                src={item.url}
                alt={item.productName}
                className="size-22 rounded-sm object-cover"
              />
              <div className="flex flex-col gap-1">
                <h2 className="font-semibold">{item.productName}</h2>
                <p className="text-muted-foreground">{item.category}</p>
                <p className="font-semibold">
                  <abbr className="font-normal">Qty:</abbr> {item.quantity}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between items-end">
              <button
                onClick={() => dispatch(removeFromCart(item.productName))}
              >
                <X size={15} />
              </button>
              <p className="font-semibold text-[16px]">
                ${item.amount * item.quantity}.00
              </p>
            </div>
          </div>
        ))}

        
      </div>
    </>
  );
};
