import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
