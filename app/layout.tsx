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
            __html: `try{const skip=(location.hash&&location.hash!=='#top')||matchMedia('(prefers-reduced-motion: reduce)').matches||matchMedia('(max-height: 520px)').matches;document.documentElement.dataset.intro=skip?'seen':'active';if(!skip){history.scrollRestoration='manual';window.scrollTo(0,0)}}catch(e){document.documentElement.dataset.intro='active'}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
