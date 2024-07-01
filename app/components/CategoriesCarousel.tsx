'use client';
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useCategoriesStore } from '../lib/providers/categories-store-provider';
import { useRouter } from 'next/navigation';


const CategoriesCarousel = () => {
  const {categories} = useCategoriesStore(
    (state) => state,
  );
  const router = useRouter();

  const handleCategoryClick = (categoryName: string | null) => {
    router.push(`/tools?category=${categoryName}`);
  };

  return (
    <div>
      <Carousel className="w-full"
      >
        <CarouselContent>
          {
            categories.map((category) =>(
              <CarouselItem key={category.id} className="text-darkGreen font-semibold  sm:basis-2/3 md:basis-1/2 lg:basis-1/3  cursor-pointer"
                onClick={() => handleCategoryClick(category.categoryName)}>{category.categoryName}</CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoriesCarousel;