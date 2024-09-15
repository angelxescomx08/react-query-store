import { productsApi } from "../api";
import { Product } from "../interfaces";

type GetProductsOptions = {
  filterKey?: string;
}

export const getProducts = async ({ filterKey }:GetProductsOptions) => {
  const { data } = await productsApi.get<Product[]>('/products');
  return data;
}