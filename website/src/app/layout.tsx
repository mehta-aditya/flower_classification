import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Flower Classification',
  description: 'A website that uses AI computer vision technology to classify different types of flowers.',
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
