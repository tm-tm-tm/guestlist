import React from 'react'
import { getProviders, signIn } from "next-auth/react"
import EmailSignInForm from '@/components/SignInForm/SignInForm'
import Link from 'next/link'
import HalfPageLayout from '@/components/Layouts/HalfLayout/HalfPageLayout'

export default function SignIn({ providers }) {
    return (
        <>

            <HalfPageLayout>
                <EmailSignInForm />
            </HalfPageLayout>

            {/* {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button onClick={() => signIn(provider.id, { callbackUrl: '/auth/account' })}>
                        Sign In with {provider.name}
                    </button>
                </div>
            ))} */}
        </>
    )
}
