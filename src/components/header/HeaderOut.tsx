import styles from '@/styles/desktop/header.module.css'
import ShortsCutsJson from '../../data/constants/shortcuts.json'

interface ShortCuts{
    id: number;
    key: string;
}

const keys: ShortCuts[] = ShortsCutsJson

function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        <img src="https://th.bing.com/th/id/R.295f62b1b0bba34b075304090a4d5840?rik=4PLFaPEB61Se1Q&pid=ImgRaw&r=0" alt="logo" style={{width: '60px'}} title='Arkie' />
      </div>
      <div className={styles.keysContainer}>
        <ul className={styles.keyList}>
            {keys.map((keys) => (
                <li key={keys.id} className={styles.keys}>{keys.key}</li>
            ))}
        </ul>
      </div>
    </header>
  )
}

export default Header
