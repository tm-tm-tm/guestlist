import styles from './ColumnLayout.module.css'

export default function ColumnLayout({ children }) {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.column}></div>
                <div className={styles.columnMiddle}>
                    {children}
                </div>
                <div className={styles.column}></div>
            </div>
        </>
    )
}
