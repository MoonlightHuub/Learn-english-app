import styles from '@/styles/desktop/header.module.css'
import ShortsCutsJson from '../data/constants/shortcuts.json'
import Router from 'next/router';
import Image from 'next/image';

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
        <Image src="/Arkie.png" alt="arkie" width={100} height={65} title="Arkie" />
      </div>
      <div className={styles.keysContainer}>
        <ul className={styles.keyList}>
            {keys.map((keys) => (
                <li onClick={() => Router.push(keys.link)} className={styles.link} key={keys.id}>{keys.key}</li>
            ))}
        </ul>
      </div>
    </header>
  )
}

export default Header
