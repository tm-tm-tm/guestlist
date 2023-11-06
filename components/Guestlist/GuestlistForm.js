import { useState } from 'react'
import { useSession } from "next-auth/react"
import GearSVG from '../../assets/svg/GearSVG'
import styles from "./GuestlistForm.module.css"

export default function GuestlistForm() {
    const { data: session } = useSession()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    // const [instagram, setInstagram] = useState('')
    const [email, setEmail] = useState('')
    const [formStatus, setFormStatus] = useState(null)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormStatus('processing...')
        console.log(formStatus)

        const body = { firstName, lastName, email }
        const response = await fetch('/api/guestlist/guestlist', {
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
        // updateGuestlist();
        // setIsOpen(false)
        console.log('form submitted successfully.')
    }

    // const handleInstagramEntry = (e) => {
    //     const validInstagramHandleRegex = /^[@]?[a-zA-Z0-9._]*$/
    //     const inputValue = e.target.value;
    //     if (validInstagramHandleRegex.test(inputValue)) {
    //         let value = inputValue;
    //         if (value && !value.startsWith('@')) {
    //             value = '@' + value;
    //         }
    //         setInstagram(value);
    //     } else {
    //         setFormStatus('error');
    //     }
    // }

    const resetForm = () => {
        setFirstName('')
        setLastName('')
        // setInstagram('')
        setEmail('')
    }

    return (
        <>
            {/* {
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

            } */}

            {
                session ?
                    // <div
                    //     className={isOpen === true ? styles.formReveal : styles.formHidden}
                    // >
                    <div className={styles.outerContainer}>
                        <div className={styles.innerContainer}>
                            <form
                                action="#"
                                method="POST"
                                onSubmit={(e) => handleSubmit(e)}
                                className={styles.form}
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
                                        placeholder=""
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
                                        placeholder=""
                                        required
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>

                                {/* <div className={styles.inputContainer}>
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
                                        placeholder=""
                                        required
                                        // onChange={(e) => setInstagram(e.target.value)}
                                        onChange={handleInstagramEntry}
                                    />
                                </div> */}

                                <div className={styles.inputContainer}>
                                    <label className={styles.label}>
                                        Email
                                    </label>
                                    <input
                                        className={styles.input}
                                        id="email-input"
                                        name="email"
                                        type="email"
                                        placeholder=""
                                        required
                                        autoComplete="off"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className={styles.buttonContainer}>
                                    <button
                                        className={styles.button}
                                    // disabled={totalGuests >= capacity}
                                    >
                                        {formStatus === 'processing...' ? (
                                            <div className={styles.loadingIndicator}>
                                                <GearSVG />
                                            </div>
                                        ) : (
                                            'SUBMIT'
                                        )}
                                    </button>
                                    {formStatus === 'success' && (
                                        <div className={styles.statusMessage}>
                                            You have been added to the guestlist. Thank you.
                                        </div>
                                    )}
                                    {formStatus === 'error' && (
                                        <div className={styles.statusMessage}>
                                            Please try again.
                                            {/* {error} */}
                                        </div>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                    // </div>
                    :
                    ''
            }
        </>
    )
}