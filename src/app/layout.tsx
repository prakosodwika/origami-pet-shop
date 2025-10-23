import type { Metadata } from "next";
import { Poppins, Nunito_Sans } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", 
    "400", "500", "600", 
    "700", "800", "900"],
  variable: "--font-poppins",
});

const nunito = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", 
    "400", "500", "600", 
    "700", "800", "900"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Petify e-commers",
  description: "Petify e-commers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${nunito.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
