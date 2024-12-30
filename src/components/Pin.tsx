import React, { useState } from 'react';
import { Heart, Download, MoreHorizontal, Eye, UserPlus } from 'lucide-react';
import { downloadImage } from '../utils/fileHandlers';
import { useAuth } from '../context/AuthContext';
import { Pin as PinType } from '../types';
import AuthModal from './auth/AuthModal';

interface PinProps extends PinType {}

export default function Pin({ 
  image, 
  title, 
  author, 
  description, 
  likes,
  views,
  isBookmarked = false 
}: PinProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isBookmarkedState, setIsBookmarkedState] = useState(isBookmarked);
  const [isFollowing, setIsFollowing] = useState(author.isFollowing);
  const { isAuthenticated } = useAuth();

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await downloadImage(image, title);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleBookmark = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setIsBookmarkedState(!isBookmarkedState);
  };

  const handleFollow = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <>
      <div 
        className="mb-4 break-inside-avoid"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative group rounded-xl overflow-hidden">
          <img
            src={`${image}?w=800&fit=crop`}
            alt={title}
            className="w-full object-cover rounded-xl"
          />
          {isHovered && (
            <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-200 flex flex-col justify-between p-4">
              <div className="flex justify-end space-x-2">
                <button 
                  className={`p-2 bg-gray-100 rounded-full hover:bg-white ${
                    isBookmarkedState ? 'bg-red-100' : ''
                  }`}
                  onClick={handleBookmark}
                >
                  <Heart 
                    className={`h-5 w-5 ${
                      isBookmarkedState ? 'text-red-600 fill-current' : 'text-gray-700'
                    }`} 
                  />
                </button>
                <button 
                  className={`p-2 bg-gray-100 rounded-full hover:bg-white ${
                    isDownloading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={handleDownload}
                  disabled={isDownloading}
                >
                  <Download className="h-5 w-5 text-gray-700" />
                </button>
                <button className="p-2 bg-gray-100 rounded-full hover:bg-white">
                  <MoreHorizontal className="h-5 w-5 text-gray-700" />
                </button>
              </div>
              <div>
                <button 
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-full font-semibold hover:bg-red-700"
                  onClick={handleBookmark}
                >
                  {isBookmarkedState ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="mt-2 px-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {author.avatarUrl ? (
                <img 
                  src={author.avatarUrl} 
                  alt={author.username}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200" />
              )}
              <div>
                <h3 className="font-semibold text-sm">{title}</h3>
                <p className="text-sm text-gray-500">{author.username}</p>
              </div>
            </div>
            <button
              onClick={handleFollow}
              className={`p-1.5 rounded-full flex items-center justify-center ${
                isFollowing 
                  ? 'bg-gray-100 text-gray-700' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <UserPlus className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <Heart className="h-4 w-4 mr-1" />
              {likes}
            </span>
            <span className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              {views}
            </span>
          </div>
        </div>
      </div>

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="signup"
      />
    </>
  );
}