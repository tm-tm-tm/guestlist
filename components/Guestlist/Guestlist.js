import Link from 'next/link'
import { useEffect, useState, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './Guestlist.module.css'
import GuestlistForm from './GuestlistForm';
import GuestlistAnalytics from './GuestlistAnalytics'
const qrcode = require('qrcode');

export default function Guestlist() {
    const [guests, setGuests] = useState([])
    const [access, setAccess] = useState()
    const [checkedIn, setCheckedIn] = useState('');
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredGuests, setFilteredGuests] = useState([]);
    const [qrCodes, setQRCodes] = useState({});

    useEffect(() => {
        readGuestlist()
    }, [checkedIn])

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
                    updateGuestQrCodes()
                    console.log('successfully returned guestlist.')
                }
            })
            .catch((error) => {
                console.log('error returning guestlist.', error)
            })
    }

    const updateGuestAccess = async (id) => {
        setLoading(true);
    
        try {
            const response = await fetch(`/api/guestlist/guestlist`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
    
            if (!response.ok) {
                console.error('Failed to update guest access status:', response.statusText);
                throw new Error('Failed to update guest access status');
            }
    
            const { access: updatedAccess } = await response.json();
            console.log("Updated Access:", updatedAccess)
            setAccess(updatedAccess);
            return updatedAccess;
        } catch (error) {
            console.error('Error updating guest access status:', error);
            throw error;
        } finally {
            readGuestlist()
            setLoading(false);
        }
    };
    

    // const updateCheckIn = async (id) => {
    //     setLoading(true);

    //     return fetch(`/api/guestlist/checkIn`, {
    //         method: "PUT",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ id }),
    //     })
    //         .then((res) => {
    //             if (res.ok) {
    //                 return res.json();
    //             } else {
    //                 console.error('Failed to update guest checked-in status:', res.statusText);
    //                 throw new Error('Failed to update guest checked-in status');
    //             }
    //         })
    //         .then(({ checkedIn: updatedCheckIn }) => {
    //             setCheckedIn(updatedCheckIn);
    //             return updatedCheckIn;
    //         })
    //         .catch((error) => {
    //             console.error('Error updating guest checked-in status:', error);
    //             throw error;
    //         })
    //         .finally(() => {
    //             setLoading(false);
    //         });
    // };

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

    const updateGuestlist = () => {
        readGuestlist()
    }

    // QR CODE AS IMAGE
    // async function generateQRCode(data) {
    //     try {
    //         const qrCodeValue = `Guest: ${data}`;
    //         console.log('Generating QR code for:', qrCodeValue);

    //         return new Promise((resolve, reject) => {
    //             qrcode.toDataURL(qrCodeValue, (error, qrCodeData) => {
    //                 if (error) {
    //                     console.error('Error generating QR code:', error);
    //                     reject(error);
    //                 } else {
    //                     console.log('QR code generated successfully.');
    //                     console.log('Generated QR code data:', qrCodeData);
    //                     resolve(qrCodeData);
    //                 }
    //             });
    //         });
    //     } catch (error) {
    //         console.error('Error generating QR code:', error);
    //         throw error;
    //     }
    // }

    const generateQRCode = async (guest) => {
        try {
            const qrCodeValue = `${guest.id}`;
            console.log('Generating QR code for:', qrCodeValue);

            const qrCodeData = await new Promise((resolve, reject) => {
                qrcode.toDataURL(qrCodeValue, (error, data) => {
                    if (error) {
                        console.error('Error generating QR code:', error);
                        reject(error);
                    } else {
                        console.log('QR code generated successfully.');
                        console.log('Generated QR code data:', data);
                        resolve(data);
                    }
                });
            });

            await updateQRCodeInDatabase(guest.id, qrCodeData);

            return { ...guest, qrCode: qrCodeData };
        } catch (error) {
            console.error('Error generating or saving QR code:', error);
            throw error;
        }
    }

    const updateQRCodeInDatabase = async (guestId, qrCodeData) => {
        try {
            const response = await fetch('/api/guestlist/checkIn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: guestId, qrCodeData }),  // Use guestId as the key
            });

            if (response.ok) {
                const updatedGuest = await response.json();
                console.log('QR code updated in the database successfully:', updatedGuest);
            } else {
                const error = await response.json();
                console.error('Error updating QR code in the database:', error);
            }
        } catch (error) {
            console.error('Error updating QR code in the database:', error);
        }
    };

    const updateGuestQrCodes = async () => {
        setLoading(true)

        try {
            const res = await fetch('/api/guestlist/guestlist', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (res.status !== 200) {
                console.log('something went wrong');
                return;
            }

            const guests = await res.json();

            if (guests) {
                const guestsWithQRCodes = await Promise.all(guests.map(generateQRCode));

                guestsWithQRCodes.forEach((guest) => {
                    guest.timestamp = formatTimestamp(guest.timestamp);
                    guest.updatedAt = formatTimestamp(guest.updatedAt);
                });

                setGuests(guestsWithQRCodes);
                setLoading(false)
                console.log('successfully returned guestlist.');
            }
        } catch (error) {
            console.log('error returning guestlist.', error);
        }
    };

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
                                disabled={loading}
                            />
                        </div>

                        <button
                            onClick={() => updateGuestQrCodes()}
                            className={styles.updateQrButton}
                        >
                            UPDATE QR CODES
                        </button>
                    </div>
                </div>

                <div className={styles.columnTop}>
                    <GuestlistAnalytics guests={guests} access={access} updateGuestlist={updateGuestlist} />
                </div>

                <Suspense>
                    <div className={styles.columnBottom}>
                        <motion.table className={styles.table} >
                            <thead className={styles.header}>
                                <tr>
                                    <th className={styles.heading}>#</th>
                                    <th className={styles.firstNameColumn}>First Name</th>
                                    <th className={styles.lastNameColumn}>Last Name</th>
                                    <th className={styles.emailColumn}>Email</th>
                                    <th className={styles.addedColumn}>Added</th>
                                    <th className={styles.updatedColumn}>Updated</th>
                                    <th className={styles.accessColumn}>Access</th>
                                    <th className={styles.qrColumn}>QR</th>
                                    <th className={styles.checkedInColumn}>Checked-In</th>
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

                                            <td className={styles.emailColumn}>
                                                {guest.email}
                                            </td>
                                            <td className={styles.addedColumn}>
                                                {guest.timestamp}
                                            </td>
                                            <td className={styles.updatedColumn}>
                                                {guest.updatedAt}
                                            </td>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={guest.access}
                                                    onChange={() => updateGuestAccess(guest.id)}
                                                    disabled={loading}
                                                />
                                            </td>
                                            <td>
                                                {guest.qrCode &&
                                                    <img
                                                        src={guest.qrCode}
                                                        className={styles.qrCode}
                                                        alt="QR Code"
                                                    />
                                                }
                                            </td>
                                            <td className={styles.checkedIn}>
                                                <input
                                                    type="checkbox"
                                                    checked={guest.checkedIn}
                                                    // onChange={() => updateCheckIn(guest.id)}
                                                    disabled={loading}
                                                />
                                            </td>
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
                </Suspense>
            </div>

            <div>

            </div>
        </>
    )
}


