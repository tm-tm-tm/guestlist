import styles from './ColumnLayout.module.css'

export default function ColumnLayout({ children }) {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.column}>Column 1</div>
                <div className={styles.columnMiddle}>
                    {children}
                </div>
                <div className={styles.column}>Column 3</div>
            </div>
        </>
    )
}
