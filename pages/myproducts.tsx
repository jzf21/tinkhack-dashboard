import React from 'react'
import DefaultLayout from '../components/DefaultLayout/DefaultLayout'
import MyProducts from '../components/MyProducts/MyProducts'
import { useSession } from 'next-auth/react'

type Props = {}

export default function myproducts({}: Props) {
      const { data } = useSession()
  return (
    <DefaultLayout>
        <MyProducts/>
    </DefaultLayout>
  )
}