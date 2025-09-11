import "./globals.css";
import { Inter } from "next/font/google";
import ScrollProvider from "@/components/ScrollProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Attendify — Attendance that proves presence",
  description: "GPS + IoT precision, device binding, ERP automation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* ⛔ No <header>, <main>, <footer> here */}
      <body className={`${inter.variable} bg-white text-ink`}>
        <ScrollProvider>
          <Navbar />
          {children}
          <Footer />
        </ScrollProvider>
      </body>
    </html>
  );
}