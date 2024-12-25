import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/auth/login",
      },
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }), 
        Credentials({
            name: "Formulaire",
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"}
            },
            authorize: async (credentials) => {
                const email = credentials.email as string | undefined
                const password = credentials.password as string | undefined

                if (!email || !password) {
                    throw new Error("Vous devez remplir les deux champs")
                }

                const user = await prisma.user.findUnique({
                    where: {email}
                })

                if (!user) {
                    throw new Error("Email introuvable")!
                }

                const ismatched = await bcrypt.compare(password, user.password!)

                if (!ismatched) {
                    throw new Error("Les mots de passes correspondent pas")
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name || email 
                }
            }
        })
        
    ]
})