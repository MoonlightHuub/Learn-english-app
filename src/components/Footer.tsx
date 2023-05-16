import Link from 'next/link'
import styles from '../styles/desktop/footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <h4>2023. © This page was developed by Rodrigo <Link href='https://github.com/MoonlightHuub' target='_BLANK'><span className={styles.link}>Moonlight</span></Link>.</h4>
    </footer>
  )
}

export default Footer
