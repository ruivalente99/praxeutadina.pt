import { Playfair_Display, Vollkorn } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import dynamic from 'next/dynamic'
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const vollkorn = Vollkorn({
  subsets: ['latin'],
  variable: '--font-vollkorn',
})

// Dynamically import components that use client-side features
const Header = dynamic(() => import('@/components/layout/header'), {
  ssr: false
})

const Footer = dynamic(() => import('@/components/layout/footer'), {
  ssr: false
})

export const metadata = {
  title: 'Praxe UTADINA',
  description: 'Tradições Académicas da UTAD',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={`${playfair.variable} ${vollkorn.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="root"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}