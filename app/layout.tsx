import type React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

// In your app/layout.tsx or equivalent file
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://evm-visualizer.vercel.app"),
  title: {
    template: "%s | EVM Visualizer",
    default:
      "EVM Visualizer - Interactive Ethereum Virtual Machine Visualization",
  },
  description:
    "EVM Visualizer is an interactive tool that helps developers and educators understand the Ethereum Virtual Machine through real-time visualization of transactions, stack operations, memory, storage, and state changes.",
  keywords:
    "EVM, Ethereum Virtual Machine, blockchain visualization, smart contracts, Ethereum, blockchain education, gas optimization, transaction flow, stack operations, blockchain development, web3 tools",
  openGraph: {
    title: {
      template: "%s | EVM Visualizer",
      default: "EVM Visualizer - See Inside the Ethereum Virtual Machine",
    },
    description:
      "An interactive visualization tool that reveals how the Ethereum Virtual Machine executes transactions and smart contracts, helping developers understand complex blockchain operations.",
    url: "https://evm-visualizer.vercel.app",
    siteName: "EVM Visualizer",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "EVM Visualizer - Interactive Ethereum Virtual Machine Tool",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: {
      template: "%s | EVM Visualizer",
      default: "EVM Visualizer - Interactive Ethereum Visualization",
    },
    description:
      "See inside the Ethereum Virtual Machine with this interactive visualization tool that shows how transactions and smart contracts execute step by step.",
    images: ["/images/og-image.png"],
    creator: "@swarecito",
    site: "@swarecito",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6366f1",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
