import HeaderOut from "@/components/HeaderOut";
import Head from "next/head";
import Footer from "@/components/Footer";
import Content from "@/components/Tutorial/Content";
import styles from "../styles/desktop/Tutorial/Tutorial.module.css";

function Tutorial() {
  return (
    <main className={styles.main}>
      <Head>
        <title>Learn With Arkie | Tutorial</title>
      </Head>
      <HeaderOut />
      <div style={{ height: "5em" }} />
      <Content />
      <div className={styles.footer}>
        <Footer />
      </div>
    </main>
  );
}

export default Tutorial;
