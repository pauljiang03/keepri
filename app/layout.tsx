import type { Metadata } from 'next';
import './globals.css';
import { asset, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'KeepRI | Independent reasoning in the age of AI',
  description:
    'A place to practice independent thought without AI. Closed beta. Human learning research in development.',
  alternates: { canonical: siteUrl },
  icons: {
    icon: asset('/assets/keepri-brand/icon.png'),
    apple: asset('/assets/keepri-brand/icon.png'),
  },
  openGraph: {
    title: 'KeepRI | Independent reasoning in the age of AI',
    description:
      'A place to practice independent thought without AI. Closed beta. Human learning research in development.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'KeepRI | Independent reasoning in the age of AI',
    description:
      'A place to practice independent thought without AI. Closed beta. Human learning research in development.',
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
            __html: `try{document.documentElement.dataset.intro=(location.hash&&location.hash!=='#top')||matchMedia('(prefers-reduced-motion: reduce)').matches||sessionStorage.getItem('keepri:opening-seen:v3')==='1'?'seen':'active'}catch(e){document.documentElement.dataset.intro='active'}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
