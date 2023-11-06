import { useRef } from 'react'
import { motion } from "framer-motion"
import Image from 'next/image'
import styles from './HalfPageLayout.module.css'

const HalfPageLayout = ({ children }) => {

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftHalf}>
          
        </div>

        <div className={styles.rightHalf} >
          <div className={styles.innerContainer} >
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default HalfPageLayout
