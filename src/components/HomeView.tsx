import React, { useState } from 'react';
import { Article, Project, Video, Announcement } from '../types';
import { ArticleCard, ProjectCard, VideoCard } from './Cards';
import { ArrowRight, Sparkles, Database, Terminal, ShieldAlert, Wifi, Activity, ChevronRight, CheckCircle2, Award } from 'lucide-react';

interface HomeViewProps {
  articles: Article[];
  projects: Project[];
  videos: Video[];
  announcements: Announcement[];
  bookmarkedIds: string[];
  onToggleBookmark: (e: React.MouseEvent, id: string) => void;
  onNavigateToPage: (page: string, id?: string) => void;
}

export default function HomeView({
  articles,
  projects,
  videos,
  announcements,
  bookmarkedIds,
  onToggleBookmark,
  onNavigateToPage
}: HomeViewProps) {
  // Mock live terminal feed to show realistic "engineering" aesthetics
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    '[INIT] Ground RF Station azimuth calibration initiated...',
    '[OK] Azimuth lock secured at 144.32°.',
    '[SYS] TinyML core load: 12.4% on Cortex-M7.',
    '[TELEMETRY] Transceiver ping delay (915MHz): 18.2ms',
    '[OK] Swarm dynamic routing optimized.'
  ]);
  const [simRunning, setSimRunning] = useState(false);

  const startSimulation = () => {
    if (simRunning) return;
    setSimRunning(true);
    let count = 0;
    const interval = setInterval(() => {
      const logs = [
        `[SYS] Raw buffer packets incoming: ${(2 + Math.random() * 5).toFixed(1)} KB/s`,
        `[TELEM] GPS Coordinate delta update matching drift: +0.00012`,
        `[SENSOR] Motor injector thermal gradient safe at ${(420 + Math.random() * 20).toFixed(1)}°C`,
        `[OK] Quaternion correction vector synthesized cleanly.`
      ];
      const randomLog = logs[Math.floor(Math.random() * logs.length)];
      setTerminalLogs(prev => [randomLog, ...prev.slice(0, 4)]);
      count++;
      if (count > 8) {
        clearInterval(interval);
        setSimRunning(false);
      }
    }, 1000);
  };

  const featuredArticle = articles.find(a => a.trending) || articles[0];
  const otherFeatured = articles.filter(a => a.id !== featuredArticle.id).slice(0, 2);
  const featuredProjects = projects.slice(0, 2);
  const latestVideos = videos.slice(0, 2);
  const latestAnnouncements = announcements.slice(0, 2);

  return (
    <div className="space-y-16 pb-16">
      {/* SECTION 1: HERO BANNER (Highly Polished modern landing) */}
      <section className="relative overflow-hidden bg-slate-900 text-white rounded-3xl py-14 px-6 sm:px-12 lg:px-16 shadow-lg border border-slate-800">
        {/* Abstract structural grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-300 rounded-full text-[10px] font-bold font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Direct Telemetry & Engineering Portals
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] font-sans">
            Refined Knowledge for <br />
            <span className="bg-linear-to-r from-blue-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent">
              Hardware & Systems Engineers
            </span>
          </h1>
          
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans font-medium">
            Explore advanced guides on custom rocket telemetries, embedded industrial IoT boards, neural routing nodes, and real-time sensor processing pipelines with pristine engineering blueprints.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onNavigateToPage('articles')}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 active:scale-98 text-white rounded-xl text-xs font-bold font-sans tracking-wide transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              Browse Articles <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateToPage('projects')}
              className="w-full sm:w-auto px-6 py-3 bg-slate-950 hover:bg-slate-850 active:scale-98 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold font-sans tracking-wide transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              View System Specs
            </button>
          </div>
        </div>

        {/* SECTION 4.5 / 5: LIVE GROUND DISPATCH MONITOR (Unique Technical interactivity) */}
        <div className="mt-12 max-w-3xl mx-auto bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
          <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider">
                Ground Station Link: live_feed.bin
              </span>
            </div>
            <button
              onClick={startSimulation}
              className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors ${
                simRunning
                  ? 'bg-slate-800 border-slate-705 text-slate-500 cursor-not-allowed'
                  : 'bg-blue-500/10 border-blue-400/30 text-blue-300 hover:bg-blue-500/20'
              }`}
            >
              {simRunning ? 'SIMULATING...' : 'TRIGGER SIMULATED BURST'}
            </button>
          </div>
          <div className="p-3 bg-slate-950 font-mono text-[11px] text-slate-350 space-y-1 overflow-y-auto max-h-36">
            {terminalLogs.map((log, index) => (
              <div key={index} className="flex gap-2 text-left">
                <span className="text-slate-650">[{5 - index}]:</span>
                <span className={log.includes('[OK]') ? 'text-emerald-400' : log.includes('[SYS]') ? 'text-blue-400 font-semibold' : 'text-slate-300'}>
                  {log}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>      {/* SECTION 2: FEATURED ARTICLES */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-205 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50 font-sans">
              Featured Flight Engineering Articles
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
              In-depth manuals written by flight telemetry and IoT edge practitioners.
            </p>
          </div>
          <button
            onClick={() => onNavigateToPage('articles')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-500 flex items-center gap-1 self-start sm:self-center transition-colors"
          >
            See all articles <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Split grid - main article on left, smaller on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            {featuredArticle && (
              <ArticleCard
                article={featuredArticle}
                isBookmarked={bookmarkedIds.includes(featuredArticle.id)}
                onToggleBookmark={onToggleBookmark}
                onClick={() => onNavigateToPage('article-details', featuredArticle.id)}
              />
            )}
          </div>
          <div className="lg:col-span-5 flex flex-col gap-4">
            <h4 className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 dark:text-slate-500 font-mono mb-1">
              Trending Technical Papers
            </h4>
            <div className="space-y-4 flex-1 flex flex-col justify-between">
              {otherFeatured.map(art => (
                <div
                  key={art.id}
                  onClick={() => onNavigateToPage('article-details', art.id)}
                  className="group cursor-pointer flex gap-4 bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-805 rounded-xl hover:border-slate-350 dark:hover:border-slate-700 transition-all shadow-xs"
                >
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    referrerPolicy="no-referrer"
                    className="w-20 sm:w-28 h-20 rounded-lg object-cover bg-slate-100 border border-slate-200/50 dark:border-slate-800/50"
                  />
                  <div className="flex-1 flex flex-col justify-center">
                    <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-450 border border-slate-200 dark:border-slate-800/60 self-start mb-1.5">
                      {art.category}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 mb-1 line-clamp-2 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {art.title}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400 font-medium">
                      {art.date} · {art.readingTime}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: STATS */}
      <section className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-805 rounded-2xl p-6 sm:p-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-50">
            Platform Network Metrics
          </h3>
          <p className="text-xs text-slate-505 dark:text-slate-400">
            Real hardware integrations, published specs, and embedded software elements under active management.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-150 dark:border-slate-850">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-600 dark:text-blue-400">
              100%
            </div>
            <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
              Static Code Cleanliness
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-150 dark:border-slate-850">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-600 dark:text-blue-400">
              {articles.length}
            </div>
            <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
              Coded Blueprints
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-150 dark:border-slate-850">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-600 dark:text-blue-400">
              915 MHz
            </div>
            <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
              LoRa Radio Links
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-150 dark:border-slate-850">
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-600 dark:text-blue-400">
              15+
            </div>
            <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">
              Hardware Interfaces
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURED PROJECTS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-205 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              High-Value Portfolio Projects
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Advanced embedded designs with detailed telemetry metrics and source references.
            </p>
          </div>
          <button
            onClick={() => onNavigateToPage('projects')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-500 flex items-center gap-1 self-start sm:self-center transition-colors"
          >
            Explore all spec sheets <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map(proj => (
            <ProjectCard
              key={proj.id}
              project={proj}
              onClick={() => onNavigateToPage('project-details', proj.id)}
            />
          ))}
        </div>
      </section>

      {/* SECTION 4: LATEST VIDEOS & TUTORIALS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-205 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                Latest Laboratory Demonstrations
              </h2>
              <p className="text-xs text-slate-505 dark:text-slate-400">
                Oscilloscope traces, timing slopes, and visual integration captures.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {latestVideos.map(vid => (
              <VideoCard
                key={vid.id}
                video={vid}
                onClick={() => onNavigateToPage('video-details', vid.id)}
              />
            ))}
          </div>
        </div>

        {/* SECTION 6: LATEST ANNOUNCEMENTS */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-205 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                Dispatch Broadcast
              </h2>
              <p className="text-xs text-slate-505 dark:text-slate-400">
                Upcoming workshops and engineering events.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {latestAnnouncements.map(ann => (
              <div
                key={ann.id}
                onClick={() => onNavigateToPage('announcements')}
                className="group cursor-pointer p-4 bg-blue-50/40 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40 rounded-xl hover:border-blue-200 dark:hover:border-blue-800 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-blue-600 dark:text-blue-400 bg-blue-105/50 dark:bg-blue-950 px-2 py-0.5 rounded border border-blue-200/30 dark:border-blue-900/45">
                      {ann.type}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{ann.date}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-1 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {ann.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {ann.content}
                  </p>
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-3 pt-2 border-t border-blue-200/20 flex items-center justify-between">
                  <span>Pin: {ann.location.split(',')[0]}</span>
                  <span className="text-blue-650 dark:text-blue-400 font-semibold">Register &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
