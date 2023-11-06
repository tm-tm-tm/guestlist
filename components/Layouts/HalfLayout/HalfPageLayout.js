import { useRef } from 'react'
import { motion } from "framer-motion"
import Image from 'next/image'
import styles from './HalfPageLayout.module.css'
import PageTransition from '@/components/PageTransition/PageTransition'

const HalfPageLayout = ({ children, cardConstraints }) => {

  return (
    <>
      <PageTransition>
        <div className={styles.container}>
          <div className={styles.leftHalf}>

          </div>

          <div className={styles.rightHalf} >
            <motion.div
              className={styles.innerContainer}
              dragConstraints={cardConstraints}
            >
              {children}
            </motion.div>
          </div>
        </div>
      </PageTransition>

    </>
  )
}

export default HalfPageLayout
