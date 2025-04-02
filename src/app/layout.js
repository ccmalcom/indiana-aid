import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./ui/Nav";
import Footer from "./ui/Footer";

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Indiana AID",
  description: "Providing Advocacy, Resources, and Direct Aid",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-[100vh] flex flex-col`}
      >
        <Nav />
        <main className="flex-grow">

          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
