import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MIMO-NDI | Djenadi Mohamed Amine — Broadcast Engineer & Developer",
  description: "Ingénieur broadcast à Echorouk TV. HLS, SRT, WebRTC, NDI SDK, PTZ Control, Flutter Apps, DaVinci Resolve, Étalonnage professionnel.",
  manifest: "/manifest.json",
  themeColor: "#080b14",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <main className="container animate-fade-in">
          {children}
        </main>
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js');
            });
          }
        `}} />
      </body>
    </html>
  );
}
