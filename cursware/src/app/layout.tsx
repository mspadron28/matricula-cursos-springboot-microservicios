import type { Metadata } from "next";
import { lusitana } from "./ui/fonts";
import "./globals.css";
import Navbar from "./ui/Navbar";
import { Toaster } from "@/components/ui/toaster";


export const metadata: Metadata = {
  title: "Cursware",
  description: "A platform for learning and teaching",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
     <body className={`${lusitana.className} antialiased`}> 
      <Navbar />
     <main className="min-h-screen">{children}<Toaster /></main></body>
    </html>
  );
}
