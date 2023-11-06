import { useRef } from 'react'
import { motion } from "framer-motion"
import Image from 'next/image'
import styles from './HalfPageLayout.module.css'
import PageTransition from '@/components/PageTransition/PageTransition'

const HalfPageLayout = ({ children }) => {

  return (
    <>
      <PageTransition>
        <div className={styles.container}>
          <div className={styles.leftHalf}>

          </div>

          <div className={styles.rightHalf} >
            <div className={styles.innerContainer} >
              {children}
            </div>
          </div>
        </div>
      </PageTransition>

    </>
  )
}

export default HalfPageLayout
