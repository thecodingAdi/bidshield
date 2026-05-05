import type { Metadata } from 'next'
import { Inter, Source_Serif_4 } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sourceSerif = Source_Serif_4({ subsets: ["latin"], variable: "--font-source-serif" });

export const metadata: Metadata = {
  title: 'BidShield | AI-Powered Procurement Fraud Detection',
  description: 'Eliminate procurement fraud before the award. BidShield uses AI to detect collusion rings and document inconsistencies in government procurement.',
  generator: 'v0.app',
  icons: {
    icon: '/image.webp',
    apple: '/image.webp',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-white" suppressHydrationWarning>
      <body className={`${inter.variable} ${sourceSerif.variable} font-sans antialiased bg-white text-slate-900`} suppressHydrationWarning>
        {children}

      </body>
    </html>
  )
}
