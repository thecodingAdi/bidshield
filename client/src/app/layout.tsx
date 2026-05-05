import type { Metadata } from 'next'

import './globals.css'

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
      <body 
        className="font-sans antialiased bg-white text-slate-900" 
        style={{ 
          // @ts-ignore
          '--font-inter': 'Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif',
          '--font-source-serif': '"Source Serif 4", Georgia, "Times New Roman", serif'
        }}
        suppressHydrationWarning
      >
        {children}

      </body>
    </html>
  )
}
