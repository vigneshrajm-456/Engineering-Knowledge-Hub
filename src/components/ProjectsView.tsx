import React, { useState, useMemo } from 'react';
import { Project } from '../types';
import { ProjectCard } from './Cards';
import { Cpu, Search, CheckCircle2 } from 'lucide-react';

interface ProjectsViewProps {
  projects: Project[];
  onNavigateToPage: (page: string, id?: string) => void;
}

export default function ProjectsView({ projects, onNavigateToPage }: ProjectsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const categories = ['All', 'Rocket Telemetry', 'IoT Systems', 'AI Projects', 'Web Applications', 'Freelance Projects'];
  const statuses = ['All', 'Active', 'Completed', 'In Development'];

  const filteredProjects = useMemo(() => {
    return projects.filter(proj => {
      const matchesSearch = proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            proj.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || proj.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || proj.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [projects, searchQuery, selectedCategory, selectedStatus]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedStatus('All');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Page Header */}
      <div className="border-b border-slate-205 dark:border-slate-800/80 pb-5">
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-50 flex items-center gap-2 font-sans">
          <Cpu className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          Technical Specs & Deep System Designs
        </h1>
        <p className="text-xs text-slate-505 dark:text-slate-400 mt-1 leading-relaxed font-sans">
          Open-source schematics, hardware architectures, simulation metrics, and integration blueprints.
        </p>
      </div>

      {/* FILTER CONTROLS */}
      <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-205 dark:border-slate-805 space-y-4 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Search bar */}
          <div className="relative md:col-span-6">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search spec sheets, systems (e.g. STM32, Quaternions)..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 placeholder-slate-450 border border-slate-200/80 dark:border-slate-800 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors text-xs"
            />
          </div>

          {/* Categories select */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 px-3.5 py-2.5 border border-slate-200/80 dark:border-slate-800 rounded-xl focus:outline-none focus:border-blue-600"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'All' ? 'All Core Focuses' : cat}</option>
              ))}
            </select>
          </div>

          {/* Status select */}
          <div className="md:col-span-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 px-3.5 py-2.5 border border-slate-200/80 dark:border-slate-800 rounded-xl focus:outline-none focus:border-blue-600"
            >
              {statuses.map(st => (
                <option key={st} value={st}>{st === 'All' ? 'All Build States' : `State: ${st}`}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* RENDER GRID */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map(proj => (
            <ProjectCard
              key={proj.id}
              project={proj}
              onClick={() => onNavigateToPage('project-details', proj.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed border-slate-200 dark:border-slate-805 rounded-2xl font-mono text-xs text-slate-500">
          No system records align. Try clearing filters.
        </div>
      )}
    </div>
  );
}
