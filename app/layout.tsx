import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Treino',
  description: 'Treino',
  icons: {
    icon: '/favicon.ico',
    apple: [
      { url: '/icon-apple-touch-180x180.png' }
    ]
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ... existing code ... */}
        
        {/* Favicon tradicional */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* Para iOS (Apple) */}
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icon-167x167.png" />
        
        {/* Para Android */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Nome do seu App" />
        
        {/* Adicione estas novas meta tags */}
        <link rel="apple-touch-icon" href="/icon-apple-touch-180x180.png" />
        <link rel="apple-touch-startup-image" href="/icon-apple-touch-180x180.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}