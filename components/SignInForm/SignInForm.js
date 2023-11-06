import { useState } from 'react'
import { signIn } from 'next-auth/react'
import styles from './SignInForm.module.css'

import GearSVG from '@/assets/svg/GearSVG'
import Link from 'next/link'

export default function EmailSignInForm() {
  const [formStatus, setFormStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus('processing...')

    const formData = new FormData(e.target)
    const email = formData.get('email')

    signIn('resend', { email, callbackUrl: '/' })
  }

  return (
    <>
      <div className={styles.formContainer}>
        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <input
            className={styles.input}
            id='email'
            name='email'
            type='email'
            label='Sign in with your email'
            placeholder='hello@me.com'
            autoComplete='email'
            required
          />
          <button
            className={styles.button}
            type='submit'
            variant='outline'
            color='gray'
          >
            {
              formStatus === 'processing...' ?
                <div className={styles.loadingIndicator}>
                  <GearSVG />
                </div>
                :
                'SIGN IN'
            }

            {/* <div className={styles.loadingIndicator}>
              <GearSVG />
            </div> */}
          </button>
        </form>
      </div>

      <Link
        href={'/'}
        className={styles.link}
      >
        Return to Home Page
      </Link>
    </>
  )
}
