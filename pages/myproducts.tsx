import React from 'react'
import DefaultLayout from '../components/DefaultLayout/DefaultLayout'

import { useSession } from "next-auth/react"
import AllProducts from '../components/GetAllProducts/GetAllProducts'
import MyProducts from '../components/MyProducts/MyProducts'


type Props = {}

const products = (props: Props) => {
  const { data } = useSession()
  return (
    <DefaultLayout>

        <div className=" w-full h-full">
            <MyProducts/>
            </div>
    </DefaultLayout>
  )
}

export default products