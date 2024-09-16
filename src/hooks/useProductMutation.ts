import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product, productsActions } from "../products";

export const useProductMutation = () => {

  const queryClient = useQueryClient();

  const productMutation = useMutation({
    mutationFn: productsActions.createProduct,
    // onSuccess: (data) => {
    //   queryClient.invalidateQueries({
    //     queryKey: ['products', { filterKey: data.category }]
    //   });
    // },
    onSuccess: (product)=>{
      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: product.category }],
        (oldData) => {
          if (!oldData) return [product];
          return [...oldData, product];
        }
      )
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