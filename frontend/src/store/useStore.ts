// File for global state management using zustand

import { create } from "zustand";

import * as api from "../services/api";

import { CartItem, Product } from "../lib/types";

interface StoreState {
  products: Product[];
  cart: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  totalSavings: number;

  calculateTotals: () => void;
  fetchData: () => Promise<void>;
  addToCart: (productId: string, quantity: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  checkout: () => Promise<{ success: boolean; message?: string }>;
}

// Create a zustand store
export const useStore = create<StoreState>((set, get) => ({
  products: [],
  cart: [],
  totalQuantity: 0,
  totalPrice: 0,
  totalSavings: 0,

  // Calculate cart totals
  calculateTotals: () => {
    const { cart } = get();
    let totalQuantity = 0;
    let totalPrice = 0;
    let totalSavings = 0;

    cart.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item.subtotal ?? 0;
      totalSavings += item.savings ?? 0;
    });

    set({ totalQuantity, totalPrice, totalSavings });
  },

  // Fetch products and cart data
  fetchData: async () => {
    const [productsResponse, cartResponse] = await Promise.all([
      api.fetchProducts(),
      api.fetchCart(),
    ]);

    if (productsResponse.success) {
      set({ products: productsResponse.data });
    } else {
      console.error("Error fetching products:", productsResponse.message);
    }

    if (cartResponse.success) {
      set({ cart: cartResponse.data });
      get().calculateTotals();
    } else {
      console.error("Error fetching cart:", cartResponse.message);
    }
  },

  // Add item to cart or update quantity
  addToCart: async (productId, quantity) => {
    const response = await api.addToCart(productId, quantity);

    if (response.success) {
      set(() => ({ cart: response.data.cart }));
      get().calculateTotals();
    } else {
      console.error("Error adding to cart:", response.message);
    }
  },

  // Remove item from cart
  removeFromCart: async (productId) => {
    const response = await api.removeFromCart(productId);

    if (response.success) {
      set((state) => ({ cart: state.cart.filter((item) => item.product_id !== productId) }));
      get().calculateTotals();
    } else {
      console.error("Error removing from cart:", response.message);
    }
  },

  // Checkout (Clear cart)
  checkout: async () => {
    const response = await api.checkout();

    if (response.success) {
      set({ cart: [], totalQuantity: 0, totalPrice: 0, totalSavings: 0 });
      return { success: true };
    } else {
      console.error("Error during checkout:", response.message);
      return { success: false, message: response.message };
    }
  },
}));
