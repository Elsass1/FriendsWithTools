'use client';
import React, {useEffect} from 'react';
import { Input } from '@/components/ui/input';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useCategoriesStore } from '../lib/providers/categories-store-provider';
import { link } from 'fs';

const SearchBar = () => {

  const { categories, fetchCategories } = useCategoriesStore(
    (state) => state,
  );


  // useEffect(() => {
  //   fetchCategories();
  // }, [fetchCategories]);

  useEffect(() => {
    if (categories.length > 0) {
      categories.forEach(category => console.log(category.categoryName));
    }
    console.log(categories);
  }, [categories]);




  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const handleChange = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) params.set('query', query);
    else params.delete('query');

    router.replace(`${pathName}?${params.toString()}`);
  }, 500);

  return (
    <div className='flex justify-center pt-6 pb-6 inset-x-0 top-0 fixed bg-white z-40 mb-5'>
      <div className='relative flex items-center justify-center w-11/12  '>
        <MagnifyingGlassIcon className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform stroke-2 cursor-pointer' />
        <Input
          onChange={(event) => handleChange(event.target.value)}
          defaultValue={searchParams.get('query')?.toString()}
          placeholder='What do you wish to rent?'
          className='shadow-md pl-10 focus-visible:ring-offset-0 focus-visible:ring-0 rounded-3xl h-12 cursor-pointer'
        />
      </div>
      <div>
        <h1>Categories:</h1>
      </div>
      <ul>
        {categories.map((category) => (<li key={category.id}>{category.categoryName}</li>))}
      </ul>
    </div>
  );
};

export default SearchBar;
