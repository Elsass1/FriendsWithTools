'use client';
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

const SearchBar = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [results, setResults] = useState([]);

  const handleSearch = useDebouncedCallback((query) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('query', query);
      fetchResults(query);
    } else {
      params.delete('query');
      setResults([]);
    }
    router.replace(`${pathName}?${params.toString()}`);
  }, 500);

  const fetchResults = async (query) => {
    try {
      const response = await fetch(`/api/search?query=${query}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  useEffect(() => {
    if (query) {
      fetchResults(query);
    }
  }, [query]);

  return (
    <div className='flex flex-col items-center pt-6 pb-6 inset-x-0 top-0 fixed bg-white z-40 mb-5'>
      <div className='relative flex items-center justify-center w-11/12'>
        <MagnifyingGlassIcon className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform stroke-2 cursor-pointer' />
        <Input
          onChange={(event) => {
            setQuery(event.target.value);
            handleSearch(event.target.value);
          }}
          defaultValue={query}
          placeholder='What do you wish to rent?'
          className='shadow-md pl-10 focus-visible:ring-offset-0 focus-visible:ring-0 rounded-3xl h-12 cursor-pointer'
        />
      </div>
      <ul className='mt-4 w-11/12 bg-white shadow-md rounded-md'>
        {results.map((result, index) => (
          <li key={index} className='p-2 border-b last:border-none'>
            {result.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
