import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aatmanirbhar Bharat Unified Portal - India\'s Self-Reliance Ecosystem',
  description: 'Comprehensive platform empowering Indian entrepreneurs with government schemes, funding, licenses, training, and business guidance. Join India\'s self-reliance movement and build sustainable businesses.',
  keywords: 'Aatmanirbhar Bharat, self-reliant India, rural entrepreneurship, government schemes, business loans, startup India, MSME, PMEGP, Mudra Yojana, Stand Up India',
  generator: 'Aatmanirbhar Bharat Initiative',
  openGraph: {
    title: 'Aatmanirbhar Bharat Unified Portal',
    description: 'India\'s comprehensive entrepreneurship ecosystem for self-reliant business growth',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aatmanirbhar Bharat Unified Portal',
    description: 'Empowering India\'s entrepreneurial future through comprehensive business support',
  },
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
