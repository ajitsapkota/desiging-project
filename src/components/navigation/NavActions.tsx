import React from 'react';
import { Bell, MessageCircle } from 'lucide-react';

export default function NavActions() {
  return (
    <div className="flex items-center space-x-1 sm:space-x-2">
      <button className="p-2 hover:bg-gray-100 rounded-full" title="Notifications">
        <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
      </button>
      <button className="p-2 hover:bg-gray-100 rounded-full" title="Messages">
        <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
      </button>
    </div>
  );
}