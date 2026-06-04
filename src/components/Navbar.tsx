import React, { useState } from 'react';
import { useTheme } from './ThemeContext';
import { Sun, Moon, Cpu, Search, Menu, X, BookOpen, Layers, PlayCircle, Image, Bell, Info, Mail, Heart } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  bookmarkCount: number;
}

export default function Navbar({ currentPage, onPageChange, bookmarkCount }: NavbarProps) {
  const { darkMode, toggleDarkMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { id: 'home', label: 'Home', icon: Layers },
    { id: 'articles', label: 'Articles', icon: BookOpen },
    { id: 'projects', label: 'Projects', icon: Cpu },
    { id: 'videos', label: 'Videos', icon: PlayCircle },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'about', label: 'About & Team', icon: Info },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleNavClick = (pageId: string) => {
    onPageChange(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')} 
          className="flex items-center gap-2 cursor-pointer font-sans select-none"
        >
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shadow-xs">
            <Cpu className="w-4 h-4 text-white animate-pulse" />
          </div>
          <span className="font-bold tracking-tight text-xl text-slate-900 dark:text-white">
            ENG<span className="text-blue-600">HUB</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 h-full text-sm font-medium uppercase tracking-wider">
          {links.map(link => {
            const isActive = currentPage === link.id || (link.id === 'articles' && currentPage === 'article-details') || (link.id === 'projects' && currentPage === 'project-details') || (link.id === 'videos' && currentPage === 'video-details');
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative h-16 flex items-center px-1 border-b-2 text-xs font-semibold tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 font-extrabold'
                    : 'border-transparent text-slate-600 dark:text-slate-350 hover:text-slate-950 dark:hover:text-white hover:border-slate-300'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-3">
          {/* Bookmarks Quick Link */}
          <button
            onClick={() => handleNavClick('articles')} // Navigates to articles where they filter or see bookmarked
            className="relative p-2 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-450 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-all font-mono"
            title="Bookmarked Articles"
          >
            <Heart className={`w-4 h-4 ${bookmarkCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            {bookmarkCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold font-mono animate-bounce">
                {bookmarkCount}
              </span>
            )}
          </button>

          {/* Theme Toggler */}
          <button
            onClick={toggleDarkMode}
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-all"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Hamburger Menu (Mobile/Tablet) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-all"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-5 shadow-inner">
          <nav className="flex flex-col gap-1.5">
            {links.map(link => {
              const Icon = link.icon;
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-slate-105 dark:bg-slate-800 text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-slate-400 group-hover:text-slate-500" />
                  {link.label}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
