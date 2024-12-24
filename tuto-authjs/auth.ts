import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "database"
    },
    callbacks: {
        async session({ session, user }) {
            session.user = user
            return session
        }
    },
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }), 
        Credentials({
            name: "Yacine",
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
                    throw new Error("Email introuvable")
                }

                if (!user.password) {
                    throw new Error("Email introuvable")
                }

                const ismatched = await bcrypt.compare(password, user.password)

                if (!ismatched) {
                    throw new Error("Les mots de passes correspondent pas")
                }

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            }
        })
    ]
})