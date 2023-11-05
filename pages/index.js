import styles from '@/styles/Home.module.css'

import ColumnLayout from '@/components/Layouts/ColumnLayout'
import ColumnRowLayout from '@/components/Layouts/ColumnRowLayout'
import GuestlistForm from '@/components/Guestlist/GuestlistForm'
import Card from '@/components/Card/Card'

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.imageContainer}>
          <div className={styles.image}>

          </div>
        </div>
        <GuestlistForm />
      </main>
    </>
  )
}
