import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './Guestlist.module.css'
import GuestlistForm from './GuestlistForm';
import GuestlistAnalytics from './GuestlistAnalytics'

// const qrcode = require('qrcode');

export default function Guestlist() {
    const [guests, setGuests] = useState([])
    const [id, setId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [instagram, setInstagram] = useState('')
    const [email, setEmail] = useState('')
    const [timestamp, setTimestamp] = useState('')
    const [userId, setUserId] = useState('')
    const [access, setAccess] = useState('')
    // const [qrCodes, setQRCodes] = useState([]);
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(null)
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredGuests, setFilteredGuests] = useState([]);

    // useEffect(() => {
    //     console.log("Guests:", guests)
    //     console.log("id:", id)
    //     console.log("firstName:", firstName)
    //     console.log("lastName:", lastName)
    //     console.log("instagram:", instagram)
    //     console.log("timestamp:", timestamp)
    //     console.log("access:", access)
    //     console.log("userId:", userId)
    // }, [id, firstName, lastName, instagram, timestamp, access, guests, userId])

    useEffect(() => {
        readGuestlist()
    }, [access])

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = { firstName, lastName, instagram, email }

        fetch('/api/guestlist/guestlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
            .then((response) => {
                if (response.status !== 200) {
                    console.log('something went wrong')
                } else {
                    resetForm();
                    readGuestlist();
                    console.log('form submitted successfully.')
                }
            })
            .catch((error) => {
                console.log('there was an error submitting', error)
            })
    }

    const readGuestlist = () => {
        fetch('/api/guestlist/guestlist', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => {
                if (res.status !== 200) {
                    console.log('something went wrong')
                } else {
                    return res.json()
                }
            })
            .then((guests) => {
                if (guests) {
                    guests.forEach((guest) => {
                        guest.timestamp = formatTimestamp(guest.timestamp)
                        guest.updatedAt = formatTimestamp(guest.updatedAt)
                    })
                    setGuests(guests)
                    console.log('successfully returned guestlist.')
                }
            })
            .catch((error) => {
                console.log('error returning guestlist.', error)
            })
    }

    // // QR CODE AS IMAGE
    // async function generateQRCode(data) {
    //     try {
    //         // Customize the QR code content as needed
    //         const qrCodeValue = `Your QR code content here: ${data}`;
    //         return new Promise((resolve, reject) => {
    //             qrcode.toDataURL(qrCodeValue, (error, qrCodeData) => {
    //                 if (error) {
    //                     console.error('Error generating QR code:', error);
    //                     reject(error);
    //                 } else {
    //                     resolve(qrCodeData);
    //                 }
    //             });
    //         });
    //     } catch (error) {
    //         console.error('Error generating QR code:', error);
    //         throw error;
    //     }
    // }

    // QR CODE AS LINK
    // async function generateQRCode(data) {
    //     try {
    //         // Customize the QR code content as needed
    //         const qrCodeValue = `Your QR code content here: ${data}`;
    //         return new Promise((resolve, reject) => {
    //             qrcode.toDataURL(qrCodeValue, (error, qrCodeDataUrl) => {
    //                 if (error) {
    //                     console.error('Error generating QR code:', error);
    //                     reject(error);
    //                 } else {
    //                     resolve(qrCodeDataUrl);
    //                 }
    //             });
    //         });
    //     } catch (error) {
    //         console.error('Error generating QR code:', error);
    //         throw error;
    //     }
    // }

    // const readGuestlist = async () => {
    //     try {
    //         const res = await fetch('/api/guestlist/guestlist', {
    //             method: 'GET',
    //             headers: { 'Content-Type': 'application/json' },
    //         });

    //         const guests = await res.json();

    //         const qrCodePromises = guests.map(async (guest) => {
    //             // Generate a QR code for each guest entry (customize the content as needed)
    //             const qrCodeData = await generateQRCode(guest.id);
    //             return { ...guest, qrCode: qrCodeData };
    //         });

    //         const guestsWithQRCodes = await Promise.all(qrCodePromises);

    //         guestsWithQRCodes.forEach((guest) => {
    //             guest.timestamp = formatTimestamp(guest.timestamp);
    //             guest.updatedAt = formatTimestamp(guest.updatedAt);
    //         });

    //         setGuests(guestsWithQRCodes);

    //         if (res.status !== 200) {
    //             console.log('something went wrong');
    //         } else {
    //             console.log('successfully returned guestlist.');
    //         }
    //     } catch (error) {
    //         console.log('error returning guestlist.', error);
    //     }
    // };

    const updateGuestAccess = async (id) => {
        setLoading(true)

        const res = await fetch(`/api/guestlist/guestlist`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        })

        // const { error } = await res.json()
        // setStatus(error ? "error" : "success")

        setAccess(!access)
        setLoading(false)
    }

    const deleteGuest = async (id) => {
        setLoading(true)

        const res = await fetch(`/api/guestlist/guestlist`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        })

        readGuestlist()
        setLoading(false)
    }

    const handleInstagramEntry = (e) => {
        let value = e.target.value
        if (value && !value.startsWith('@')) {
            value = '@' + value
        }
        setInstagram(value)
    }

    const handleSearchInputChange = (e) => {
        const query = e.target.value
        setSearchQuery(query)

        // Filter the guests based on the search query
        const filteredData = guests.filter((guest) => {
            const fullName = guest.firstName.toLowerCase() + ' ' + guest.lastName.toLowerCase()
            return fullName.includes(query.toLowerCase())
        })

        setFilteredGuests(filteredData)
    }

    const guestData = searchQuery ? filteredGuests : guests;

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp)
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC' }
        return date.toLocaleTimeString('en-US', options)
    }

    const resetForm = () => {
        setFirstName('')
        setLastName('')
        setInstagram('')
        setEmail('')
    }

    const updateGuestlist = () => {
        readGuestlist()
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.columnTop}>

                    <div className={styles.inputPanel}>
                        <h1 className={styles.adminHeading}>
                            ADMIN
                        </h1>
                        <div className={styles.adminForm}>
                            <GuestlistForm />
                        </div>

                        <div className={styles.searchContainer}>
                            <input
                                type="text"
                                placeholder="Search by name"
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                                className={styles.searchInput}
                            />
                        </div>
                    </div>
                    {/* <form action="#" method="POST" onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <label>
                                FIRST NAME
                            </label>
                            <input
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

                        <div>
                            <label>
                                LAST NAME
                            </label>
                            <input
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

                        <div>
                            <label>
                                INSTAGRAM
                            </label>
                            <input
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

                        <div>
                            <label>
                                EMAIL
                            </label>
                            <input
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

                        <div>
                            <button>
                                SUBMIT
                            </button>
                        </div>

                    </form> */}
                </div>

                <div className={styles.columnTop}>
                    <GuestlistAnalytics guests={guests} access={access} updateGuestlist={updateGuestlist} />
                </div>


                <div className={styles.columnBottom}>
                    <motion.table className={styles.table} >
                        <thead className={styles.header}>
                            <tr>
                                <th className={styles.heading}>#</th>
                                <th className={styles.firstNameColumn}>First Name</th>
                                <th className={styles.lastNameColumn}>Last Name</th>
                                {/* <th>Instagram</th> */}
                                <th className={styles.emailColumn}>Email</th>
                                <th className={styles.addedColumn}>Added</th>
                                <th className={styles.updatedColumn}>Updated</th>
                                {/* <th>Access</th> */}
                                <th className={styles.accessColumn}>Access</th>
                                {/* <th>QR</th> */}
                                <th></th>
                            </tr>
                        </thead>

                        <tbody className={styles.body}>
                            <AnimatePresence >
                                {guestData?.map((guest) => (
                                    <motion.tr
                                        key={guest.id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{
                                            layout: { duration: 0.2 },
                                        }}
                                    >
                                        <td className={styles.rows}>
                                            {guest.id}
                                        </td>
                                        <td className={styles.firstNameColumn}>
                                            {guest.firstName}
                                        </td>
                                        <td className={styles.lastNameColumn}>
                                            {guest.lastName}
                                        </td>
                                        {/* <td>
                                            {guest.instagram}
                                        </td> */}
                                        <td className={styles.emailColumn}>
                                            {guest.email}
                                        </td>
                                        <td className={styles.addedColumn}>
                                            {guest.timestamp}
                                        </td>
                                        <td className={styles.updatedColumn}>
                                            {guest.updatedAt}
                                        </td>
                                        {/* <td>
                                            {guest.access.toString()}
                                        </td> */}
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={guest.access}
                                                onChange={() => updateGuestAccess(guest.id)}
                                                disabled={loading}
                                            />
                                            {/* <label>
                                                Access
                                            </label> */}
                                        </td>
                                        {/* <td>
                                            {guest.qrCode && <img src={guest.qrCode} alt="QR Code" />}
                                            {guest.qrCode && (
                                                <a
                                                    href={guest.qrCode}
                                                    download={`qr_code_${guest.id}.png`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Download QR Code
                                                </a>
                                            )}
                                        </td> */}
                                        <td>
                                            <button
                                                onClick={() => deleteGuest(guest.id)}
                                                disabled={loading}
                                                className={styles.deleteButton}
                                            >
                                                x
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </motion.table>
                </div>
            </div>

            <div>

            </div>
        </>
    )
}


