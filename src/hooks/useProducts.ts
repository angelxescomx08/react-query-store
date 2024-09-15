import { useQuery } from "@tanstack/react-query"
import { productsActions } from "../products";

type Options = {
  filterKey?: string;
}

export const useProducts = ({ filterKey }: Options) => {
  const productsQuery = useQuery({
    queryKey: ["products", { filterKey }],
    queryFn: async ()=> productsActions.getProducts({ filterKey }),
    staleTime: 1000 * 60 * 60
  })

  return {
    productsQuery
  }
}