import styles from '@/styles/Home.module.css'
import Card from '@/components/Card/Card'
import HalfPageLayout from '@/components/Layouts/HalfLayout/HalfPageLayout'

export default function Home() {
  return (
    <>
      <HalfPageLayout>
        <Card />
      </HalfPageLayout>
    </>
  )
}
