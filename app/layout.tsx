import type { Metadata } from "next";
import { Manrope, Oxanium } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const oxanium = Oxanium({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-oxanium",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gavions",
  description: "Sistema inteligente de segurança e monitoramento.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${oxanium.variable}`}>
      <body>{children}</body>
    </html>
  );
}
