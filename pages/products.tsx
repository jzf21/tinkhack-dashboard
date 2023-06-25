import React from 'react'
import DefaultLayout from '../components/DefaultLayout/DefaultLayout'
import ProductCard from '../components/ProductCard/ProductCard'

type Props = {}

const products = (props: Props) => {
  return (
    <DefaultLayout>
        <div className="flex flex-col items-center mt-[200px] justify-center w-full h-full">
            <ProductCard title='Iphone' price={100} />
            </div>
    </DefaultLayout>
  )
}

export default products