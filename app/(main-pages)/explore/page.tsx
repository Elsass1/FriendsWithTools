'use client';
import React from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ToolCard, ToolsReviews } from '../../lib/types';
import ToolCardComponent from '../../components/ToolCard';

const ToolsPage = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };

}) => {
  const [tools, setTools] = useState<ToolCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const query = searchParams?.query || '';

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch(`/api/tools?query=${query}`);
        console.log(response);
        const data: ToolCard[] = await response.json();
        setTools(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch tools:', error);
        setLoading(false);
      }
    };

    fetchTools();
  }, [query]);


  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch(`/api/search?query=${query}`);
        const data: ToolCard[] = await response.json();
        setTools(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch tools:', error);
        setLoading(false);
      }
    };

    fetchTools();
  }, [query]);




  if (loading) {
    return <div>Loading...</div>;
  }

  // const query = searchParams?.query || '';
  // console.log('query', query);
  return (
    <div className='container mx-auto px-2 py-2'>
      <h1 className='text-2xl font-bold mb-4 text-center'>
        Discover Your Ideal Tool Here!
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {tools.map((tool) => (
          <div key={tool.id} className='tool-item'>
            <Link href={`/tools/${tool.id}`}>
              <ToolCardComponent
                tool={tool}
                query={query}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ToolsPage;
