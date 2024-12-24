import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const PageConnexion = async () => {
    const session = await auth()
    if (!session) redirect('/')
  return (
    <div>Je suis connecté </div>
  )
}

export default PageConnexion