import { useEffect, useState } from 'react';
import styles from "./GuestlistAnalytics.module.css"
import RefreshSVG from '@/assets/svg/RefreshSVG';

const GuestlistAnalytics = ({ guests, acces, updateGuestlist }) => {
    // Initialize the capacity state from localStorage or default to 200
    const savedCapacity = localStorage.getItem('eventCapacity')
    const [capacity, setCapacity] = useState(savedCapacity ? parseInt(savedCapacity, 10) : 200)

    const totalGuests = guests.length
    const guestsWithAccess = guests.filter((guest) => guest.access === true)
    const guestsWithoutAccess = guests.filter((guest) => guest.access === false)
    const percentageOfCapacityUsed = (guestsWithAccess.length / capacity) * 100
    const percentageOfCapacityAvailable = ((capacity - guestsWithAccess.length) / capacity) * 100

    const handleCapacityChange = (e) => {
        setCapacity(parseInt(e.target.value))
    }

    // Update local storage whenever the capacity changes
    useEffect(() => {
        localStorage.setItem('eventCapacity', capacity.toString())
    }, [capacity])

    return (
        <div className={styles.outerContainer}>

            <div className={styles.innerContainer}>

                <div className={styles.guestlistHeader}>
                    <h2 className={styles.heading}>
                        Guestlist
                    </h2>

                    <button
                        className={styles.refreshButton}
                        onClick={() => updateGuestlist()}
                    >
                        <RefreshSVG />
                    </button>
                </div>

                <p className={styles.statistics}>
                    <span className={styles.label}>
                        RSVP Total
                    </span>
                    <span className={styles.value}>
                        {totalGuests}
                    </span>
                </p>

                <div className={styles.statisticsContainer}>
                    <p className={styles.statistics}>
                        <span className={styles.label}>
                            Access Granted
                        </span>
                        <span className={styles.value}>
                            {guestsWithAccess.length}
                        </span>
                    </p>
                    <p className={styles.statistics}>
                        <span className={styles.label}>
                            Waitlist
                        </span>
                        <span className={styles.value}>
                            {guestsWithoutAccess.length}
                        </span>
                    </p>
                </div>
            </div>

            <div className={styles.innerContainer}>
                <div className={styles.inputContainer}>
                    <input
                        type="number"
                        value={capacity}
                        onChange={handleCapacityChange}
                        className={styles.input}
                    />
                    <div>
                        <h2 className={styles.heading}>
                            Event Capacity
                        </h2>
                        <p className={styles.labelTip}>
                            Update your event capacity as required
                        </p>
                    </div>
                </div>

                <div className={styles.statisticsContainer}>
                    <p className={styles.statistics}>
                        <span className={styles.label}>
                            Used:
                        </span>
                        <span className={styles.value}>
                            {percentageOfCapacityUsed.toFixed(2)}%
                        </span>
                    </p>
                    <p className={styles.statistics}>
                        <span className={styles.label}>
                            Available:
                        </span>
                        <span className={styles.value}>
                            {percentageOfCapacityAvailable.toFixed(2)}%
                        </span>
                    </p>
                </div>

                <div>
                    <p className={styles.capacityIndicator}>
                        <span className={styles.capacityValue}>
                            {guestsWithAccess.length} / {capacity}
                        </span>
                    </p>

                    <div className={styles.progressBar}>
                        <div className={styles.progressBarFill} style={{ width: `${percentageOfCapacityUsed}%` }}></div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default GuestlistAnalytics
