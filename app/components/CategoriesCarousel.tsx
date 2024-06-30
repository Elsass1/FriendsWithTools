import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// flex justify-center pt-6 pb-6 inset-x-0 top-0 bg-white fixed mb-5'

const CategoriesCarousel = () => {
  return (
    <div className=''>
      <Carousel

      >
        <CarouselContent>
          <CarouselItem>Alpha</CarouselItem>
          <CarouselItem>Bravo</CarouselItem>
          <CarouselItem>Charli</CarouselItem>
          <CarouselItem>Delta</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoriesCarousel;