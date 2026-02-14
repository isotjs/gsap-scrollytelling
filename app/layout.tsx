import type { Metadata } from "next";
import { Anton, Playfair_Display, Space_Mono } from "next/font/google";
import "./globals.css";

const displayFont = Anton({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const bodyFont = Playfair_Display({
  variable: "--font-body",
  subsets: ["latin"],
});

const monoFont = Space_Mono({
  variable: "--font-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ThreadPilot | Launch Better T-Shirt Drops",
  description:
    "ThreadPilot helps apparel teams design, launch, and scale winning t-shirt drops.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
