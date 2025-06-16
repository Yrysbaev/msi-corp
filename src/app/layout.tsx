import type { Metadata } from "next";
import { Montserrat, DM_Sans } from "next/font/google";
import "./globals.css";
import Navigation from './components/Navigation'

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MSI Corporation - Creative Services & Custom Products",
  description: "MSI Corporation offers custom products, videography/photography, and live cooking experiences. We create visionary works that connect, express, and inspire.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${dmSans.variable}`}>
      <body className="font-montserrat bg-deep-navy text-white pt-20">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
