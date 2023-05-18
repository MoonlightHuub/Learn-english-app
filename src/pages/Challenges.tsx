import styles from "../styles/desktop/Challenges/challenges.module.css"
import Content from "@/components/LogicChallenge"
import Head from "next/head"

function Challenges() {
  return (
    <main className={styles.main}>
      <Head>
        <title>Learn With Arkie | Desafios</title>
        <link rel="icon" href="/arkieico.ico" />
      </Head>
      <Content />
    </main>
  )
}

export default Challenges