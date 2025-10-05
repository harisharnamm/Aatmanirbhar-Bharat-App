import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aatmanirbhar Bharat Unified Portal',
  description: 'Your gateway to self-reliant entrepreneurship in India - Government schemes, funding, licenses, and training for rural businesses',
  keywords: 'Aatmanirbhar Bharat, self-reliant India, rural entrepreneurship, government schemes, business loans, startup India',
  generator: 'Aatmanirbhar Bharat Initiative',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
