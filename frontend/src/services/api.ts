// File for accessing the API

import { API_URL } from "../lib/constants";

// Wrapper function for fetching data from the API
async function fetchAPI(endpoint: string, options = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return { success: true, data: data };
  } catch (error) {
    console.error("API Error:", error);

    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: "An unknown API error occurred" };
    }
  }
}

// Fetch all products
export async function fetchProducts() {
  return await fetchAPI("/products");
}

// Fetch the cart
export async function fetchCart() {
  return await fetchAPI("/cart");
}

// Add a product to the cart
export async function addToCart(productId: string, quantity: number) {
  return await fetchAPI(`/cart/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product_id: productId, product_qty: quantity }),
  });
}

// Remove a product from the cart
export async function removeFromCart(productId: string) {
  return await fetchAPI(`/cart/remove/${productId}`, { method: "DELETE" });
}

// Checkout the cart
export async function checkout() {
  return await fetchAPI("/cart/checkout", { method: "POST" });
}
