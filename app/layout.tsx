import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import PersistentLayout from '@/components/PersistentLayout'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VibeVin Dashboard',
  description: 'Modern dashboard for VibeVin hackathon web app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <PersistentLayout>
            {children}
          </PersistentLayout>
        </ThemeProvider>
      </body>
    </html>
  )
} 