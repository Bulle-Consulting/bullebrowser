import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { product } from '@bullebrowser/brand-tokens';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: product.name, template: `%s · ${product.name}` },
  description: product.tagline,
  metadataBase: new URL(`https://${product.domain}`),
  openGraph: {
    title: product.name,
    description: product.tagline,
    url: `https://${product.domain}`,
    siteName: product.name,
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="flex min-h-screen flex-col bg-surface-light text-ink-primary antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
