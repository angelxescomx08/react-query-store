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
    // onSuccess: (product)=>{
    //   queryClient.setQueryData<Product[]>(
    //     ['products', { filterKey: product.category }],
    //     (oldData) => {
    //       if (!oldData) return [product];
    //       return [...oldData, product];
    //     }
    //   )
    // },
    onMutate: (product) => {
      const optimisticProduct: Product = {...product, id: Math.random()};

      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: product.category }],
        (oldData) => {
          if (!oldData) return [optimisticProduct];
          return [...oldData, optimisticProduct];
        }
      );

      return {
        optimisticProduct
      };
    },
    onSuccess: (data, variables, context) => {
      queryClient.removeQueries({
        queryKey: ['products', { filterKey: context.optimisticProduct.category }]
      })
      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: data.category }],
        (oldData) => {
          if (!oldData) return [data];
          return oldData.map((product) => {
            if (product.id === context.optimisticProduct.id) {
              return data;
            }
            return product;
          });
        }
      );
    },
    onError: (data, variables, context) => {
      queryClient.setQueryData<Product[]>(
        ['products', { filterKey: context?.optimisticProduct.category }],
        (oldData) => {
          if (!oldData) return [];
          return oldData.filter((product) => product.id !== context?.optimisticProduct.id);
        }
      );
    },
    onSettled: () => {
      console.log('Product creation completed');
    },
    
  });

  return {
    productMutation
  };

}