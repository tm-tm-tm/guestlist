import { useState } from 'react'
import { signIn } from 'next-auth/react'
import GearSVG from '@/assets/svg/GearSVG'
import styles from './SignInForm.module.css'

export default function EmailSignInForm() {
  const [formStatus, setFormStatus] = useState('inactive')

  async function handleSubmit(e) {
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



// import React, { useRef, useState } from 'react';
// import styles from './Form.module.css'

// import GearSVG from '@/assets/svg/GearSVG'

// export default function Form() {
//   const inputElement = useRef();
//   const [formStatus, setFormStatus] = useState('inactive')
//   const [message, setMessage] = useState('')

//   const subscribe = async (e) => {
//     e.preventDefault();
//     setFormStatus('processing...')

//     const res = await fetch('/api/subscribe', {
//       body: JSON.stringify({
//         email: inputElement.current.value
//       }),
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       method: 'POST'
//     })

//     const { error } = await res.json()
//     if (error) {
//       setFormStatus('error')
//       setMessage('Please try again.')
//       inputElement.current.value = ''
//       return
//     }

//     inputElement.current.value = ''
//     setMessage('You are now subscribed.')
//     setFormStatus('subscribed')
//   }

//   return (
//     <div className={styles.subscriberForm}>
//       <form onSubmit={subscribe}>

//         <div className={styles.userInput}>
//           <div>
//             <input
//               ref={inputElement}
//               className={styles.emailInput}
//               id="email-input"
//               name="email"
//               type="email"
//               placeholder="Enter email address for updates."
//               required
//               autoComplete="off"
//             />

//             <button>
//               {
//                 formStatus === 'processing...' ?
//                   <div >
//                     Processing...
//                   </div>
//                   :
//                   'SIGN UP'
//               }
//             </button>
//           </div>
//         </div>

//       </form>

//       {/* <div className={styles.message}>
//         {
//           message
//             ?
//             message
//             :
//             `Enter your email address for updates.`
//         }
//       </div> */}

//       {
//         formStatus === 'subscribed'
//           ?
//           <div className={styles.statusMessage}>
//             You are now subscribed. Thank you. 
//           </div>
//           :
//           ''
//       }

//       {
//         formStatus === 'error'
//           ?
//           <div className={styles.statusMessage}>
//             Please try again.
//           </div>
//           :
//           ''
//       }

//     </div>
//   )
// }
