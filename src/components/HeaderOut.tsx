import styles from '@/styles/desktop/header.module.css'
import Router from 'next/router'

function Header() {
  return (
    <header className={`${styles.headerContainer} ${styles.headerContentContainer}`}>
      <div className={styles.logoContainer}>
        <img src="../../../Arkie.png" alt="logo" style={{width: '100px'}} title='Arkie' />
      </div>
      <div className={styles.keysContainer}>
        <li 
          className={styles.keys} 
          style={{listStyle: 'none'}}
          onClick={() => Router.push('/')}
        > 
          Home 
        </li>
      </div>
    </header>
  )
}

export default Header
