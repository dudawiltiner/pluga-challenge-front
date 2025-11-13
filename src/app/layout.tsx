import type { Metadata } from 'next';

import '../styles/globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Pluga Challenge Front',
  description: 'Desafio técnico da Pluga - Lista de apps integrados',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
