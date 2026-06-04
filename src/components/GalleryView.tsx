import React, { useState, useMemo } from 'react';
import { GalleryItem } from '../types';
import { GalleryCard } from './Cards';
import { Image, X, ZoomIn, Calendar, User, Download, Check } from 'lucide-react';

interface GalleryViewProps {
  galleryItems: GalleryItem[];
}

export default function GalleryView({ galleryItems }: GalleryViewProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [zoomedItem, setZoomedItem] = useState<GalleryItem | null>(null);
  const [downloadSuccessItem, setDownloadSuccessItem] = useState<string | null>(null);

  const categories = ['All', 'Hardware', 'CAD', 'Visualizer', 'Field Test'];

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return galleryItems;
    return galleryItems.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());
  }, [galleryItems, selectedCategory]);

  const handleDownload = (title: string) => {
    setDownloadSuccessItem(title);
    setTimeout(() => {
      setDownloadSuccessItem(null);
    }, 3000);
  };

  return (
    <div className="space-y-8 pb-16 font-sans">
      {/* Page Header */}
      <div className="border-b border-slate-205 dark:border-slate-800/80 pb-5">
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-50 flex items-center gap-2">
          <Image className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          Technical Diagrams & Hardware Scan Gallery
        </h1>
        <p className="text-xs text-slate-505 dark:text-slate-400 mt-1 leading-relaxed">
          High-definition CAD blueprints, physical circuit board trace designs, and live field telemetry setups.
        </p>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap gap-2 pt-1">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs px-4 py-2 font-bold tracking-wide rounded-full border transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-slate-900 border-slate-950 text-white dark:bg-white dark:border-white dark:text-slate-950 shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-650 dark:text-slate-300 border-slate-205 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GALLERY MATRIX GRID */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <GalleryCard
              key={item.id}
              item={item}
              onClick={() => setZoomedItem(item)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-slate-200 dark:border-slate-805 rounded-2xl font-mono text-xs text-slate-500">
          No engineering designs matching active filters.
        </div>
      )}

      {/* HIGH-FIDELITY ZOOM MODAL OVERLAY */}
      {zoomedItem && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => { setZoomedItem(null); setDownloadSuccessItem(null); }}
        >
          <div 
            className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => { setZoomedItem(null); setDownloadSuccessItem(null); }}
              className="absolute top-4 right-4 p-2 bg-slate-950/80 hover:bg-slate-950 text-white hover:text-red-500 rounded-full border border-slate-800 transition-colors cursor-pointer z-10"
              title="Close Scan"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* Image box */}
              <div className="md:col-span-8 bg-slate-950 flex items-center justify-center aspect-video sm:aspect-auto">
                <img
                  src={zoomedItem.imageUrl}
                  alt={zoomedItem.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[70vh] object-contain w-full"
                />
              </div>

              {/* Technical description details */}
              <div className="md:col-span-4 p-6 sm:p-8 text-slate-300 flex flex-col justify-between space-y-6">
                <div className="space-y-4 text-left">
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold tracking-widest bg-white/10 px-2 py-0.5 rounded border border-white/5 text-blue-300">
                      {zoomedItem.category}
                    </span>
                    <h2 className="text-md font-bold text-white mt-3 font-sans leading-snug">{zoomedItem.title}</h2>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans font-medium">
                    {zoomedItem.description}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-800 text-left">
                  <div className="space-y-2 text-[11px] font-mono text-slate-500">
                    <p className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Contributor: <strong className="text-slate-300 font-medium">{zoomedItem.contributor}</strong></span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Release Date: <strong className="text-slate-300 font-medium">{zoomedItem.date}</strong></span>
                    </p>
                  </div>

                  {downloadSuccessItem === zoomedItem.title ? (
                    <div className="w-full py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold font-sans tracking-wide flex items-center justify-center gap-2 transition-all">
                      <Check className="w-4 h-4 text-white" /> CAD Package Deployed!
                    </div>
                  ) : (
                    <button
                      onClick={() => handleDownload(zoomedItem.title)}
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold font-sans tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4" /> Download CAD file
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
