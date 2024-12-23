import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "./prisma"
 
export const { handlers : {GET, POST}, signIn, signOut, auth } = NextAuth({
  adapter : PrismaAdapter(prisma),
  session : {strategy : "jwt"},
  providers: [
    GitHub ({
clientId : process.env.AUTH_GITHUB_ID,
clientSecret : process.env.AUTH_GITHUB_SECRET
    }), 
    Credentials({

    })
  ],
})