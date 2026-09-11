import type { Metadata } from 'next';
import './globals.css';
import { asset, siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'KeepRI — Your mind. Your move.',
  description: 'Free reasoning games for the pleasure of figuring things out yourself. Join the KeepRI iPhone beta and discover our mission for independent thinking in the age of AI.',
  alternates: { canonical: siteUrl },
  icons: { icon: asset('/assets/keepri-brand/icon.png'), apple: asset('/assets/keepri-brand/icon.png') },
  openGraph: { title: 'KeepRI — Your mind. Your move.', description: 'Keep reasoning independently. Free games, fresh challenges, and the joy of discovery.', type: 'website', locale: 'en_US' },
  twitter: { card: 'summary', title: 'KeepRI — Your mind. Your move.', description: 'Free reasoning games. Fresh challenges. The joy of figuring it out yourself.' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
