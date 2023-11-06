import Image from 'next/image'
import { useRef, useState } from 'react'
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import styles from './Card.module.css'
import GuestlistForm from '../Guestlist/GuestlistForm'
import LockSVG from '@/assets/svg/LockSVG'

const Card = ({ children }) => {
    const { data: session } = useSession()
    const [isOpen, setIsOpen] = useState(false)
    const cardConstraints = useRef()

    return (
        <>
            <div className={styles.container} ref={cardConstraints}>
                <motion.div
                    className={styles.card}
                    drag={true}
                    dragTransition={{ bounceStiffness: 100, bounceDamping: 20 }}
                    dragConstraints={cardConstraints}
                >
                    {/* <Image
                        src="https://miyerypozbkyqwjxvash.supabase.co/storage/v1/object/sign/TEST/SET_L_V01.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJURVNUL1NFVF9MX1YwMS5wbmciLCJpYXQiOjE2OTkyNTIwNDYsImV4cCI6MTg1NjkzMjA0Nn0.jo_rj2hfnrP03LoJyPcwThncAbaZiGjGIYaomx1W5Tc&t=2023-11-06T06%3A27%3A26.537Z"
                        width={400}
                        height={400}
                        alt="Logo"
                        priority
                        // fill
                        className={`${styles.image} ${styles.cardLoading}`}
                    /> */}

                    {/* <Image
                        src=""
                        width={400}
                        height={400}
                        alt="Logo"
                        priority
                        // fill
                        className={`${styles.image} ${styles.cardLoading}`}
                    /> */}

                    <div
                        className={`${styles.image} ${styles.cardLoading}`}
                    >
                        EVENT IMAGE
                    </div>

                    {
                        session ? (
                            <>
                                <div
                                    className={styles.formTitle}
                                    onClick={(e) => setIsOpen(!isOpen)}
                                >
                                    RSVP
                                </div>
                                <div
                                    className={isOpen === true ? styles.formReveal : styles.formHidden}
                                >
                                    <GuestlistForm />
                                </div>
                            </>
                        ) : (
                            <div className={styles.buttonContainer}>
                                <button
                                    className={styles.lockedButton}
                                    data-tooltip={'SIGN IN FOR ACCESS'}
                                    type="button"
                                    disabled
                                >
                                    <LockSVG/>
                                </button>
                            </div>
                        )
                    }
                </motion.div>
            </div>
        </>
    )
}

export default Card
