import { useQuery } from "@tanstack/react-query"
import { productsActions } from "../products";

type Options = {
  id: number;
}

export const useProduct = ({ id }: Options) => {
  const productQuery = useQuery({
    queryKey: ["product", { id }],
    queryFn: async ()=> productsActions.getProductById(id),
    staleTime: 1000 * 60 * 60
  })

  return {
    productQuery
  }
}