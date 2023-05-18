import HeaderOut from "@/components/HeaderOut";
import Head from "next/head";
import LogicTutorial from "@/components/LogicTutorial";
import styles from "../styles/desktop/Tutorial/Tutorial.module.css";

function Tutorial() {
  return (
    <main className={styles.main}>
      <Head>
        <title>Learn With Arkie | Tutorial</title>
        <link rel="icon" href="/arkieico.ico" />
      </Head>
      <HeaderOut />
      <div style={{ height: "5em" }} className={styles.isMobile} />
      <LogicTutorial />
    </main>
  );
}

export default Tutorial;
