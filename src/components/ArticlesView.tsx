import React, { useState, useMemo } from 'react';
import { Article } from '../types';
import { ArticleCard } from './Cards';
import { Search, Tag, BookOpen, Heart, SlidersHorizontal, CheckCircle2, RefreshCw } from 'lucide-react';

interface ArticlesViewProps {
  articles: Article[];
  bookmarkedIds: string[];
  onToggleBookmark: (e: React.MouseEvent, id: string) => void;
  onNavigateToPage: (page: string, id?: string) => void;
}

export default function ArticlesView({
  articles,
  bookmarkedIds,
  onToggleBookmark,
  onNavigateToPage
}: ArticlesViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const itemsPerPage = 6;

  const categories = ['All', 'Engineering', 'IoT', 'AI', 'Software', 'Embedded', 'Rocketry'];

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    articles.forEach(art => art.tags.forEach(t => tags.add(t)));
    return ['All', ...Array.from(tags)];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter(art => {
      const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
      const matchesTag = selectedTag === 'All' || art.tags.includes(selectedTag);
      const matchesBookmarks = !showOnlyBookmarks || bookmarkedIds.includes(art.id);

      return matchesSearch && matchesCategory && matchesTag && matchesBookmarks;
    });
  }, [articles, searchQuery, selectedCategory, selectedTag, showOnlyBookmarks, bookmarkedIds]);

  // Pagination bounds
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage) || 1;
  const paginatedArticles = useMemo(() => {
    const start = (currentPageNum - 1) * itemsPerPage;
    return filteredArticles.slice(start, start + itemsPerPage);
  }, [filteredArticles, currentPageNum]);

  const handleCategoryChoice = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPageNum(1);
  };

  const handleTagChoice = (tag: string) => {
    setSelectedTag(tag);
    setCurrentPageNum(1);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedTag('All');
    setShowOnlyBookmarks(false);
    setCurrentPageNum(1);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Page Header */}
      <div className="border-b border-slate-200 dark:border-slate-800/80 pb-5">
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-50 flex items-center gap-2 font-sans">
          <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          Technical Flight & IoT Articles
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed font-sans">
          Deep-dive documentation, schematic analyses, and practical development logs written for engineers by engineers.
        </p>
      </div>

      {/* SEARCH AND FILTERS PANEL */}
      <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-205 dark:border-slate-805 space-y-4 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Text Search Input */}
          <div className="relative md:col-span-6">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400 dark:text-slate-550" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPageNum(1); }}
              placeholder="Search by title, tags (e.g. Raw-WASM, Telemetry)..."
              className="w-full pl-10 pr-4 py-2 bg-xs sm:text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 border border-slate-200/80 dark:border-slate-800 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
            />
          </div>

          {/* Category Dropdown (Compact for mobile) */}
          <div className="relative md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChoice(e.target.value)}
              className="w-full text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-55 px-3.5 py-2.5 border border-slate-200/80 dark:border-slate-800 rounded-xl focus:outline-none focus:border-blue-600"
            >
              <option disabled>Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
              ))}
            </select>
          </div>

          {/* Bookmark Toggle Badge */}
          <button
            onClick={() => { setShowOnlyBookmarks(!showOnlyBookmarks); setCurrentPageNum(1); }}
            className={`w-full md:col-span-3 flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-xs border rounded-xl font-bold transition-all ${
              showOnlyBookmarks
                ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/20 dark:border-rose-900/40 dark:text-rose-450'
                : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-655 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-850'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${showOnlyBookmarks ? 'fill-current' : ''}`} />
            {showOnlyBookmarks ? 'Showing Bookmarked' : 'Show Bookmarked'}
            {bookmarkedIds.length > 0 && (
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200">
                {bookmarkedIds.length}
              </span>
            )}
          </button>
        </div>

        {/* Tags Quick Filter Grid */}
        <div className="flex flex-wrap gap-1.5 items-center pt-2 border-t border-slate-200/40 dark:border-slate-800/60">
          <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase mr-2 flex items-center gap-1">
            <SlidersHorizontal className="w-3 h-3" /> Quick Tags:
          </span>
          {allTags.slice(0, 10).map(tag => (
            <button
              key={tag}
              onClick={() => handleTagChoice(tag)}
              className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded-md border transition-all ${
                selectedTag === tag
                  ? 'bg-blue-600 border-blue-500 text-white font-bold shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-350 border-slate-205 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-705'
              }`}
            >
              {tag === 'All' ? 'All Tags' : `#${tag}`}
            </button>
          ))}
          {(searchQuery || selectedCategory !== 'All' || selectedTag !== 'All' || showOnlyBookmarks) && (
            <button
              onClick={resetFilters}
              className="text-[10px] font-mono text-rose-600 hover:text-rose-500 dark:text-rose-450 flex items-center gap-1 ml-auto font-bold pl-2"
            >
              <RefreshCw className="w-3 h-3" /> Filter Reset
            </button>
          )}
        </div>
      </div>

      {/* ARTICLES RESULTS MATRIX */}
      {paginatedArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedArticles.map(art => (
            <ArticleCard
              key={art.id}
              article={art}
              isBookmarked={bookmarkedIds.includes(art.id)}
              onToggleBookmark={onToggleBookmark}
              onClick={() => onNavigateToPage('article-details', art.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
          <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
            No matching engineering guidelines found. Try clearing active filters.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-500 transition-colors cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* CORE PAGINATION COMPONENT */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6 border-t border-slate-200 dark:border-slate-800/60 font-mono">
          <button
            onClick={() => setCurrentPageNum(prev => Math.max(1, prev - 1))}
            disabled={currentPageNum === 1}
            className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map(num => (
            <button
              key={num}
              onClick={() => setCurrentPageNum(num)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                currentPageNum === num
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-950 shadow-xs'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850'
              }`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => setCurrentPageNum(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPageNum === totalPages}
            className="px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
