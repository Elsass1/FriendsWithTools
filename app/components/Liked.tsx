'use client';
import React, { useState } from 'react';
import { ToolCard as ToolType } from '../lib/types';
import { HeartIcon } from '@heroicons/react/24/outline';

interface LikedProps {
  tool: ToolType; // Define the type of the 'tool' prop
}

const Liked = () => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLike = () => {
    setIsLiked(!isLiked); // Toggle the isLiked state
    if (!isLiked) {
      // addToWishlist(tool); // pass the tool to Withlist
    }
  };

  const addToWishlist = (tool: ToolType) => {
    console.log(`Adding ${tool} to wishlist`);
    // TODO wishlist.push(tool);
  };

  return (
    <div>
      <div
        className='absolute top-2 right-2 cursor-pointer text-2xl'
        onClick={handleLike}
      >
        {isLiked ? (
          <HeartIcon className='fill-current h-8 w-8 text-red-400' />
        ) : (
          <HeartIcon className='h-8 w-8 text-red-400' />
        )}
      </div>
    </div>
  );
};

export default Liked;
