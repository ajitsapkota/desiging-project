import React from 'react';
import { User } from '../../types';
import { ExternalLink, MapPin, Calendar } from 'lucide-react';

interface PortfolioCardProps {
  user: User;
}

export default function PortfolioCard({ user }: PortfolioCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-500">
        {user.avatarUrl && (
          <img
            src={user.avatarUrl}
            alt={user.username}
            className="absolute -bottom-8 left-4 w-24 h-24 rounded-full border-4 border-white"
          />
        )}
      </div>
      
      <div className="pt-10 p-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">{user.username}</h2>
            <p className="text-gray-600">{user.bio}</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">
            Hire Me
          </button>
        </div>

        <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
          <span className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            Remote
          </span>
          <span className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            Available
          </span>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {user.skills?.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-between text-sm">
          <div>
            <span className="font-semibold">{user.followers}</span> followers
          </div>
          <div>
            <span className="font-semibold">{user.following}</span> following
          </div>
          <a href="#" className="text-blue-600 hover:underline flex items-center">
            View Portfolio
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}