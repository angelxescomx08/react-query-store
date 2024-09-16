import { ProductList } from ".."
import { useProducts } from "../../hooks"

export const MensPage = () => {

  const { productsQuery } = useProducts({
    filterKey: "men's clothing"
  })

  return (
    <div className="flex-col">
      <h1 className="text-2xl font-bold">Productos para hombres</h1>

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