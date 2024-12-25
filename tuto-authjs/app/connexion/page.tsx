"use client"
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

const PageConnexion = () => {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/')
        },
    })

    return (
        <div>
            <h1>Je suis connecté</h1>
            <p>Email: {session?.user?.email}</p>
            <p> Nom : {session?.user?.name} </p>
        </div>
    )
}

export default PageConnexion