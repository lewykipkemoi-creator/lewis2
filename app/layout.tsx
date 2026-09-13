import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lewy AI — Stop losing customers to slow replies",
  description:
    "Lewy AI connects WhatsApp, Gmail, Instagram, Facebook, Telegram and your website into one system, answers customers instantly, and shows you exactly how much revenue it recovers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
