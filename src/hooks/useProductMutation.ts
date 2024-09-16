import { useMutation } from "@tanstack/react-query";
import { productsActions } from "../products";

export const useProductMutation = () => {
  const productMutation = useMutation({
    mutationFn: productsActions.createProduct,
    onSuccess: () => {
      console.log('Product created successfully');
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