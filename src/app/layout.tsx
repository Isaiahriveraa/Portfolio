import type { Metadata } from "next";
import { Archivo, Space_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MotionProvider } from "@/components/common/MotionProvider";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-sans",
  subsets: ["latin"],
  axes: ["wdth"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Yonie Isaiah Rivera-Aguilar | Software Engineer",
  description:
    "Portfolio of Yonie Isaiah Rivera-Aguilar, a software engineer showcasing projects and skills.",
  keywords: ["Software Engineer", "React", "Next.js", "TypeScript", "Portfolio"],
  authors: [{ name: "Yonie Isaiah Rivera-Aguilar" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${spaceMono.variable} antialiased`}>
        <MotionProvider>
          <Header />
          <main id="top">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
