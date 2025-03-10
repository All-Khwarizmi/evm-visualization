import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "EVM Visualizer",
  description: "Interactive tool for visualizing EVM transactions and smart contract execution",
  openGraph: {
    type: "website",
    url: "https://evm-visualizer.example.com",
    title: "EVM Visualizer",
    description: "Interactive tool for visualizing EVM transactions and smart contract execution",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Capture%20d%E2%80%99e%CC%81cran%202025-03-10%20a%CC%80%2018.43.07-ymWPCoozDykZ5GfQTOxEHFjjtwFBC7.png",
        width: 1200,
        height: 630,
        alt: "EVM Visualizer",
      },
    ],
  },
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}



