import React from 'react';
import { MessageSquare, Users, Calendar } from 'lucide-react';

interface CollaborationProps {
  title: string;
  description: string;
  members: number;
  deadline: string;
  tags: string[];
}

export default function CollaborationCard({
  title,
  description,
  members,
  deadline,
  tags
}: CollaborationProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-gray-600">{description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-gray-100 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {members} members
          </span>
          <span className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {new Date(deadline).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="mt-4 flex space-x-3">
        <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center">
          <MessageSquare className="w-4 h-4 mr-2" />
          Join Discussion
        </button>
      </div>
    </div>
  );
}