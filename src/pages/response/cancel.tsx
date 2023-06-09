import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import {  Heading, Text }  from '@sonicaweb3/react'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Cancel() {
  return (
    <>
      <Head>
        <title>Cancel - Subscriptions</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

        <Heading variant='big-title' color='errorColor500'>Subscription cancel for the user.</Heading>
        <Text variant='body' color='errorColor500'>You can go back to the <Link href='/' style={{textDecoration: 'underline'}}>home page</Link> and subscribe again.</Text>
      </main>
    </>
  )
}
