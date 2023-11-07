import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import HalfPageLayout from '@/components/Layouts/HalfLayout/HalfPageLayout';
import styles from '@/components/SignInForm/SignInForm.module.css';

const AccountPage = () => {
    const { data: session, status } = useSession()
    const [name, setName] = useState(session?.user.name || '');
    const [userGuestlist, setUserGuestlist] = useState([])

    // const handleNameChange = (e) => {
    //     setName(e.target.value);
    // };

    // const handleUpdateName = async (e) => {
    //     e.preventDefault();

    //     if (!session) {
    //         console.log('User is not authenticated. Unable to update name.');
    //         return;
    //     }

    //     const accessToken = session.accessToken;

    //     try {
    //         const response = await fetch('/api/user/profile', {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${accessToken}`,
    //             },
    //             body: JSON.stringify({ name }),
    //         });

    //         if (response.ok) {
    //             // Refresh the session to reflect updated user information
    //             await session.refresh();
    //             setName(session.user.name); // Update the local state
    //         } else {
    //             console.log('Failed to update user name');
    //         }
    //     } catch (error) {
    //         console.error('Error updating user name:', error);
    //     }
    // };

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
                                {/* <form onSubmit={handleUpdateName}>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={handleNameChange}
                                    />
                                    <button type="submit">Update Name</button>
                                </form> */}
                                <p>Email: {session.user.email}</p>
                                <h2>Your Guestlist Information:</h2>
                                <ul>
                                    {userGuestlist.map((guest) => (
                                        <li key={guest.id}>
                                            {`${guest.firstName} ${guest.lastName} - Email: ${guest.email}, Access: ${guest.access ? 'Granted' : 'Waitlist'
                                                }`}
                                        </li>
                                    ))}
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


// import Link from 'next/link'
// import { useEffect } from 'react'
// import { useSession } from 'next-auth/react'
// import HalfPageLayout from '@/components/Layouts/HalfLayout/HalfPageLayout'
// import styles from '@/components/SignInForm/SignInForm.module.css'

// const AccountPage = () => {
//     const { data: session, status, update } = useSession();

//     useEffect(() => {
//         console.log("session:", session);
//     }, [])

//     return (
//         <>
//             <HalfPageLayout>
//                 <div className={styles.formContainer}>
//                     {
//                         status === "loading"
//                             ?
//                             (
//                                 <p>Loading...</p>
//                             )
//                             :
//                             (
//                                 session ? (
//                                     <>
//                                         <p>Name: {session.user.name}</p>
//                                         <p>Email: {session.user.email}</p>
//                                         {/* <p>ID: {session.user.id}</p>
//                                         <p>Role: {session.user.role}</p> */}
//                                     </>
//                                 ) : (
//                                     <>
//                                         You must be logged in to view your account page
//                                     </>
//                                 )
//                             )
//                     }
//                 </div>

//                 <Link
//                     href={'/'}
//                     className={styles.link}
//                 >
//                     Return to Home Page
//                 </Link>
//             </HalfPageLayout>
//         </>
//     )
// }

// AccountPage.authpage = true

// export default AccountPage

