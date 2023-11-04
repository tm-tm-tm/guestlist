import styles from '@/styles/Home.module.css'

import ColumnLayout from '@/components/Layouts/ColumnLayout'
import ColumnRowLayout from '@/components/Layouts/ColumnRowLayout'
import Card from '@/components/Card/Card'
// import GuestlistForm from '@/components/Guestlist/GuestlistForm'

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <ColumnLayout>
          <Card>
            {/* <GuestlistForm /> */}
          </Card>
        </ColumnLayout>
      </main>
    </>
  )
}
