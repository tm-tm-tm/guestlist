import { useSession } from 'next-auth/react'
import Guestlist from '@/components/Guestlist/Guestlist'
import PageTransition from '@/components/PageTransition/PageTransition'
import ColumnLayout from '@/components/Layouts/ColumnLayout'

export default function Admin() {
    const { data: session, status } = useSession()

    return (
        <>
            <PageTransition>
                {
                    session
                        // status === "authenticated"
                        ?
                        (
                            session.user.role === 'Admin' ?
                                <Guestlist />
                                :
                                <div>
                                    You do not have sufficient permissions to view this.
                                </div>

                        )
                        :
                        <div>
                            You must sign in to view this.
                        </div>

                }
            </PageTransition>
        </>
    )
}
