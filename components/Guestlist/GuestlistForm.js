import { useState } from 'react'
import { useSession } from "next-auth/react"
import GearSVG from '../../assets/svg/GearSVG'
import styles from "./GuestlistForm.module.css"

export default function GuestlistForm() {
    const { data: session, status } = useSession()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    // const [instagram, setInstagram] = useState('')
    const [email, setEmail] = useState('')
    const [formStatus, setFormStatus] = useState(null)
    const [error, setError] = useState('')

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setFormStatus('processing...')

    //     if (status === 'authenticated') {
    //         const body = {
    //             firstName,
    //             lastName,
    //             email,
    //             userId: session.user.id
    //         }

    //         fetch('/api/guestlist/guestlist', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(body),
    //         })
    //             .then((response) => {
    //                 if (response.ok) {
    //                     // Guestlist entry added successfully
    //                     console.log('Guestlist entry added successfully')
    //                     setFormStatus('success')
    //                     resetForm()
    //                 } else {
    //                     // Handle the error if needed
    //                     console.error('Failed to add guestlist entry')
    //                     setFormStatus('error')
    //                     resetForm()
    //                 }
    //             })
    //             .catch((error) => {
    //                 // Handle fetch or other errors
    //                 console.error('Error while adding guestlist entry:', error)
    //             })
    //     } else {
    //         // Handle the case when the user is not authenticated
    //         console.error('User is not authenticated. Please sign in.')
    //     }
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('processing...')

        if (status === 'authenticated') {
            const body = {
                firstName,
                lastName,
                email,
                userId: session.user.id,
            }

            fetch('/api/guestlist/guestlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
                .then((response) => {
                    if (response.ok) {
                        // Guestlist entry added successfully
                        console.log('Guestlist entry added successfully')
                        setFormStatus('success')
                        resetForm()
                    } else {
                        response.json().then((data) => {
                            if (response.status === 400 && data.message === 'Email already exists') {
                                // Handle the case when the email already exists
                                console.error('Email already added')
                                setFormStatus('Email Already Added')
                            } else {
                                // Handle other errors
                                console.error('Failed to add guestlist entry')
                                setFormStatus('error')
                            }
                        })
                    }
                })
                .catch((error) => {
                    // Handle fetch or other errors
                    console.error('Error while adding guestlist entry:', error)
                    setFormStatus('error')
                })
        } else {
            // Handle the case when the user is not authenticated
            console.error('User is not authenticated. Please sign in.')
            setFormStatus('error')
        }
    }


    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     setFormStatus('processing...')
    //     console.log(formStatus)

    //     const body = { firstName, lastName, email }
    //     const response = await fetch('/api/guestlist/guestlist', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(body)
    //     })

    //     const { error } = await response.json();
    //     if (error) {
    //         resetForm()
    //         setFormStatus('error')
    //         return
    //     }

    //     resetForm()
    //     setFormStatus('success')
    //     // updateGuestlist();
    //     // setIsOpen(false)
    //     console.log('form submitted successfully.')
    // }

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
            {
                session ?
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
                                    {formStatus === 'Email Already Added' && (
                                        <div className={styles.statusMessage}>
                                            You're already on the list. Please try a different email.
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
                    :
                    ''
            }
        </>
    )
}