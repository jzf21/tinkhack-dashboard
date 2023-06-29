import React from 'react'
import DefaultLayout from '../components/DefaultLayout/DefaultLayout'
import ProductCard from '../components/ProductCard/ProductCard'
import { useSession } from "next-auth/react"
import AllProducts from '../components/GetAllProducts/GetAllProducts'
import AddProductForm from '../components/AddProducts'

type Props = {}

const products = (props: Props) => {
  const { data } = useSession()
  return (
    <DefaultLayout>

        <div className=" w-full h-full">
            <AllProducts/>
            
            </div>
    </DefaultLayout>
  )
}

export default products