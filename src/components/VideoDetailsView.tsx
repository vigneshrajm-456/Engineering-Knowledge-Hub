import React, { useState, useEffect } from 'react';
import { Video } from '../types';
import { ArrowLeft, Play, Pause, Volume2, Settings, ListPlus, Flame, Cpu, Eye, Clock, CheckSquare } from 'lucide-react';

interface VideoDetailsViewProps {
  video: Video;
  onBack: () => void;
}

export default function VideoDetailsView({ video, onBack }: VideoDetailsViewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState('1.0x');
  const [streamProgress, setStreamProgress] = useState(0);

  // Transcript items with simulated timestamps
  const transcript = [
    { time: 0, text: 'Hello team, welcome back to the Lab. Today we are unpacking serial communication buses.' },
    { time: 14, text: 'First, notice the clock slope (yellow wire) under our 100MHz digital storage scope.' },
    { time: 32, text: 'When we drop pull-up resistors down to 1k, the standard rise times shift dramatically.' },
    { time: 58, text: 'Here, we capture a typical collision issue on the SDA line caused by overlapping addresses.' }
  ];

  const handleTranscriptClick = (seconds: number) => {
    setCurrentTime(seconds);
    setStreamProgress((seconds / 75) * 100);
    setIsPlaying(true);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= 75) {
            setIsPlaying(false);
            return 0;
          }
          const nextVal = prev + 1;
          setStreamProgress((nextVal / 75) * 100);
          return nextVal;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlayback = () => setIsPlaying(!isPlaying);

  return (
    <div className="pb-16 space-y-10">
      {/* Back link */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200/50 dark:hover:bg-neutral-850 rounded-lg cursor-pointer transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Videos
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main video section */}
        <div className="lg:col-span-8 space-y-6">
          {/* Custom mock video engine */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 flex flex-col justify-between group shadow-xl">
            {/* Dark background thumbnail */}
            <img
              src={video.thumbnail}
              alt="Laboratory Video Thumbnail"
              referrerPolicy="no-referrer"
              className={`absolute inset-0 object-cover w-full h-full opacity-40 transition-opacity ${isPlaying ? 'opacity-25 blur-xs' : ''}`}
            />

            {/* Simulated Overlay Playing Banner */}
            {isPlaying ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-3 pointer-events-none select-none z-10">
                <span className="p-4 bg-indigo-600 border border-indigo-400 text-white rounded-full animate-ping opacity-60">
                  <Play className="w-6 h-6 fill-current" />
                </span>
                <span className="text-xs font-mono font-medium text-indigo-300 uppercase tracking-widest bg-black/60 px-3 py-1.5 rounded-lg border border-indigo-900/40">
                  Streaming Diagnostic Simulation Mode: {playbackSpeed}
                </span>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <button
                  onClick={togglePlayback}
                  className="p-5 bg-neutral-900 hover:bg-red-650 cursor-pointer border border-white/20 hover:border-red-500 text-white rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <Play className="w-8 h-8 fill-current ml-1" />
                </button>
              </div>
            )}

            {/* Top header stats overlay */}
            <div className="relative p-4 flex items-center justify-between text-[11px] font-mono text-neutral-400 z-10 bg-linear-to-b from-black/80 to-transparent">
              <span className="bg-red-600 text-white px-2 py-0.5 rounded-sm font-semibold tracking-wide flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-current" /> LABORATORY FEED
              </span>
              <span>Mock Video Stream: {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')} / 01:15</span>
            </div>

            {/* Custom controls at base */}
            <div className="relative z-10 p-4 bg-linear-to-t from-black/95 via-black/85 to-transparent space-y-3">
              {/* Progress Slider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-neutral-800 h-1.5 rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const fraction = (e.clientX - rect.left) / rect.width;
                  setCurrentTime(Math.floor(fraction * 75));
                  setStreamProgress(fraction * 100);
                  setIsPlaying(true);
                }}>
                  <div className="bg-indigo-500 h-full rounded-full transition-all duration-300" style={{ width: `${streamProgress}%` }} />
                </div>
              </div>

              {/* Bottom Play Buttons Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-white">
                  <button onClick={togglePlayback} className="hover:text-indigo-400 transition-colors">
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                  </button>
                  <Volume2 className="w-5 h-5 text-neutral-400 hover:text-white cursor-pointer" />
                </div>

                <div className="flex gap-3 text-xs font-mono text-neutral-400">
                  <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-neutral-300">
                    {video.duration}
                  </span>
                  <select
                    value={playbackSpeed}
                    onChange={(e) => setPlaybackSpeed(e.target.value)}
                    className="bg-neutral-900 text-neutral-300 border border-neutral-800 rounded px-1.5 focus:outline-none"
                  >
                    <option>0.5x</option>
                    <option>1.0x</option>
                    <option>1.5x</option>
                    <option>2.0x</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Video Titles details */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-850 p-6 rounded-2xl shadow-xs space-y-3">
            <h1 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-neutral-55 tracking-tight leading-snug">
              {video.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-neutral-500 py-2 border-b border-neutral-100 dark:border-neutral-800/80">
              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{video.views.toLocaleString()} views</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />Published {video.date}</span>
              <span>·</span>
              <span className="px-2 py-0.5 rounded-sm bg-neutral-50 dark:bg-neutral-950 text-[10px] font-bold text-neutral-400 border border-neutral-250 dark:border-neutral-800/60 self-start">{video.category}</span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-350 leading-relaxed font-sans pt-2">
              {video.description}
            </p>
          </div>
        </div>

        {/* INTERACTIVE TRANSCRIPT & GUIDES PANEL */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-855 rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono border-b border-neutral-100 dark:border-neutral-800 pb-3 flex items-center gap-1.5">
              <ListPlus className="w-4 h-4 text-indigo-500" /> Interactive Transcript
            </h3>
            <p className="text-[10px] text-neutral-400 leading-normal font-sans">
              Click any sentence timestamp below to fast-forward the mock stream simulation:
            </p>
            <div className="space-y-3">
              {transcript.map((line, idx) => {
                const isActive = currentTime >= line.time && (idx === transcript.length - 1 || currentTime < transcript[idx + 1].time);
                return (
                  <div
                    key={idx}
                    onClick={() => handleTranscriptClick(line.time)}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                      isActive
                        ? 'bg-indigo-50 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900/60'
                        : 'bg-neutral-50 dark:bg-neutral-950 border-neutral-100 dark:border-neutral-850 hover:border-neutral-200'
                    }`}
                  >
                    <span className="font-mono text-[10px] font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
                      00:{line.time.toString().padStart(2, '0')}
                    </span>
                    <p className={`text-xs ${isActive ? 'text-neutral-900 dark:text-neutral-200 font-bold' : 'text-neutral-600 dark:text-neutral-400'}`}>
                      {line.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Related guides checklist */}
          <div className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-850 p-5 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-indigo-500" /> Ground Verification Tasks
            </h4>
            <div className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="mt-0.5 rounded border-neutral-300 dark:border-neutral-800 text-indigo-600 focus:ring-indigo-500" />
                <span>Calibrate oscilloscope load input impedance values (50Ω vs 1MΩ).</span>
              </label>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="mt-0.5 rounded border-neutral-300 dark:border-neutral-800 text-indigo-600 focus:ring-indigo-500" />
                <span>Verify I2C SDA and SCL address line signals.</span>
              </label>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="mt-0.5 rounded border-neutral-300 dark:border-neutral-800 text-indigo-600 focus:ring-indigo-500" />
                <span>Secure logical analysis decoder.</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
