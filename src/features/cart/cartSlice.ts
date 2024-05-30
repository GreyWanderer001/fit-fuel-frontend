import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "@/app/store";

export interface CartState {
  products: string[];
}

const initialState: CartState = {
  products: JSON.parse(localStorage.getItem("cart") || "[]"),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<string>) => {
      state.products = [...state.products, action.payload];
      localStorage.setItem("cart", JSON.stringify(state.products));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const productId = state.products.findIndex(
        (product) => product === action.payload,
      );

      const products = [...state.products];
      products.splice(productId, 1);

      const newState = { ...state, products };

      localStorage.setItem("cart", JSON.stringify(newState.products));

      return newState;
    },
    reset: () => {
      localStorage.setItem("cart", JSON.stringify([]));
      return initialState;
    },
  },
});

export const { addToCart, removeFromCart, reset } = cartSlice.actions;

export default cartSlice.reducer;

export const selectProducts = (state: RootState) => state.cart.products;
