import React from 'react'
import styles from './LoadingScreenModal.module.scss'
import SyncLoader from "react-spinners/SyncLoader";
import ReactDom from 'react-dom'

function LoadingScreenModal() {
  return ReactDom.createPortal(
    <div className={styles.LoadingScreen}>
      <div className={styles.Loader}>
        <SyncLoader color={"#F81D88"} size={35} />
      </div>
    </div>,
    document.getElementById('root')
  )
}

export default LoadingScreenModal