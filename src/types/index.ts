export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  followers?: number;
  following?: number;
  isFollowing?: boolean;
  portfolio?: Portfolio;
  skills?: string[];
  availability?: 'available' | 'busy' | 'not-available';
}

export interface Portfolio {
  id: string;
  userId: string;
  title: string;
  description: string;
  projects: Project[];
  skills: string[];
  experience: Experience[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  tags: string[];
  likes: number;
  views: number;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  skills: string[];
  type: 'full-time' | 'part-time' | 'contract' | 'freelance';
  location: string;
  remote: boolean;
  postedAt: string;
  deadline?: string;
}

export interface Pin {
  id: number;
  image: string;
  title: string;
  author: {
    id: string;
    username: string;
    avatarUrl?: string;
    isFollowing?: boolean;
  };
  description?: string;
  likes: number;
  views: number;
  bookmarks: number;
  isBookmarked?: boolean;
  createdAt: string;
}