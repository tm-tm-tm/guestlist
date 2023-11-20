import { useEffect, useState } from 'react';
import { getSegmentColor } from '@/utils/Utilities';
import moment from 'moment';
import styles from './Timeline.module.css';
import TickCircleSVG from '@/assets/svg/TickSVG';
import ClockSVG from '@/assets/svg/ClockSVG';

const calculateTotalDuration = (performances) => {
    const totalDuration = moment.duration(0);

    performances.forEach((performance) => {
        const [startDateTime, endDateTime] = getAdjustedDateRange(performance);
        const duration = moment.duration(endDateTime.diff(startDateTime));
        performance.length = duration.asMinutes();
        totalDuration.add(duration);
    });

    return totalDuration;
};

const getAdjustedDateRange = (performance) => {
    let startDateTime = moment(`${performance.startDate} ${performance.startTime}`, 'YYYY-MM-DD h:mma');
    let endDateTime = moment(`${performance.endDate} ${performance.endTime}`, 'YYYY-MM-DD h:mma');

    if (startDateTime.isAfter(endDateTime)) {
        endDateTime.add(1, 'day');
    }

    return [startDateTime, endDateTime];
};

const calculatePerformancePercentages = (currentTime, performances) => {
    return performances.map((performance) => {
        const [startDateTime, endDateTime] = getAdjustedDateRange(performance);

        if (currentTime.isBetween(startDateTime, endDateTime, null, '[)')) {
            const totalSegmentDuration = moment.duration(endDateTime.diff(startDateTime));
            const elapsedTime = moment.duration(currentTime.diff(startDateTime));
            return (elapsedTime.asMinutes() / totalSegmentDuration.asMinutes()) * 100;
        } else if (currentTime.isAfter(endDateTime)) {
            return 100;
        } else {
            return 0;
        }
    });
};

const calculateCurrentTimePosition = (currentTime, performances, totalDuration) => {
    const firstPerformance = performances[0];
    const firstPerformanceStartDateTime = moment(`${firstPerformance.startDate} ${firstPerformance.startTime}`, 'YYYY-MM-DD h:mma');
    const elapsedTime = currentTime.diff(firstPerformanceStartDateTime, 'minutes');
    return (elapsedTime / totalDuration.asMinutes()) * 100;
};

const renderMarkers = (performances) => {
    const markers = [];
    const interval = 5 * 60; // 5 minutes in seconds
    const specialInterval = 30 * 60; // 30 minutes in seconds

    const startTime = moment(`${performances[0].startDate} ${performances[0].startTime}`, 'YYYY-MM-DD h:mma');
    const endTime = moment(`${performances[performances.length - 1].endDate} ${performances[performances.length - 1].endTime}`, 'YYYY-MM-DD h:mma');

    const totalDuration = moment.duration(endTime.diff(startTime));

    for (let i = 0; i <= totalDuration.asSeconds(); i += interval) {
        const currentTime = startTime.clone().add(i, 'seconds');

        markers.push(
            <div
                key={i}
                className={styles.marker}
                style={{ left: `calc(${(i / totalDuration.asSeconds()) * 100}%)`, height: i % specialInterval === 0 ? '80px' : '54px' }}
            >
                <div className={styles.markerText}>{i % specialInterval === 0 ? currentTime.format('h:mm') : ''}</div>
            </div>
        );
    }

    return markers;
};

const Timeline = ({ performances }) => {
    const totalDuration = calculateTotalDuration(performances);
    const [currentTimePosition, setCurrentTimePosition] = useState(0);
    const [currentPercentages, setCurrentPercentages] = useState(Array(performances.length).fill(0));
    const [activeSegment, setActiveSegment] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = moment();
            const position = calculateCurrentTimePosition(currentTime, performances, totalDuration);

            setCurrentTimePosition(Math.min(position, 100));

            // Find the index of the active performance
            const activeIndex = performances.findIndex((performance) => {
                const [startDateTime, endDateTime] = getAdjustedDateRange(performance);
                return currentTime.isBetween(startDateTime, endDateTime, null, '[)');
            });

            setActiveSegment(activeIndex);

            // Calculate individual percentages for each performance
            const percentages = calculatePerformancePercentages(currentTime, performances);
            setCurrentPercentages(percentages);
        }, 1000);

        return () => clearInterval(interval);
    }, [performances, totalDuration]);

    return (
        <div className={styles.timeline}>
            <div className={styles.timelineContainer}>
                <div className={styles.totalProgressBar}>
                    {performances.map((performance, index) => {
                        const segmentWidth = `${(performance.length / totalDuration.asMinutes()) * 100}%`;
                        const currentPercentage = currentPercentages[index];
                        const isActive = index === activeSegment;

                        return (
                            <div
                                key={index}
                                className={`${styles.timelineSegment} ${isActive ? styles.activeSegment : ''}`}
                                style={{
                                    width: segmentWidth,
                                    // backgroundColor: getSegmentColor(index)
                                }}
                            >
                                <div className={styles.segmentLabel}>
                                    <div className={styles.artistInfo}>
                                        <div className={styles.artistName}>
                                            {performance.artistName}
                                        </div>
                                    </div>



                                    <div>
                                        {currentPercentage > 0 && currentPercentage < 100 ? (

                                            <>
                                                <div className={styles.percentageInfo}>
                                                    {currentPercentage.toFixed(0)}%
                                                </div>

                                                {/* <span className={styles.currentSetStatus} style={{ left: `${currentPercentage}%` }}>
                                                    {currentPercentage.toFixed(1)}%
                                                </span> */}
                                            </>

                                        ) : currentPercentage === 100 ? (
                                            // <span className={styles.statusComplete}>Complete</span>
                                            <span className={styles.statusComplete}>
                                                <TickCircleSVG />
                                            </span>
                                        ) : (
                                            // <span className={styles.statusUpcoming}>
                                            //     Upcoming
                                            // </span>
                                            <span className={styles.statusUpcoming}>
                                                <ClockSVG />
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {renderMarkers(performances)}

                    {currentTimePosition !== null && currentTimePosition < 100 && (
                        <div
                            className={styles.currentTimeIndicator}
                            style={{
                                left: `${currentTimePosition}%`,
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Timeline;

