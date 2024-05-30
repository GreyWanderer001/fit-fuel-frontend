import axios from "@/shared/axios-instance";

import { Product } from "./interfaces";

export async function getProducts(
  type?: string,
  manufacturer?: string,
  price?: string,
): Promise<Product[]> {
  const products = await axios.get<Product[]>(`/products`, {
    params: { type, manufacturer, price },
  });

  return products.data;
}
