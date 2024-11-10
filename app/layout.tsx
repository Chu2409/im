import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/core/shared/ui/toaster'

export const metadata: Metadata = {
  title: 'Genomyc IM',
  description: 'Inventory management system for a clinical laboratory',
  manifest: 'manifest.json',
}

const inter = Inter({ subsets: ['latin'] })

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}

export default RootLayout
