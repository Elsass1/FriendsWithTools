import SearchBar from '@/app/components/SearchBar';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

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
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SearchBar />
      {children}
    </div>
  );
}