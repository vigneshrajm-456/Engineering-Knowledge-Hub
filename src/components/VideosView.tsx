import React, { useState, useMemo } from 'react';
import { Video } from '../types';
import { VideoCard } from './Cards';
import { PlayCircle, Search } from 'lucide-react';

interface VideosViewProps {
  videos: Video[];
  onNavigateToPage: (page: string, id?: string) => void;
}

export default function VideosView({ videos, onNavigateToPage }: VideosViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Tutorials', 'Project Demonstrations', 'Engineering Concepts', 'Development Logs'];

  const filteredVideos = useMemo(() => {
    return videos.filter(vid => {
      const matchesSearch = vid.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            vid.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            vid.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || vid.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [videos, searchQuery, selectedCategory]);

  return (
    <div className="space-y-8 pb-16">
      {/* Page Header */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-5">
        <h1 className="text-3xl font-black text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
          <PlayCircle className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          Laboratory Video Guides & Demos
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
          Watch real-time oscilloscope test clips, field launch streams, and design logic explanations.
        </p>
      </div>

      {/* FILTER PANEL */}
      <div className="bg-neutral-50 dark:bg-neutral-950 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-850 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search */}
          <div className="relative md:col-span-8">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search video catalogs (e.g. Avionics, I2C)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:outline-none"
            />
          </div>

          {/* Category SELECT */}
          <div className="md:col-span-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs sm:text-sm bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 px-3.5 py-2.5 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:outline-none focus:border-indigo-600"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'All' ? 'All Video Series' : cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* VIDEO RESULTS */}
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map(vid => (
            <VideoCard
              key={vid.id}
              video={vid}
              onClick={() => onNavigateToPage('video-details', vid.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-2xl font-mono text-xs text-neutral-500">
          No video briefings register this search.
        </div>
      )}
    </div>
  );
}
