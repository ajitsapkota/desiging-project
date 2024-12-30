import React from 'react';
import { Job } from '../../types';
import { Clock, MapPin, DollarSign } from 'lucide-react';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-gray-600">{job.company}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${
          job.type === 'full-time' ? 'bg-green-100 text-green-800' :
          job.type === 'contract' ? 'bg-blue-100 text-blue-800' :
          'bg-purple-100 text-purple-800'
        }`}>
          {job.type}
        </span>
      </div>

      <div className="mt-4">
        <p className="text-gray-600 line-clamp-2">{job.description}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {job.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-gray-100 rounded-full text-sm"
          >
            {skill}
          </span>
        ))}
        {job.skills.length > 3 && (
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
            +{job.skills.length - 3} more
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {job.remote ? 'Remote' : job.location}
          </span>
          <span className="flex items-center">
            <DollarSign className="w-4 h-4 mr-1" />
            {job.budget.min}-{job.budget.max}k
          </span>
        </div>
        <span className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          {new Date(job.postedAt).toLocaleDateString()}
        </span>
      </div>

      <div className="mt-4 flex space-x-3">
        <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Apply Now
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          Save
        </button>
      </div>
    </div>
  );
}