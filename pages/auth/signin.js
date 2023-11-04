import React from 'react'
import { getProviders, signIn } from "next-auth/react"
import EmailSignInForm from '@/components/SignInForm/SignInForm'
import Link from 'next/link'

export default function SignIn({ providers }) {
    return (
        <>
            {/* <form method="post" action="/api/auth/signin/email">
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                <label>
                    Email address
                    <input type="email" id="email" name="email" />
                </label>
                <button type="submit">
                    Sign in with Email
                </button>
            </form> */}

            <EmailSignInForm />

            <Link href={'/'} >
                Return to Home Page
            </Link>

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
