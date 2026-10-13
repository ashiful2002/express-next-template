import { Geist, Geist_Mono, Inter, Roboto } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/src/components/theme-provider"
import { AuthProvider } from "@/src/context/auth-context"
import { cn } from "@/src/lib/utils"

const robotoHeading = Roboto({subsets:['latin'],variable:'--font-heading'});

const inter = Inter({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable, robotoHeading.variable)}
    >
      <body>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
