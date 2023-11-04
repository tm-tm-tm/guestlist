import React from 'react'
import Link from 'next/link'

const ErrorPage = () => {
    return (
        <>
            <div>
                Error
            </div>
            <div>
                Please try again.
            </div>
            <Link href={'/auth/signin'} >
                Return to Sign-In Page
            </Link>
        </>
    )
}

ErrorPage.authpage = true

export default ErrorPage