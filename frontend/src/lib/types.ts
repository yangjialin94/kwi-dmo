// Type definitions

export interface Product {
  id: string;
  name: string;
  price: number;
  discount: number;
  image: string;
}

export interface CartItem {
  id: number;
  product_id: string;
  name: string;
  price: number;
  discount: number;
  image: string;
  quantity: number;
  subtotal: number;
  savings: number;
}
