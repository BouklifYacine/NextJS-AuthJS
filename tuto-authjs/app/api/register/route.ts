import { prisma } from "@/prisma"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
   try {
       const { email, password } = await request.json()

       if (!email || !password) {
           return NextResponse.json({ message: "Champs manquants" }, { status: 400 })
       }

       const existingUser = await prisma.user.findUnique({ where: { email } })
       if (existingUser) {
           return NextResponse.json({ message: "Email déjà utilisé" }, { status: 400 })
       }

       const hashedPassword = await bcrypt.hash(password, 10)
       const user = await prisma.user.create({
           data: { email, password: hashedPassword }
       })

       return NextResponse.json(user.email, { status: 201 })

   } catch (error) {
       return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
   }
}