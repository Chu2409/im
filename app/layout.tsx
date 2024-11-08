import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from '@/core/shared/providers/auth-provider'
import { getServerSession } from 'next-auth'
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
  const session = await getServerSession()

  return (
    <html lang='en'>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider session={session}>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout
