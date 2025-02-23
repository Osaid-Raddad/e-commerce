import React from 'react'
import styles from './homeLoader.module.css'
export default function HomeLoader() {
    return (
        <>
            <div className={styles.loaderCont}>

                <div class={styles.loader}></div>
            </div>
        </>
    )
}
