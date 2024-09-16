import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productsActions } from "../products";

export const useProductMutation = () => {

  const queryClient = useQueryClient();

  const productMutation = useMutation({
    mutationFn: productsActions.createProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['products', { filterKey: data.category }]
      });
    },
    onError: () => {
      console.log('Product creation failed');
    },
    onSettled: () => {
      console.log('Product creation completed');
    }
  });

  return {
    productMutation
  };

}