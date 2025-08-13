
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Keystone Connect',
  description: 'Premium contractor matchmaking for high-ticket residential projects.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
