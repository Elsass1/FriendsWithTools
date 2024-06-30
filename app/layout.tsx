import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

import { CategoriesStoreProvider } from './lib/providers/categories-store-provider';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FriendsWithTools - Share your tools',
  description: 'Rent tools from your neighbors',
};

export default function RootLayout ({
  children,
}:{
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='h-full'>
      <body className={`${roboto.className}, h-full`}>
        <CategoriesStoreProvider>{children}</CategoriesStoreProvider>
      </body>
    </html>
  );
}