import Link from 'next/link'
import { useSession } from 'next-auth/react'

const AccountPage = () => {
    const { data: session } = useSession()

    return (
        <>
            {
                session ?
                    <>
                        This is your account page.
                        <div>
                            <p>Name: {session.user.name}</p>
                            <p>Email: {session.user.email}</p>
                            <p>ID: {session.user.id}</p>
                            <p>Role: {session.user.role}</p>
                        </div>

                    </>
                    :
                    <>
                        You must be logged in to view your account page
                    </>
            }

            <Link href={'/'} >
                Return to Home Page
            </Link>
        </>
    )
}

AccountPage.authpage = true

export default AccountPage






