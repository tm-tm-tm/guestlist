import Link from 'next/link'
import HalfPageLayout from '@/components/Layouts/HalfLayout/HalfPageLayout'
import styles from '@/components/SignInForm/SignInForm.module.css'

const ErrorPage = () => {
    return (
        <>
            <HalfPageLayout>
                <div className={styles.formContainer}>
                    <div>
                        Error
                    </div>
                    <div>
                        Please try again.
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
}

ErrorPage.authpage = true

export default ErrorPage
