export interface Article {
  id: string;
  title: string;
  category: 'Engineering' | 'IoT' | 'AI' | 'Software' | 'Embedded' | 'Rocketry';
  tags: string[];
  excerpt: string;
  content: string; // Markdown or detailed text
  coverImage: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  date: string;
  readingTime: string;
  trending: boolean;
  views: number;
  likes: number;
}

export interface Project {
  id: string;
  title: string;
  category: 'Rocket Telemetry' | 'IoT Systems' | 'AI Projects' | 'Web Applications' | 'Freelance Projects';
  tags: string[];
  description: string;
  content: string; // Detailed writeup
  coverImage: string;
  status: 'In Development' | 'Completed' | 'Active';
  metrics: {
    label: string;
    value: string;
  }[];
  gallery: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export interface Video {
  id: string;
  title: string;
  category: 'Tutorials' | 'Project Demonstrations' | 'Engineering Concepts' | 'Development Logs';
  tags: string[];
  thumbnail: string;
  duration: string;
  views: number;
  date: string;
  description: string;
  youtubeId: string; // Used to mock an active player state
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Hardware' | 'CAD' | 'Visualizer' | 'Field Test';
  description: string;
  imageUrl: string;
  contributor: string;
  date: string;
}

export interface Announcement {
  id: string;
  title: string;
  type: 'Events' | 'Competitions' | 'Workshops' | 'News';
  category: string;
  date: string;
  content: string;
  location: string;
  registrationUrl?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  specialty: string[];
  social: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}
