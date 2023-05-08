import Head from 'next/head'
import Header from '@/components/header/header'
import Hero from '@/components/hero/Hero'
import styles from '@/styles/Home.module.css'
import Footer from '@/components/footer/Footer'
import MainMenu from '@/components/mainMenu/MainMenu'


export default function Home() {
  return (
    <>
      <Head>
        <title>Learn With Arkie | Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div style={{height: '5em'}} id='Home' />
      <Hero />
      <div style={{height: '5em'}} id='Menu' />
      <MainMenu />
      <Footer />
    </>
  )
}