import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const PageConnexion = async () => {
    const session = await auth()
    console.log("Session dans PageConnexion:", session)
    
    if (!session) {
        console.log("Pas de session, redirection...")
        redirect('/')
    }
    
    return (
        <div>
            <h1>Je suis connecté</h1>
            <p>Email: {session.user?.email}</p>
        </div>
    )
}

export default PageConnexion