import React, { useState } from 'react';
import SearchBar from './SearchBar';
import UploadModal from './UploadModal';
import Logo from './navigation/Logo';
import NavActions from './navigation/NavActions';
import UserMenu from './navigation/UserMenu';

interface HeaderProps {
  searchTerm: string;
  onSearch: (value: string) => void;
}

export default function Header({ searchTerm, onSearch }: HeaderProps) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleUpload = async (data: { file: File; title: string; description: string }) => {
    console.log('Uploading:', data);
    alert('Upload functionality would be implemented here with a backend service');
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center flex-1">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Logo />
                <button className="bg-black text-white px-3 py-1.5 sm:px-4 sm:py-2 text-sm rounded-full font-semibold whitespace-nowrap">
                  Home
                </button>
                <button 
                  className="text-gray-700 px-3 py-1.5 sm:px-4 sm:py-2 text-sm rounded-full font-semibold hover:bg-gray-100 whitespace-nowrap hidden sm:block"
                  onClick={() => setIsUploadModalOpen(true)}
                >
                  Create
                </button>
              </div>
              
              <div className="flex-1 px-2 sm:px-4 max-w-2xl mx-auto">
                <SearchBar 
                  value={searchTerm}
                  onChange={onSearch}
                  placeholder="Search for pins, people, or boards"
                />
              </div>
            </div>

            <div className="flex items-center space-x-1 sm:space-x-2 ml-2">
              <button 
                className="sm:hidden p-2 hover:bg-gray-100 rounded-full"
                onClick={() => setIsUploadModalOpen(true)}
                title="Create"
              >
                <span className="block w-5 h-5 bg-gray-600 rounded-full" />
              </button>
              <NavActions />
              <UserMenu username="John Doe" />
            </div>
          </div>
        </div>
      </header>

      <UploadModal 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUpload}
      />
    </>
  );
}