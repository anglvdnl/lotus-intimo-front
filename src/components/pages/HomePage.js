import React from 'react'
import styles from './HomePage.module.scss'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div className={styles.HomePage}>
      <button>
        <Link to='/shop'>Весь каталог</Link>
      </button>


      <div>
        
        <button className={styles.MyButton}>МОЯ КНОПОЧКА</button>
      </div>


    </div>
  )
}

export default HomePage