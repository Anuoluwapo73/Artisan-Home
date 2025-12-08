import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { iProduct } from "./productsSlice";

export type CartItem = iProduct & { quantity: number };

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
}
const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const p = action.payload;

      const existing = state.items.find((x) => x.productName === p.productName);

      const qtyToAdd = p.quantity || 1;

      if (existing) {
        existing.quantity += qtyToAdd;
      } else {
        state.items.push({ ...p, quantity: qtyToAdd });
      }

      state.totalQuantity += qtyToAdd;
      state.totalAmount += p.amount * qtyToAdd;
    },

    removeFromCart(state, action: PayloadAction<string>) {
      const name = action.payload;
      const item = state.items.find((x) => x.productName === name);

      if (!item) return;
      state.totalQuantity -= item.quantity;
      state.totalAmount -= item.amount * item.quantity;
      state.items = state.items.filter((x) => x.productName !== name);
    },

    increaseQty(state, action: PayloadAction<string>) {
      const name = action.payload;
      const item = state.items.find((x) => x.productName === name);

      if (!item) return;
      item.quantity += 1;
      state.totalQuantity += 1;
      state.totalAmount += item.amount;
    },

    decreaseQty(state, action: PayloadAction<string>) {
      const name = action.payload;
      const item = state.items.find((x) => x.productName === name);

      if (!item) return;
      if (item.quantity === 1) {
        state.items = state.items.filter((x) => x.productName !== name);
        state.totalQuantity -= 1;
        state.totalAmount -= item.amount;
      } else {
        item.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalAmount -= item.amount;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
