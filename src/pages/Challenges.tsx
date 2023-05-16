import styles from "../styles/desktop/Challenges/challenges.module.css"
import Header from "@/components/HeaderOut"
import Content from "@/components/LogicChallenge"
import Head from "next/head"

function Challenges() {
  return (
    <main className={styles.main}>
      <Head>
        <title>Learn With Arkie | Desafios</title>
      </Head>
      <Header />
      <div style={{height: "5em"}} className={styles.isMobile} />
      <Content />
    </main>
  )
}

export default Challenges