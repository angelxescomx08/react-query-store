import { useQueryClient } from "@tanstack/react-query";
import { productsActions } from "../products";

export const usePrefetchProduct = () => {
  const queryClient = useQueryClient();

  const prefetchProduct = async (id: number) => {
    queryClient.prefetchQuery({
      queryKey: ["product", { id }],
      queryFn: async () => productsActions.getProductById(id)
    });
  }

  return {
    prefetchProduct
  }
}