import React from 'react';
import Pin from './Pin';

interface Pin {
  id: number;
  image: string;
  title: string;
  author: string;
  description?: string;
}

interface MasonryGridProps {
  pins: Pin[];
}

export default function MasonryGrid({ pins }: MasonryGridProps) {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 p-4">
      {pins.map((pin) => (
        <Pin key={pin.id} {...pin} />
      ))}
    </div>
  );
}