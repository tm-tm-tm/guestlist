import { useState } from 'react'
import { useSession } from "next-auth/react"
import GearSVG from '../../assets/svg/GearSVG'
import styles from "./GuestlistForm.module.css"

export default function GuestlistForm() {
    const { data: session } = useSession()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [instagram, setInstagram] = useState('')
    const [email, setEmail] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [formStatus, setFormStatus] = useState('inactive')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormStatus('processing...')
        console.log(formStatus)

        const body = { firstName, lastName, instagram, email }
        const response = await fetch('/api/guestlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })

        const { error } = await response.json();
        if (error) {
            resetForm()
            setFormStatus('error')
            return
        }

        resetForm()
        setFormStatus('success')
        // setIsOpen(false)
        console.log('form submitted successfully.')
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     setFormStatus('processing...')
    //     console.log(formStatus)

    //     const body = { firstName, lastName, instagram }
    //     try {
    //         const response = await fetch('/api/guestlist', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(body)
    //         })
    //         if (response.status !== 200) {
    //             setFormStatus('error')
    //             console.log('something went wrong')
    //         } else {
    //             resetForm()
    //             setFormStatus('success')
    //             console.log('form submitted successfully.')
    //         }
    //     } catch (error) {
    //         console.log('there was an error submitting', error)
    //     }
    // }

    const handleInstagramEntry = (e) => {
        const validInstagramHandleRegex = /^[@]?[a-zA-Z0-9._]*$/
        const inputValue = e.target.value;
        if (validInstagramHandleRegex.test(inputValue)) {
            let value = inputValue;
            if (value && !value.startsWith('@')) {
                value = '@' + value;
            }
            setInstagram(value);
        } else {
            setFormStatus('error');
        }
    }

    const resetForm = () => {
        setFirstName('')
        setLastName('')
        setInstagram('')
        setEmail('')
    }

    return (
        <>
            {
                session ?
                    <div
                        className={styles.formTitle}
                        onClick={(e) => setIsOpen(!isOpen)}
                    >
                        RSVP
                    </div>
                    :
                    <div className={styles.buttonContainer}>
                        <button
                            className={styles.lockedButton}
                            data-tooltip={'SIGN IN FOR ACCESS'}
                            type="button"
                            disabled
                        >
                            LOCKED
                        </button>
                    </div>

            }

            {
                session ?
                    <div
                        className={isOpen === true ? styles.formReveal : styles.formHidden}
                    >
                        <form
                            action="#"
                            method="POST"
                            onSubmit={(e) => handleSubmit(e)}
                        >
                            <div className={styles.inputContainer}>
                                <label className={styles.label}>
                                    First Name
                                </label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    value={firstName}
                                    autoComplete="off"
                                    placeholder="Enter your first name."
                                    required
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>

                            <div className={styles.inputContainer}>
                                <label className={styles.label}>
                                    Last Name
                                </label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    value={lastName}
                                    autoComplete="off"
                                    placeholder="Enter your last name."
                                    required
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>

                            <div className={styles.inputContainer}>
                                <label className={styles.label}>
                                    Instagram
                                </label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    name="instagram"
                                    id="instagram"
                                    value={instagram}
                                    autoComplete="off"
                                    placeholder="Enter your Instagram handle."
                                    required
                                    // onChange={(e) => setInstagram(e.target.value)}
                                    onChange={handleInstagramEntry}
                                />
                            </div>

                            <div className={styles.inputContainer}>
                                <label className={styles.label}>
                                    Email
                                </label>
                                <input
                                    className={styles.input}
                                    id="email-input"
                                    name="email"
                                    type="email"
                                    placeholder="Enter email address for updates."
                                    required
                                    autoComplete="off"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className={styles.buttonContainer}>
                                <button className={styles.button}>
                                    {
                                        formStatus === 'processing...' ?
                                            <div className={styles.loadingIndicator}>
                                                <GearSVG />
                                            </div>
                                            :
                                            'SUBMIT'
                                    }
                                </button>
                                {
                                    formStatus === 'success'
                                        ?
                                        <div className={styles.statusMessage}>
                                            You have been added to the guestlist. Thank you.
                                        </div>
                                        :
                                        ''
                                }

                                {
                                    formStatus === 'error'
                                        ?
                                        <div className={styles.statusMessage}>
                                            Please try again.
                                        </div>
                                        :
                                        ''
                                }
                            </div>
                        </form>
                    </div>
                    :
                    ''
            }
        </>
    )
}