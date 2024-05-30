import axios from "@/shared/axios-instance";

export interface Cart {
  total_price: number;
  cart_items: CartItem[];
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  manufacturer: string;
  type: string;
  description: string;
  availability: number;
  image: string;
}

export async function getCart(products: string[]) {
  return await axios.post<Cart>("/cart", {
    products,
  });
}
