import React, { useState } from 'react';
import { Article } from '../types';
import { Bookmark, Clock, Eye, Heart, Calendar, ArrowLeft, Send, MessageSquare, ShieldAlert, Share2, Check } from 'lucide-react';

interface ArticleDetailsViewProps {
  article: Article;
  relatedArticles: Article[];
  isBookmarked: boolean;
  onToggleBookmark: (e: React.MouseEvent, id: string) => void;
  onBack: () => void;
  onNavigateToArticle: (id: string) => void;
}

interface Comment {
  id: string;
  name: string;
  role: string;
  content: string;
  date: string;
}

export default function ArticleDetailsView({
  article,
  relatedArticles,
  isBookmarked,
  onToggleBookmark,
  onBack,
  onNavigateToArticle
}: ArticleDetailsViewProps) {
  const [likes, setLikes] = useState(article.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [commentName, setCommentName] = useState('');
  const [commentRole, setCommentRole] = useState('Embedded Developer');
  const [commentText, setCommentText] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'c-1',
      name: 'Elena Rostova',
      role: 'Telemetry Analyst',
      content: 'Excellent guide! The WASM ArrayBuffer approach totally resolved frame lagging under our 200Hz testing simulation stack. Looking forward to more telemetry optimizations.',
      date: 'May 29, 2026'
    },
    {
      id: 'c-2',
      name: 'Hiroshi Tanaka',
      role: 'Avionics hobbyist',
      content: 'Does the serial packet contain termination CRC checks at the WASM memory buffer, or is that left entirely for the RF transceiver chip layer?',
      date: 'May 30, 2026'
    }
  ]);

  const handleLike = () => {
    if (hasLiked) {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    } else {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    }
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      name: commentName,
      role: commentRole,
      content: commentText,
      date: 'Today'
    };

    setComments(prev => [...prev, newComment]);
    setCommentName('');
    setCommentText('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <div className="pb-16 space-y-10 font-sans text-left">
      {/* Back button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-650 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 bg-slate-100 dark:bg-slate-850 hover:bg-slate-205 dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </button>

        {isCopied && (
          <span className="text-[10px] font-mono font-bold text-emerald-650 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1 rounded-md border border-emerald-250 dark:border-emerald-900/35 flex items-center gap-1.5 animate-pulse">
            <Check className="w-3.5 h-3.5" /> URL successfully copied to clipboard!
          </span>
        )}
      </div>

      {/* Main Structural Article Details */}
      <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-805 rounded-2xl overflow-hidden shadow-xs p-6 sm:p-10 space-y-6 text-left">
          
          {/* Cover image banner */}
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200/55 dark:border-slate-800">
            <img
              src={article.coverImage}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="object-cover w-full h-full animate-fade-in"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-sm bg-blue-50 text-blue-700 dark:bg-blue-955/40 dark:text-blue-300 font-bold border border-blue-150">
              {article.category}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => onToggleBookmark(e, article.id)}
                className={`p-2 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isBookmarked
                    ? 'bg-rose-50 border-rose-205 text-rose-650 dark:bg-rose-955/20 dark:border-rose-900/40 dark:text-rose-450'
                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 hover:text-slate-900'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                {isBookmarked ? 'Bookmarked' : 'Add Bookmark'}
              </button>
              <button
                onClick={copyToClipboard}
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-xs cursor-pointer"
                title="Copy Article Link"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-50 leading-tight">
            {article.title}
          </h1>

          {/* Post stats metadata */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 pb-5 border-b border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center gap-2">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                referrerPolicy="no-referrer"
                className="w-6 h-6 rounded-full"
              />
              <span className="font-semibold text-slate-700 dark:text-slate-300">{article.author.name}</span>
            </div>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {article.date}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {article.readingTime}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" /> {article.views} views
            </span>
          </div>

          {/* Simulated technical details markdown parsed nicely */}
          <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 font-normal">
           {(article.content || article.excerpt || "No content available")
              .split('\n\n')
              .map((paragraph, index) => {
              if (paragraph.startsWith('###')) {
                return (
                  <h3 key={index} className="text-base font-bold text-slate-900 dark:text-slate-50 pt-4 pb-1">
                    {paragraph.replace('###', '').trim()}
                  </h3>
                );
              }
              if (paragraph.startsWith('-')) {
                return (
                  <ul key={index} className="list-disc pl-5 space-y-1 text-xs">
                    {paragraph.split('\n').map((li, liIdx) => (
                      <li key={liIdx}>{li.replace('-', '').trim()}</li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.startsWith('```')) {
                const codeLines = paragraph.replace(/```[a-z]*/, '').replace(/```$/, '').trim();
                return (
                  <pre key={index} className="bg-slate-950 text-emerald-400 p-4 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto leading-relaxed whitespace-pre">
                    {codeLines}
                  </pre>
                );
              }
              return (
                <p key={index} className="whitespace-pre-line">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Social Feedback Bar */}
          <div className="flex items-center gap-4 pt-6 border-t border-slate-200/80 dark:border-slate-800/80">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all border cursor-pointer ${
                hasLiked
                  ? 'bg-rose-50 border-rose-250 text-rose-650 dark:bg-rose-955/20 dark:border-rose-900/60 dark:text-rose-455'
                  : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-slate-500 hover:text-rose-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
              Solder Endorsement ({likes})
            </button>
          </div>

          {/* Comments section */}
          <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800/80 space-y-6 text-left">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-500" /> Peer Discussion ({comments.length})
            </h3>

            {/* Comment Form */}
            <form onSubmit={handlePostComment} className="space-y-3 bg-slate-50 dark:bg-slate-950 p-4 border border-slate-200 dark:border-slate-800 rounded-xl text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                <input
                  type="text"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  placeholder="Engineer / Scientist Name"
                  required
                  className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 text-xs px-3 py-2 rounded-lg text-slate-900 dark:text-slate-50 focus:outline-none focus:border-blue-600 w-full"
                />
                <select
                  value={commentRole}
                  onChange={(e) => setCommentRole(e.target.value)}
                  className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 text-xs px-3 py-2 rounded-lg text-slate-900 dark:text-slate-50 focus:outline-none focus:border-blue-600 w-full"
                >
                  <option>Avionics Specialist</option>
                  <option>Embedded Developer</option>
                  <option>AI Scientist</option>
                  <option>Hardware Enthusiast</option>
                  <option>System Designer</option>
                </select>
              </div>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share reviews, feedback, or test modifications..."
                rows={3}
                required
                className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 text-xs p-3 rounded-lg text-slate-900 dark:text-slate-50 focus:outline-none focus:border-blue-600 w-full"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold font-sans tracking-wide transition-all self-end flex items-center gap-1.5 cursor-pointer ml-auto"
              >
                Log Feedback <Send className="w-3 h-3" />
              </button>
            </form>

            {/* Simulated comments feed list */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="p-4 border border-slate-150 dark:border-slate-805 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 text-left">
                  <div className="flex items-center justify-between mb-1.5 text-xs">
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{comment.name}</span>
                      <span className="mx-1.5 text-slate-300 dark:text-slate-700">|</span>
                      <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">{comment.role}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">{comment.date}</span>
                  </div>
                  <p className="text-xs text-slate-705 dark:text-slate-350 leading-relaxed font-sans">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RELATED CONTENT FRAMEWORK */}
        <div className="lg:col-span-4 space-y-6 text-left">
          <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-805 rounded-2xl p-5 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono mb-4">
              Related System Manuals
            </h3>

            {relatedArticles.length > 0 ? (
              <div className="space-y-4">
                {relatedArticles.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onNavigateToArticle(rel.id)}
                    className="group cursor-pointer flex gap-3 pb-3 border-b border-slate-100 last:border-b-0 last:pb-0 dark:border-slate-800/80 transition-colors"
                  >
                    <img
                      src={rel.coverImage}
                      alt={rel.title}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-md object-cover bg-slate-100 border border-slate-205 dark:border-slate-800/50 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-mono uppercase bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 text-slate-500 rounded border border-slate-200/45">
                        {rel.category}
                      </span>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-205 line-clamp-2 mt-1 leading-normal group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {rel.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 font-mono">No supplementary articles matching this layout.</p>
            )}
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-855 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="p-1 px-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-650 dark:text-amber-400 rounded text-[9px] font-mono tracking-widest uppercase self-start inline-block">
                SYS_ALERT
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50">Ground Data Integrity</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-sans mt-1">
                Telemetry links rely on local transceivers. If packet loss rates exceed 12%, immediately adjust antenna polarization vectors.
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
