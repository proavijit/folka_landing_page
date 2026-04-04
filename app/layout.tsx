import type { Metadata } from "next";
import { Inter, Funnel_Display } from "next/font/google";
import "./globals.css";

/* 🔥 Funnel Display font (Google Fonts) */
const funnelDisplay = Funnel_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-heading",
});

/* 🔥 Inter font (Google Fonts) */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

/* 🔥 Metadata */
export const metadata: Metadata = {
  title: "Floka Clone",
  description: "Animated website clone",
};

/* 🔥 Layout Component */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${funnelDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}