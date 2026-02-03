import { Inter } from 'next/font/google'
import './globals.css'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Your App Name',
  description: 'Your app description',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Preload the odometer CSS */}
        <link
          rel="preload"
          href="/sass/odometer.css"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        <noscript>
          <link rel="stylesheet" href="/sass/odometer.css" />
        </noscript>
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}