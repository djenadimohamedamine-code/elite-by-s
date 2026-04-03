import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elite By S | Réservation Salon de Beauté",
  description: "Réservez votre séance de beauté chez Elite By S. Coiffure, Soins, Maquillage.",
  manifest: "/manifest.json",
  themeColor: "#0a0a0a",
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
