import HalfPageLayout from '@/components/Layouts/HalfLayout/HalfPageLayout'
import PageTransition from '@/components/PageTransition/PageTransition'
import SetTimes from '@/components/SetTimes/SetTimes'
import Timeline from '@/components/Timeline/Timeline'
import { Suspense } from 'react';

const performances = [
    {
        artistName: 'Set #1',
        startDate: '2023-11-21',
        startTime: '12:00am',
        endDate: '2023-11-21',
        endTime: '1:00am',
    },
    {
        artistName: 'Set #2',
        startDate: '2023-11-21',
        startTime: '1:00am',
        endDate: '2023-11-21',
        endTime: '1:30am',
    },
    {
        artistName: 'Set #3',
        startDate: '2023-11-21',
        startTime: '1:30am',
        endDate: '2023-11-21',
        endTime: '2:30am',
    },
    {
        artistName: 'Set #4',
        startDate: '2023-11-21',
        startTime: '2:30am',
        endDate: '2023-11-21',
        endTime: '3:00am',
    },
    {
        artistName: 'Set #5',
        startDate: '2023-11-21',
        startTime: '3:00am',
        endDate: '2023-11-21',
        endTime: '4:00am',
    }
];

export default function Event() {
    return (
        <PageTransition>
            <HalfPageLayout>

                <Suspense>
                    {/* <SetTimes performances={performances} /> */}
                    <Timeline performances={performances} />
                </Suspense>


            </HalfPageLayout>
        </PageTransition>
    )
}
