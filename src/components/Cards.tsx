import React, { useState } from 'react';
import { Article, Project, Video, GalleryItem, TeamMember } from '../types';
import { Bookmark, Clock, Eye, Heart, Github, ExternalLink, Linkedin, Mail, Play, Calendar, User, Tag, Share2, Target, CheckCircle2, Sliders, Check } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  isBookmarked: boolean;
  onToggleBookmark: (e: React.MouseEvent, id: string) => void;
  onClick: () => void;
  key?: any;
}

export function ArticleCard({ article, isBookmarked, onToggleBookmark, onClick }: ArticleCardProps) {
  const [likes, setLikes] = useState(article.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasLiked) {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    } else {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/#article-${article.id}`);
    setIsShared(true);
    setTimeout(() => {
      setIsShared(false);
    }, 2500);
  };

  const categoryColors: Record<string, string> = {
    Engineering: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200',
    IoT: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200',
    AI: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200',
    Software: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200',
    Embedded: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200',
    Rocketry: 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-200',
  };

  return (
    <div
      id={`article-card-${article.id}`}
      onClick={onClick}
      className="group cursor-pointer flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-805 rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:border-slate-350 dark:hover:border-slate-700 transition-all duration-300 h-full"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
        <img
          src={article.coverImage}
          alt={article.title}
          referrerPolicy="no-referrer"
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border ${categoryColors[article.category] || 'bg-slate-100'}`}>
            {article.category}
          </span>
          {article.trending && (
            <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-bold bg-blue-600 text-white shadow-xs">
              Trending
            </span>
          )}
        </div>
        <button
          onClick={(e) => onToggleBookmark(e, article.id)}
          className={`absolute top-3 right-3 p-2 bg-white/95 dark:bg-slate-950/90 rounded-full border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-rose-650 dark:hover:text-rose-400 shadow-xs hover:scale-105 transition-all duration-200`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-rose-500 text-rose-500 dark:fill-rose-450' : ''}`} />
        </button>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-2">
          <span className="flex items-center gap-1 font-mono">
            <Calendar className="w-3.5 h-3.5" />
            {article.date}
          </span>
          <span className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-800" />
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.readingTime}
          </span>
        </div>

        <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-2 line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {article.title}
        </h3>

        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 flex-1 leading-relaxed">
          {article.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {article.tags.map(tag => (
            <span key={tag} className="inline-flex items-center text-[10px] font-mono bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200/50 dark:border-slate-700/50">
              #{tag}
            </span>
          ))}
        </div>

        {/* Card Footer with Author and Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200/60 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-805"
            />
            <div className="leading-tight">
              <p className="text-xs font-semibold text-slate-850 dark:text-slate-200">
                {article.author.name}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                {article.author.role}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1" title="Views">
              <Eye className="w-3.5 h-3.5" />
              {article.views}
            </span>
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 hover:text-rose-500 transition-colors ${hasLiked ? 'text-rose-500 font-bold' : ''}`}
              title="Like Article"
            >
              <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-current' : ''}`} />
              {likes}
            </button>
            <button
              onClick={handleShare}
              className={`transition-colors p-1 rounded-sm ${isShared ? 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20' : 'hover:text-blue-500 hover:bg-slate-100 dark:hover:bg-slate-850'}`}
              title={isShared ? 'Copied link!' : 'Share'}
            >
              {isShared ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  key?: any;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const statusColors = {
    'In Development': 'bg-sky-50 text-sky-700 border-sky-250 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-900/60',
    'Completed': 'bg-emerald-50 text-emerald-700 border-emerald-250 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/60',
    'Active': 'bg-amber-50 text-amber-700 border-amber-250 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/60',
  };

  const statusIndicators = {
    'In Development': 'bg-sky-550 animate-pulse',
    'Completed': 'bg-emerald-500',
    'Active': 'bg-amber-500',
  };

  return (
    <div
      id={`project-card-${project.id}`}
      onClick={onClick}
      className="group cursor-pointer flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-805 rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:border-slate-350 dark:hover:border-slate-700 transition-all duration-300 h-full"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-slate-50 dark:bg-slate-950/60">
        <img
          src={project.coverImage}
          alt={project.title}
          referrerPolicy="no-referrer"
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 opacity-95 group-hover:opacity-100"
        />
        <div className="absolute top-3 left-3">
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-slate-900/90 text-white backdrop-blur-xs border border-white/10 shadow-xs">
            {project.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-xs shadow-xs ${statusColors[project.status]}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${statusIndicators[project.status]}`} />
            {project.status}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-slate-50 mb-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-xs text-slate-650 dark:text-slate-400 line-clamp-2 mb-4 flex-1 leading-relaxed">
          {project.description}
        </p>

        {/* Quick Tech Specs / Metrics */}
        <div className="bg-slate-50 dark:bg-slate-950 rounded-lg p-3 border border-slate-150 dark:border-slate-850/60 mb-4">
          <p className="text-[10px] uppercase font-mono text-slate-400 dark:text-slate-500 mb-2 tracking-wider flex items-center gap-1">
            <Target className="w-3 h-3 text-slate-500" /> System Metrics
          </p>
          <div className="grid grid-cols-3 gap-2">
            {project.metrics.slice(0, 3).map((metric, i) => (
              <div key={i} className="text-center leading-none border-r border-slate-200/50 dark:border-slate-800/50 last:border-r-0">
                <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">{metric.label}</p>
                <p className="text-[11px] font-mono font-bold text-slate-800 dark:text-slate-200 mt-1">{metric.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="inline-flex items-center text-[10px] font-mono bg-slate-100 dark:bg-slate-800/80 text-secondary dark:text-slate-350 px-2 py-0.5 rounded border border-slate-200/50 dark:border-slate-700/50">
              #{tag}
            </span>
          ))}
        </div>

        {/* Action icons */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-150 dark:border-slate-800 mt-auto text-xs text-slate-500">
          <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold group-hover:translate-x-1 transition-transform">
            Read Specs & Diagram &rarr;
          </span>
          <div className="flex gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
                title="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
                title="Live Demonstration"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface VideoCardProps {
  video: Video;
  onClick: () => void;
  key?: any;
}

export function VideoCard({ video, onClick }: VideoCardProps) {
  return (
    <div
      id={`video-card-${video.id}`}
      onClick={onClick}
      className="group cursor-pointer flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-805 rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:border-slate-350 dark:hover:border-slate-700 transition-all duration-300 h-full"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        <img
          src={video.thumbnail}
          alt={video.title}
          referrerPolicy="no-referrer"
          className="object-cover w-full h-full opacity-85 group-hover:opacity-100 group-hover:scale-102 transition-all duration-500"
        />
        {/* Play Icon Backdrop */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors duration-300">
          <div className="p-3 bg-slate-900/90 border border-white/20 text-white rounded-full group-hover:scale-110 shadow-lg group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300">
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </div>
        </div>
        {/* Duration Overlay */}
        <span className="absolute bottom-3 right-3 bg-slate-950/90 text-white border border-white/10 text-[10px] font-mono px-1.5 py-0.5 rounded-sm">
          {video.duration}
        </span>
        {/* Category */}
        <span className="absolute bottom-3 left-3 bg-blue-900/95 border border-blue-400/20 text-white text-[10px] font-mono px-2 py-0.5 rounded-sm">
          {video.category}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2 leading-snug line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {video.title}
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 flex-1">
          {video.description}
        </p>
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-3 border-t border-slate-150 dark:border-slate-800">
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" /> {video.views.toLocaleString()} views
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {video.date}
          </span>
        </div>
      </div>
    </div>
  );
}

interface GalleryCardProps {
  item: GalleryItem;
  onClick: () => void;
  key?: any;
}

export function GalleryCard({ item, onClick }: GalleryCardProps) {
  return (
    <div
      id={`gallery-item-${item.id}`}
      onClick={onClick}
      className="group relative cursor-pointer aspect-square rounded-xl overflow-hidden border border-slate-200 dark:border-slate-805 shadow-xs hover:border-slate-400 dark:hover:border-slate-600 transition-all duration-300"
    >
      <img
        src={item.imageUrl}
        alt={item.title}
        referrerPolicy="no-referrer"
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

      {/* Info Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 text-white flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <span className="self-start text-[9px] uppercase font-mono tracking-widest bg-white/20 border border-white/10 px-2 py-0.5 rounded mb-2">
          {item.category}
        </span>
        <h4 className="text-sm font-bold leading-tight select-none">{item.title}</h4>
        <p className="text-[11px] text-slate-300 mt-1 line-clamp-1 group-hover:line-clamp-none transition-all select-none">
          {item.description}
        </p>
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-white/10 mt-2 select-none">
          <span>By {item.contributor}</span>
          <span>{item.date}</span>
        </div>
      </div>
    </div>
  );
}

interface TeamCardProps {
  member: TeamMember;
  key?: any;
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <div
      id={`team-member-${member.id}`}
      className="flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-805 rounded-xl p-5 shadow-xs transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex gap-4 items-start mb-4">
        <img
          src={member.avatar}
          alt={member.name}
          referrerPolicy="no-referrer"
          className="w-16 h-16 rounded-xl object-cover border border-slate-200 dark:border-slate-700 bg-slate-100"
        />
        <div>
          <h4 className="font-bold text-slate-900 dark:text-slate-50 text-base">{member.name}</h4>
          <p className="text-xs text-blue-600 dark:text-blue-400 font-bold mb-1.5">{member.role}</p>
          <div className="flex flex-wrap gap-1">
            {member.specialty.slice(0, 3).map((spec, index) => (
              <span key={index} className="text-[9px] px-1.5 py-0.5 rounded-sm bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50 font-mono">
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-350 leading-relaxed mb-4 flex-1">
        {member.bio}
      </p>

      {/* Social Links */}
      <div className="flex gap-2.5 pt-3 border-t border-slate-150 dark:border-slate-800 mt-auto">
        {member.social.github && (
          <a
            href={member.social.github}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
        )}
        {member.social.linkedin && (
          <a
            href={member.social.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-md hover:bg-slate-200/60 dark:hover:bg-slate-800 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        )}
        {member.social.email && (
          <a
            href={`mailto:${member.social.email}`}
            className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-rose-500 transition-colors"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
