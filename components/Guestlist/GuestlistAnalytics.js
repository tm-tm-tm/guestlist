import { useState } from 'react';

const GuestlistAnalytics = ({ guests, access }) => {
    const [capacity, setCapacity] = useState(200)

    const totalGuests = guests.length
    const guestsWithAccess = guests.filter((guest) => guest.access === true)
    const guestsWithoutAccess = guests.filter((guest) => guest.access === false)
    const percentageOfCapacityUsed = (guestsWithAccess.length / capacity) * 100

    const handleCapacityChange = (e) => {
        setCapacity(parseInt(e.target.value))
    }

    return (
        <div>
            <h3>Analytics</h3>
            <p>Total Guestlist Entries: {totalGuests}</p>
            <div>
                <label>Event Capacity:</label>
                <p>(Update your capacity as required)</p>
                <input
                    type="number"
                    value={capacity}
                    onChange={handleCapacityChange}
                />
            </div>
            {/* <p>Percentage of Capacity: {(totalGuests / capacity * 100).toFixed(2)}%</p> */}
            <p>Guests with Access: {guestsWithAccess.length}</p>
            <p>Guests without Access: {guestsWithoutAccess.length}</p>
            <p>Percentage of Capacity (with Access): {percentageOfCapacityUsed.toFixed(2)}%</p>
        </div>
    )
}

export default GuestlistAnalytics
