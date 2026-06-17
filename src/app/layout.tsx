import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AmanahHaji — Pelaksanaan Badal Haji Telus & Bertauliah",
  description:
    "AmanahHaji — Perkhidmatan pelaksanaan Badal Haji yang telus, bertauliah dan direkodkan sepenuhnya bagi ketenangan hati keluarga.",
  openGraph: {
    title: "AmanahHaji — Pelaksanaan Badal Haji Telus & Bertauliah",
    description:
      "Kami melaksanakan ibadah haji bagi pihak ahli keluarga yang telah kembali ke rahmatullah — direkodkan sepenuhnya dan disertakan sijil pengesahan rasmi.",
    siteName: "AmanahHaji",
    locale: "ms_MY",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AmanahHaji — Pelaksanaan Badal Haji Telus & Bertauliah",
    description:
      "Kami melaksanakan ibadah haji bagi pihak ahli keluarga yang telah kembali ke rahmatullah — direkodkan sepenuhnya dan disertakan sijil pengesahan rasmi.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ms">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
