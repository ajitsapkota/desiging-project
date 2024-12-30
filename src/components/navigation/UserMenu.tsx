import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut, HelpCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AuthModal from '../auth/AuthModal';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isAuthenticated) {
    return (
      <>
        <button
          onClick={() => setShowAuthModal(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-700"
        >
          Log in
        </button>
        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode="login"
        />
      </>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full"
      >
        {user?.avatarUrl ? (
          <img src={user.avatarUrl} alt={user.username} className="w-6 h-6 rounded-full" />
        ) : (
          <User className="h-6 w-6 text-gray-600" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 z-50">
          <div className="px-4 py-2 border-b">
            <p className="text-sm font-semibold">{user?.username}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          
          <div className="py-1">
            <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </button>
            <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center">
              <HelpCircle className="h-4 w-4 mr-2" />
              Help
            </button>
            <button 
              onClick={logout}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center text-red-600"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}