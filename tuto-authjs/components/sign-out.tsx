"use client"
import { signOut, useSession } from "next-auth/react"
import Connexion from "./sign-in"
 
export function BoutonConnexion() {
    const { data: session, status } = useSession()

    console.log("Session:", session)
    console.log("Status:", status)

    if (status === "unauthenticated") {
        return <div>
            <Connexion></Connexion>
            <p>Pas connecté</p>
        </div> 
    }

    return (
        <div>
            <p>Connecté en tant que: {session?.user?.email}</p>
            <button 
                onClick={() => signOut()}
                className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
            >
                Se déconnecter
            </button>
        </div>
    )
}