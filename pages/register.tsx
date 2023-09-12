import React from 'react'
import SellerForm from '../components/AddDetails/AddDetails'
import DefaultLayout from '../components/DefaultLayout/DefaultLayout'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'
type Props = {}

const register = (props: Props) => {
  const { data } = useSession()
  console.log(data)
  const router = useRouter()

  // Check if the session role is "seller" and redirect if necessary
  if (data?.user.role === 'seller') {
    router.push('/')
    return null // You can also render a loading state here
  }

  return (
    <DefaultLayout>
       <SellerForm/>
    </DefaultLayout>
   
  )
}

export default register