import Image from 'next/image'
import { useRef, useState } from 'react'
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import styles from './Card.module.css'
import GuestlistForm from '../Guestlist/GuestlistForm'
import LockSVG from '@/assets/svg/LockSVG'
import CloseSVG from '@/assets/svg/CloseSVG'

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
                                    {
                                        isOpen ?
                                            <>
                                                {/* <CloseSVG /> */}
                                                <div className={styles.scrollElement}>
                                                    <p className={styles.scroll}>
                                                        This is an event notification.
                                                    </p>
                                                </div>
                                            </>
                                            :
                                            <p>RSVP</p>
                                    }
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
                                    <LockSVG />
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
