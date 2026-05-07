import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GetPriced — Free AI Spend Audit for Startups',
  description:
    'GetPriced is a free AI spend audit tool for startup founders and engineering managers. Identify overspending on AI tools like Cursor, Claude, and ChatGPT. Get actionable alternatives and save up to 62% on your monthly AI bills.',
  keywords: [
    'AI spend audit',
    'startup cost optimization',
    'Cursor alternative',
    'ChatGPT cheaper alternative',
    'Claude pricing',
    'AI tool cost',
    'engineering manager tools',
    'SaaS cost reduction',
  ],
  openGraph: {
    title: 'GetPriced — Free AI Spend Audit for Startups',
    description: 'Find out if you\'re overpaying for AI tools. Free audit, 60 seconds, no credit card.',
    type: 'website',
    url: 'https://getpriced.ai',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GetPriced — Free AI Spend Audit for Startups',
    description: 'Find out if you\'re overpaying for AI tools. Free audit, 60 seconds, no credit card.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise-overlay antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
