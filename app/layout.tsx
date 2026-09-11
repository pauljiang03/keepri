import type { Metadata } from 'next';
import './globals.css';
import { asset, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'KeepRI | Independent reasoning in the age of AI',
  description:
    'KeepRI is building free reasoning games and a new foundation for human learning research. Currently in closed beta.',
  alternates: { canonical: siteUrl },
  icons: {
    icon: asset('/assets/keepri-brand/icon.png'),
    apple: asset('/assets/keepri-brand/icon.png'),
  },
  openGraph: {
    title: 'KeepRI | Independent reasoning in the age of AI',
    description:
      'Free reasoning games. Human learning research. Currently in closed beta.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'KeepRI | Independent reasoning in the age of AI',
    description:
      'Free reasoning games. Human learning research. Currently in closed beta.',
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
