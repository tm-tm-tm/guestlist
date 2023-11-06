import Link from 'next/link'
import HalfPageLayout from '@/components/Layouts/HalfLayout/HalfPageLayout'
import styles from '@/components/SignInForm/SignInForm.module.css'

const VerificationPage = () => {
    return (
        <>
                <HalfPageLayout>
                    <div className={styles.formContainer}>
                        <div>
                            Check Your Email
                        </div>
                        <div>
                            A sign-in link has been sent to your email address
                        </div>
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

VerificationPage.authpage = true

export default VerificationPage
