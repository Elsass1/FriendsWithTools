import CategoriesCarousel from '@/app/components/CategoriesCarousel';
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
    <div >
      <div className='fixed z-40 flex flex-row justify-center bg-white w-full px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col sm:flex-row items-center justify-center w-full max-w-screen-lg mx-auto space-y-4 sm:space-y-0 sm:space-x-4'>
          <div className='w-full sm:w-2/3 lg:w-1/2'>
            <SearchBar/>
          </div>

          <CategoriesCarousel/>
        </div>
      </div>


      {children}
    </div>
  );
}