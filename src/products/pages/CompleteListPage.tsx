import { ProductList } from ".."
import { useProducts } from "../../hooks"


export const CompleteListPage = () => {

  const { productsQuery } = useProducts({})

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Todos los productos</h1>

      {
        productsQuery.isLoading && <p>Cargando...</p>
      }

      {
        productsQuery.isError && <p>Ocurrió un error</p>
      }

      <ProductList
        products={productsQuery?.data || []}
      />

    </div>
  )
}