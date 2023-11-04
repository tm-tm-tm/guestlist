import Link from 'next/link'

const VerificationPage = () => {
    return (
        <>
            <div>
                Check Your Email
            </div>
            <div>
                A sign-in link has been sent to your email address
            </div>

            <Link href={'/'} >
                Return to Home Page
            </Link>
        </>
    )
}

VerificationPage.authpage = true

export default VerificationPage