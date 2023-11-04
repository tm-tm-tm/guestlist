import styles from './Card.module.css'

export default function Card({ children }) {
    return (
        <>
            <div className={styles.container}>

                <div className={styles.form}>
                    {children}
                </div>
            </div>
        </>
    )
}
