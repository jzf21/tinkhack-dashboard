import React from 'react'
import DefaultLayout from '../components/DefaultLayout/DefaultLayout'
import ProductCard from '../components/ProductCard/ProductCard'
import { useSession } from "next-auth/react"

type Props = {}

const products = (props: Props) => {
  const { data } = useSession()
  return (
    <DefaultLayout>
        <div className="flex flex-col items-center  justify-center w-full h-full">
            <ProductCard title='Iphone' price={100} />
            </div>
    </DefaultLayout>
  )
}

export default products