import { useState } from 'react'
import { signIn } from 'next-auth/react'
import styles from './SignInForm.module.css'

import GearSVG from '@/assets/svg/GearSVG'

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
    <form onSubmit={handleSubmit}>
      <div className='space-y-2'>
        <input
          id='email'
          name='email'
          type='email'
          label='Sign in with your email'
          placeholder='hello@me.com'
          autoComplete='email'
          required
        />
      </div>
      <button
        type='submit'
        variant='outline'
        color='gray'
        className='mt-3 w-full'
      >
        {
          formStatus === 'processing...' ?
            <div className={styles.loadingIndicator}>
              <GearSVG />
            </div>
            :
            'SIGN IN'
        }
      </button>
    </form>
  )
}
