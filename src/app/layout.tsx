import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Achii Lanka Tours',
  description: 'Sri Lanka travel and tour enquiry platform.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
