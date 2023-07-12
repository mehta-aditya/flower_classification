import './globals.css'
import Head from "next/head";
import { Inter } from 'next/font/google'
import { Metadata } from 'next';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Flower Classification',
  description: 'A website that uses AI computer vision technology to classify different types of flowers.',
  icons: {
    icon: [{url: '/favicon-16x16.png', sizes: '16x16', type: 'images/png'},
      {url: '/favicon-32x32.png', sizes: '32x32', type: 'images/png'}],
    apple: ['/apple-touch-icon.png'],
  },
  manifest: '/site.webmanifest'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={"$(inter.className) bg-pink-100"}>{children}</body>
    </html>
  )
}
