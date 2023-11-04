import NextAuth from "next-auth"
import prisma from "@/lib/prisma.js"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { sendVerificationRequest } from "./sendVerificationRequest.js"

export default NextAuth({
    providers: [

        // EMAIL PROVIDER (RESEND)
        {
            id: 'resend',
            name: 'Resend',
            type: 'email',
            from: process.env.EMAIL_FROM,
            sendVerificationRequest
        },

    ],
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
        verifyRequest: '/auth/verification',
        newUser: '/auth/account'
    },
    adapter: PrismaAdapter(prisma),
    database: process.env.DATABASE_URL,
    callbacks: {
        session: async ({ session, user }) => {

            // Modify the user object to set the role based on their email
            if (user.email.endsWith(process.env.EMAIL_SUFFIX)) {
                user.role = 'Admin'
            } else {
                user.role = 'User'
            }

            // Save the modified user object to the database
            await prisma.user.update({
                where: { id: user.id },
                data: { role: user.role },
            })

            // Return the modified session object
            return {
                ...session,
                user: user,
            }
        },
    },
})
