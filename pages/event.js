import HalfPageLayout from '@/components/Layouts/HalfLayout/HalfPageLayout'
import PageTransition from '@/components/PageTransition/PageTransition'
import SetTimes from '@/components/SetTimes/SetTimes'
import Timeline from '@/components/Timeline/Timeline'
import { Suspense } from 'react';

const performances = [
    {
        artistName: 'Set #1',
        startDate: '2023-11-15',
        startTime: '2:00pm',
        endDate: '2023-11-15',
        endTime: '3:00pm',
    },
    {
        artistName: 'Set #2',
        startDate: '2023-11-15',
        startTime: '3:00pm',
        endDate: '2023-11-15',
        endTime: '4:30pm',
    },
    {
        artistName: 'Set #3',
        startDate: '2023-11-15',
        startTime: '4:30pm',
        endDate: '2023-11-15',
        endTime: '5:30pm',
    },
    {
        artistName: 'Set #4',
        startDate: '2023-11-15',
        startTime: '5:30pm',
        endDate: '2023-11-15',
        endTime: '6:00pm',
    },
    {
        artistName: 'Set #5',
        startDate: '2023-11-15',
        startTime: '6:00pm',
        endDate: '2023-11-15',
        endTime: '7:30pm',
    }
];

export default function Event() {
    return (
        <PageTransition>
            <HalfPageLayout>

                <Suspense>
                    <SetTimes performances={performances} />
                    <Timeline performances={performances} />
                </Suspense>


            </HalfPageLayout>
        </PageTransition>
    )
}
