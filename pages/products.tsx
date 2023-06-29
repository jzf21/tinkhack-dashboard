import React from 'react'
import DefaultLayout from '../components/DefaultLayout/DefaultLayout'

import { useSession } from "next-auth/react"
import AllProducts from '../components/GetAllProducts/GetAllProducts'


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