import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "David Andrade | Full Stack Developer",
  description:
    "Portfolio de David Andrade - Desenvolvedor Full Stack apaixonado por tecnologia. Transformando ideias em experiencias digitais modernas.",
  keywords: [
    "David Andrade",
    "Full Stack Developer",
    "Desenvolvedor",
    "Portfolio",
    "React",
    "TypeScript",
    "Next.js",
    "Node.js",
  ],
  authors: [{ name: "David Andrade" }],
  openGraph: {
    title: "David Andrade | Full Stack Developer",
    description: "Transformando ideias em experiencias digitais modernas.",
    type: "website",
    locale: "pt_BR",
    siteName: "David Andrade Portfolio",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}
    >
      <body className="bg-[#0a0a1a] text-[#ededed] min-h-screen">
        {children}
      </body>
    </html>
  );
}
