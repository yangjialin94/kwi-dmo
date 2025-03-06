// Type definitions

export interface Product {
  id: string;
  name: string;
  price: number;
  discount: number;
  Image: string;
}

export interface CartItem {
  id: number;
  product_id: number;
  name: string;
  price: number;
  quantity: number;
}
