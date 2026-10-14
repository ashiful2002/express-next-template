import { AppFooter } from "@/src/components/shared/app-footer"
import { AppNavbar } from "@/src/components/shared/app-navbar"

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <AppNavbar />
      <div className="container mx-auto">{children}</div>
      <AppFooter />
    </>
  )
}
