import styles from '@/styles/desktop/header.module.css'
import Router from 'next/router'
import Image from 'next/image'

function Header() {
  return (
    <header className={`${styles.headerContainer} ${styles.headerContentContainer}`}>
      <div className={styles.logoContainer}>
      <Image src="/Arkie.png" alt="logo" width={100} height={62} title='Arkie' />
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
