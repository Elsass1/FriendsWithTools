'use client';
import React from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ToolCard, ToolsReviews } from '../../lib/types';
import { useRouter, useSearchParams } from 'next/navigation';
import ToolCardComponent from '../../components/ToolCard';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Input } from '@/components/ui/input';

const ToolsPage = ({searchParams}: {
  searchParams?: {query?: string}
}) => {
  const [tools, setTools] = useState<ToolCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState('');
  const [filteredTools, setFilteredTools] = useState<ToolCard[]>([]);
  const router = useRouter();
  // const searchParams = useSearchParams();
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch('/api/tools');
        const data: ToolCard[] = await response.json();
        setTools(data);
        setFilteredTools(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch tools:', error);
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  useEffect(() => { const filtered = tools.filter((tool) => tool.name.toLowerCase().includes(search.toLowerCase()) ); setFilteredTools(filtered); }, [search, tools]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // router.push(`/tools?query=${search}`);
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='flex justify-center pt-6 pb-6 inset-x-0 top-0 fixed bg-white z-40 mb-5'>
        <div className='relative flex items-center justify-center w-11/12  '>
          <MagnifyingGlassIcon className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform stroke-2 cursor-pointer' />
          <form onSubmit={handleSearch}>
            <Input
              onChange={(event) => setSearch(event.target.value)}
              value= {search}
              placeholder='What do you wish to rent?'
              className='shadow-md pl-10 focus-visible:ring-offset-0 focus-visible:ring-0 rounded-3xl h-12 cursor-pointer'
            />
            {/* <button className='bg-blue-50'>Search</button> */}
          </form>
        </div>

      </div>
      <div className='container mx-auto px-2 py-2'>
        <h1 className='text-2xl font-bold mb-4 text-center'>
        Discover Your Ideal Tool Here!
        </h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {filteredTools.map((tool) => (
            <div key={tool.id} className='tool-item'>
              <Link href={`/tools/${tool.id}`}>
                <ToolCardComponent tool={tool} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default ToolsPage;
