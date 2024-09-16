import { productsApi } from "../api";
import { Product } from "../interfaces";

type GetProductsOptions = {
  filterKey?: string;
}

const sleep = (seconds:number) => 
  new Promise(resolve => setTimeout(resolve, seconds * 1000));

export const getProducts = async ({ filterKey }:GetProductsOptions) => {
  await sleep(1);
  const filterUrl = filterKey ? `?category=${filterKey}` : '';
  const { data } = await productsApi.get<Product[]>(`/products${filterUrl}`);
  return data;
}

export const getProductById = async (id: number) => {
  await sleep(1);
  const { data } = await productsApi.get<Product>(`/products/${id}`);
  return data;
}