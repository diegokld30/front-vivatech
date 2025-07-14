/* app/layout.tsx */
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

/* ------------ META ------------ */
export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

/* ----------- LAYOUT ----------- */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="es">
      <head />
      {/* ① body → flex-col y min-h-screen  */}
      <body
        className={clsx(
          "min-h-screen flex flex-col bg-background font-sans antialiased text-foreground",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          {/* ─── Header fijo ─── */}
          <header className="fixed inset-x-0 top-0 z-50">
            <Navbar />
          </header>

          {/* ② main se expande para rellenar el espacio libre */}
          {/*    pt-20 = alto del header (ajusta si tu barra cambia)     */}
          <main className="flex-grow pt-20">{children}</main>

          {/* ─── Footer siempre al fondo ─── */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
