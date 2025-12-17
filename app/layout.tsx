import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ACCENDO - A Step Ahead",
  description: "Comfort That Moves With You. Discover our collection of stylish, comfortable footwear designed for your active lifestyle.",
  keywords: ["footwear", "slides", "sandals", "clogs", "comfort", "fashion", "ACCENDO"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
