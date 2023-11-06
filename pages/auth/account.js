import Link from 'next/link'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import HalfPageLayout from '@/components/Layouts/HalfLayout/HalfPageLayout'
import styles from '@/components/SignInForm/SignInForm.module.css'

const AccountPage = () => {
    const { data: session, status, update } = useSession();

    useEffect(() => {
        console.log("session:", session);
    }, [])

    return (
        <>
            <HalfPageLayout>
                <div className={styles.formContainer}>
                    {
                        status === "loading"
                            ?
                            (
                                <p>Loading...</p>
                            )
                            :
                            (
                                session ? (
                                    <>
                                        <p>Name: {session.user.name}</p>
                                        <p>Email: {session.user.email}</p>
                                        <p>ID: {session.user.id}</p>
                                        <p>Role: {session.user.role}</p>
                                    </>
                                ) : (
                                    <>
                                        You must be logged in to view your account page
                                    </>
                                )
                            )
                    }
                </div>

                <Link
                    href={'/'}
                    className={styles.link}
                >
                    Return to Home Page
                </Link>
            </HalfPageLayout>
        </>
    )
}

AccountPage.authpage = true

export default AccountPage
