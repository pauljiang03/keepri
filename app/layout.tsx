import type { Metadata } from 'next';
import './globals.css';
import { asset, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'KeepRI | Independent reasoning in the age of AI',
  description:
    'Practice independent thought without AI. Free reasoning games, competition and planned prizes for players. Consented human learning data for industry. Closed beta.',
  alternates: { canonical: siteUrl },
  icons: {
    icon: asset('/assets/keepri-brand/icon.png'),
    apple: asset('/assets/keepri-brand/icon.png'),
  },
  openGraph: {
    title: 'KeepRI | Independent reasoning in the age of AI',
    description:
      'Independent thought without AI. Competition and planned prizes for players. Consented human learning data for industry. Closed beta.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'KeepRI | Independent reasoning in the age of AI',
    description:
      'Independent thought without AI. Competition and planned prizes for players. Consented human learning data for industry. Closed beta.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
