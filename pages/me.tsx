import { useSession } from "next-auth/react"
import Layout from "../components/layout"
import ProductForm from "../components/AddProductForm/AddProductForm"
import DefaultLayout from "../components/DefaultLayout/DefaultLayout"

export default function MePage() {
  const { data } = useSession()

  return (
    <DefaultLayout>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <ProductForm/>
    </DefaultLayout>
  )
}
