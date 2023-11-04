import styles from './ColumnRowLayout.module.css'

export default function ColumnRowLayout() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.columnTop}>Top Column 1</div>
                <div className={styles.columnTop}>Top Column 2</div>
                <div className={styles.columnBottom}>Bottom Column</div>
            </div>
        </>
    )
}
