import { useEffect, useState } from 'react';
import moment from 'moment';
import styles from './SetTimes.module.css';

const calculateDuration = (length) => {
    if (length <= 0) {
        return '';
    }

    const duration = moment.duration(length, 'minutes');

    const hours = duration.hours();
    const minutes = duration.minutes();

    const hourString = hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : '';
    const minuteString = minutes > 0 ? `${hours > 0 ? ' ' : ''}${minutes} minute${minutes > 1 ? 's' : ''}` : '';

    const result = `${hourString}${minuteString}`;

    console.log('Calculated duration:', result);

    return result;
};

// const calculateDuration = (length) => {
//     if (length <= 0) {
//         return '';
//     }

//     const duration = moment.duration(length, 'minutes');

//     // Format the duration as HH:mm:ss
//     const formattedDuration = moment.utc(duration.asMilliseconds()).format('HH:mm:ss');

//     return formattedDuration;
// };

const SetTimes = ({ performances }) => {
    const [updatedPerformances, setUpdatedPerformances] = useState([]);

    useEffect(() => {

        const performancesWithDuration = performances.map((performance) => ({
            ...performance,
            duration: calculateDuration(performance.length),
        }));


        setUpdatedPerformances(performancesWithDuration);
        console.log(performancesWithDuration)
    }, [performances]);

    return (
        <>
            <div className={styles.timeline}>
                <h2 className={styles.heading}>Set Times</h2>
                {updatedPerformances.map((performance, index) => (
                    <div key={index} className={styles.performance}>
                        <div className={styles.artistName}>{performance.artistName}</div>
                        <div className={styles.timeRange}>
                            <div>
                                ({performance.duration})
                            </div>
                            <div>
                                {performance.startTime} - {performance.endTime}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SetTimes;
