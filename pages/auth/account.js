import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import HalfPageLayout from '@/components/Layouts/HalfLayout/HalfPageLayout';
import styles from '@/components/SignInForm/SignInForm.module.css';

const AccountPage = () => {
    const { data: session, status } = useSession()
    const [userGuestlist, setUserGuestlist] = useState([])

    const fetchUserGuestlist = async () => {
        if (session) {
            fetch(`/api/guestlist/user/${session.user.id}`)
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        console.log('Failed to fetch user guestlist information')
                        throw new Error('Failed to fetch user guestlist information')
                    }
                })
                .then((userData) => {
                    if (userData.userGuestlist) {
                        setUserGuestlist(userData.userGuestlist)
                    }
                    console.log('User data:', userData)
                })
                .catch((error) => {
                    console.error('Error fetching user guestlist information', error)
                })
        }
    }

    useEffect(() => {
        if (status === 'authenticated' && userGuestlist.length === 0 && session) {
            fetchUserGuestlist(session.user.id)
        }
    }, [status])

    return (
        <HalfPageLayout>
            <div className={styles.formContainer}>
                {status === 'loading' ?
                    <p>Loading...</p>
                    :
                    <>
                        {session ?
                            <>
                                <p>Name: {session.user.name}</p>
                                <p>Email: {session.user.email}</p>
                                <h2>Upcoming Events</h2>
                                <ul>
                                    <Suspense>
                                        {userGuestlist.map((guest) => (
                                            <li key={guest.id}>
                                                <p>
                                                    {guest.firstName} {guest.lastName}
                                                </p>
                                                <p>
                                                    Email: {guest.email}
                                                </p>
                                                <p>
                                                    Access: {guest.access ? 'Granted' : 'Waitlist'}
                                                </p>
                                                {
                                                    guest.access ?
                                                        <p>
                                                            {guest.qrCode &&
                                                                <img
                                                                    src={guest.qrCode}
                                                                    alt="QR Code"
                                                                />
                                                            }
                                                        </p>
                                                        :
                                                        <p>
                                                            You're currently on the waitlist. Your ticket will appear here if space becomes available.
                                                        </p>
                                                }
                                            </li>
                                        ))}
                                    </Suspense>
                                </ul>
                            </>
                            :
                            <>You must be logged in to view your account page</>
                        }
                    </>
                }
            </div>

            <Link href={'/'} className={styles.link}>
                Return to Home Page
            </Link>
        </HalfPageLayout>
    )
}

AccountPage.authpage = true

export default AccountPage