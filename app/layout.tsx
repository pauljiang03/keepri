import type { Metadata } from 'next';
import './globals.css';
import { asset, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'KeepRI | Independent reasoning in the age of AI',
  description:
    'Independent judgment through learning and competition. Our vision: global leaderboards, significant prizes and human learning data. Closed beta; public competition and research in development.',
  alternates: { canonical: siteUrl },
  icons: {
    icon: asset('/assets/keepri-brand/icon.png'),
    apple: asset('/assets/keepri-brand/icon.png'),
  },
  openGraph: {
    title: 'KeepRI | Independent reasoning in the age of AI',
    description:
      'Independent judgment through learning and competition. Our vision: global leaderboards, significant prizes and human learning data. Closed beta; public competition and research in development.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'KeepRI | Independent reasoning in the age of AI',
    description:
      'Independent judgment through learning and competition. Our vision: global leaderboards, significant prizes and human learning data. Closed beta; public competition and research in development.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{document.documentElement.dataset.intro='active';history.scrollRestoration='manual';window.scrollTo(0,0);window.__keepriIntroFallback=setTimeout(function(){if(!document.documentElement.classList.contains('lenis')){delete document.documentElement.dataset.intro}},6500)}catch(e){delete document.documentElement.dataset.intro}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
