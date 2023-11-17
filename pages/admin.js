import Link from 'next/link'
import { useSession } from 'next-auth/react'
import Guestlist from '@/components/Guestlist/Guestlist'
import PageTransition from '@/components/PageTransition/PageTransition'
import HalfPageLayout from '@/components/Layouts/HalfLayout/HalfPageLayout'
import styles from '@/components/SignInForm/SignInForm.module.css'

export default function Admin() {
    const { data: session, status } = useSession()

    return (
        <>
            <PageTransition>
                {
                    session
                        // status === "authenticated"
                        ?
                        (
                            session.user.role === 'Admin' ?
                                <Guestlist />
                                :
                                <>
                                    <HalfPageLayout>
                                        <div className={styles.formContainer}>
                                            <div>
                                                You do not have sufficient permissions to view this.
                                            </div>
                                        </div>

                                        <Link
                                            href={'/auth/signin'}
                                            className={styles.link}
                                        >
                                            Return to Sign-In Page
                                        </Link>
                                    </HalfPageLayout>
                                </>

                        )
                        :
                        <HalfPageLayout>
                            <div className={styles.formContainer}>
                                <div>
                                    You must sign in to view this.
                                </div>
                            </div>

                            <Link
                                href={'/auth/signin'}
                                className={styles.link}
                            >
                                Return to Sign-In Page
                            </Link>
                        </HalfPageLayout>
                }
            </PageTransition>
        </>
    )
}
