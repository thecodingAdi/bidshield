import './globals.css';

export const metadata = {
  title: 'BidShield | Govt of India Procurement Integrity System',
  description: 'Official portal for automated document evaluation and fraud detection.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}