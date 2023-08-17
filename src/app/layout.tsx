import { AuthProvider } from '@/providers/auth'
import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { ReactNode } from 'react'
import { Header } from '@/components/header'
import Footer from '@/components/footer'
import { ToastProvider } from '@/providers/toast'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
})

export const metadata: Metadata = {
  title: 'Trips',
  description: 'Reserva de viagens',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <AuthProvider>
          <ToastProvider />
          <Header />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
