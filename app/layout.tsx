import type React from "react"
import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/contexts/auth-context"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "Tamil Nadu Digital Tourism Platform | Experience Beyond Places",
  description:
    "Discover the soul of Tamil Nadu - a digital gateway to culture, heritage, temples, cuisine, and authentic local experiences.",
  generator: "v0.app",
  keywords: ["Tamil Nadu", "Tourism", "Culture", "Heritage", "Temples", "Cuisine", "Travel", "India"],
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

import { ChatWidget } from "@/components/chat-widget"

// ... imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          <ChatWidget />
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
