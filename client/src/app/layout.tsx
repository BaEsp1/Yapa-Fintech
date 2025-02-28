import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Yapa - Inversiones",
  description: "El mejor lugar para hacer crecer tu dinero",
  keywords: "invest, save, money, growth, wealth",
  icons: {
    icon: [
      { rel: 'icon', url: '/favicon.ico', sizes: '16x16' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
