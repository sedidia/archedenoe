import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Importations Bootstrap et autres
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ARCHE DE NOE",
  description: "ARCHER DE NOE est une chorale bien structurée et oeuvrant dans la paroisse LA SENTINELLE de la 30eme Communauté Pentecôtiste au Congo CPCO en sigle. Elle est différente d'un groupe des chantres indépendants.",
  icons: {
    icon: '/favicon.PNG', // Chemin vers le fichier dans le dossier public
  },
};

// LA CORRECTION EST ICI :
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}