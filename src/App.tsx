import React, { useState } from 'react';
import Header from './components/Header';
import MasonryGrid from './components/MasonryGrid';
import { searchPins } from './utils/searchUtils';
import { AuthProvider } from './context/AuthContext';
import { Pin } from './types';

// Sample data - in a real app, this would come from an API
const initialPins: Pin[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    title: 'Beautiful Landscape',
    author: 'Nature Photography',
    description: 'A stunning mountain landscape with a lake',
    bookmarks: 245,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Delicious Breakfast',
    author: 'Food Stories',
    description: 'Healthy breakfast with fruits',
    bookmarks: 189,
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    title: 'Red Sneakers',
    author: 'Shoe Design',
    description: 'Classic red sneakers on white',
    bookmarks: 567,
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f',
    title: 'Modern Interior',
    author: 'Home Decor',
    description: 'Minimalist living room design',
    bookmarks: 890,
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e',
    title: 'Cute Dog',
    author: 'Pet Lovers',
    description: 'Golden retriever puppy',
    bookmarks: 1234,
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    title: 'Mountain Vista',
    author: 'Travel Diary',
    description: 'Foggy mountain peaks at sunrise',
    bookmarks: 432,
  },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredPins = searchPins(initialPins, searchTerm);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-white">
        <Header searchTerm={searchTerm} onSearch={setSearchTerm} />
        <main className="max-w-[2000px] mx-auto">
          <MasonryGrid pins={filteredPins} />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;