import { Geist_Mono, Inter, Roboto } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/src/components/theme-provider"
import { cn } from "@/src/lib/utils"
import { AppNavbar } from "../components/shared/app-navbar";
import { AppFooter } from "../components/shared/app-footer";

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
      <body suppressHydrationWarning>
        <ThemeProvider >
        
          {children}
             {/* <Toaster /> */}
   
        </ThemeProvider>
      </body>
    </html>
  )
}
