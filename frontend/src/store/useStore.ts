import { create } from "zustand";

import { CartItem, Product } from "../lib/types";
import { addToCart, checkout, fetchCart, fetchProducts, removeFromCart } from "../services/api";

import { CartItem } from "./../types/types";

interface StoreState {
  products: Product[];
  cart: CartItem[];
  fetchData: () => Promise<void>;
  addToCart: (productId: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  checkout: () => Promise<void>;
}

export const useStore = create<StoreState>((set) => ({
  products: [],
  cart: [],

  // Fetch products and cart data
  fetchData: async () => {
    const [productsResponse, cartResponse] = await Promise.all([fetchProducts(), fetchCart()]);

    if (productsResponse.success) {
      set({ products: productsResponse.data });
    } else {
      console.error("Error fetching products:", productsResponse.message);
    }

    if (cartResponse.success) {
      set({ cart: cartResponse.data });
    } else {
      console.error("Error fetching cart:", cartResponse.message);
    }
  },

  // Add item to cart
  addToCart: async (productId) => {
    const response = await addToCart(productId);
    if (response.success) {
      set(() => ({ cart: response.data }));
    } else {
      console.error("Error adding to cart:", response.message);
    }
  },

  // Remove item from cart
  removeFromCart: async (productId) => {
    const response = await removeFromCart(productId);
    if (response.success) {
      set((state) => ({ cart: state.cart.filter((item) => item.product_id !== productId) }));
    } else {
      console.error("Error removing from cart:", response.message);
    }
  },

  // Checkout (Clear cart)
  checkout: async () => {
    const response = await checkout();
    if (response.success) {
      set({ cart: [] });
    } else {
      console.error("Error during checkout:", response.message);
    }
  },
}));
