import Image from 'next/image'
import { motion } from "framer-motion"
import styles from './HalfPageLayout.module.css'
import PageTransition from '@/components/PageTransition/PageTransition'

const HalfPageLayout = ({ children, cardConstraints }) => {

  return (
    <>
      <PageTransition>
        <div className={styles.container}>
          <div className={styles.leftHalf}>
            <div className={styles.nestedContainer}>

            </div>
            <div className={styles.button}>

            </div>

            <div className={styles.button}>

            </div>

            <div className={styles.button}>

            </div>
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
