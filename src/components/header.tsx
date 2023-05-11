import styles from '@/styles/desktop/header.module.css'
import ShortsCutsJson from '../data/constants/shortcuts.json'
import Router from 'next/router';

interface ShortCuts{
    id: number;
    key: string;
    link: string;
}

const keys: ShortCuts[] = ShortsCutsJson

function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <img src="../../../Arkie.png" alt="logo" style={{width: '100px'}} title='Arkie' />
      </div>
      <div className={styles.keysContainer}>
        <ul className={styles.keyList}>
            {keys.map((keys) => (
                <li onClick={() => Router.push(keys.link)} className={styles.link}>{keys.key}</li>
            ))}
        </ul>
      </div>
    </header>
  )
}

export default Header
