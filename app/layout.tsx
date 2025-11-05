import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Why Unicorns Are Awesome',
  description: 'Discover why unicorns are the most magical fantasy creatures',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
