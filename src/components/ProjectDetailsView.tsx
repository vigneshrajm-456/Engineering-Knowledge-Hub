import React, { useState } from 'react';
import { Project } from '../types';
import { ArrowLeft, Github, ExternalLink, Terminal, HardDrive, Cpu, Radio, ShieldCheck } from 'lucide-react';

interface ProjectDetailsViewProps {
  project: Project;
  onBack: () => void;
}

export default function ProjectDetailsView({ project, onBack }: ProjectDetailsViewProps) {
  const [streamLog, setStreamLog] = useState<string[]>([
    '[STANDBY] Select trigger stream to verify hardware interface...'
  ]);
  const [isStreaming, setIsStreaming] = useState(false);

  const toggleDiagnosticStream = () => {
    if (isStreaming) {
      setIsStreaming(false);
      setStreamLog(prev => ['[STOPPED] Diagnostic stream halted.', ...prev]);
      return;
    }

    setIsStreaming(true);
    setStreamLog(['[START] Initiating high-frequency packet sweep tests...']);
    
    let count = 0;
    const interval = setInterval(() => {
      const hex = '0123456789ABCDEF';
      let payload = '';
      for (let i = 0; i < 16; i++) {
        payload += hex[Math.floor(Math.random() * 16)];
      }

      const streams = [
        `[RX_OK] Frame payload: 0x${payload} | RSSIDBM: -84`,
        `[PWR] Sensor bus draw: 14.2mA | Bus voltage: 3.32V`,
        `[TELEM] Frequency drift offsets: +2.14Hz`,
        `[OK] Diagnostics self-arbitrated check green`
      ];

      const current = streams[count % streams.length];
      setStreamLog(prev => [current, ...prev.slice(0, 5)]);

      count++;
      if (count > 15 || !isStreaming) {
        clearInterval(interval);
        setIsStreaming(false);
      }
    }, 600);
  };

  const statusColors = {
    'In Development': 'bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800',
    'Completed': 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
    'Active': 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
  };

  return (
    <div className="pb-16 space-y-10">
      {/* Back Header */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200/50 dark:hover:bg-neutral-850 rounded-lg cursor-pointer transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Specs Index
      </button>

      {/* Main Details Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-850 p-6 sm:p-10 rounded-2xl shadow-xs space-y-8">
          
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 dark:border-neutral-800">
            <img
              src={project.coverImage}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-neutral-500 mr-2">
                {project.category}
              </span>
              <span className={`inline-flex items-center text-xs px-2.5 py-0.5 rounded-full font-semibold border ${statusColors[project.status]}`}>
                {project.status}
              </span>
            </div>

            <div className="flex gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 bg-neutral-50 hover:bg-neutral-100 dark:bg-neutral-950 transition-colors"
                >
                  <Github className="w-4 h-4" /> Repo Spec
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 text-white hover:bg-indigo-500 rounded-lg text-xs font-bold transition-all shadow-sm shadow-indigo-500/10"
                >
                  <ExternalLink className="w-4 h-4" /> Run simulator
                </a>
              )}
            </div>
          </div>

          {/* Title & Writing */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-neutral-50 leading-tight">
              {project.title}
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 italic">
              Specification Log: Core software pipeline, RF packet layouts, and pinout diagrams.
            </p>
          </div>

          <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal space-y-4">
            {project.content.split('\n\n').map((para, i) => {
              if (para.startsWith('###')) {
                return (
                  <h3 key={i} className="text-base sm:text-lg font-bold text-neutral-950 dark:text-neutral-50 pt-3 pb-1 flex items-center gap-2">
                    <Cpu className="w-4 h-5 text-indigo-500" /> {para.replace('###', '').trim()}
                  </h3>
                );
              }
              if (para.startsWith('####')) {
                return (
                  <h4 key={i} className="text-sm font-semibold text-neutral-800 dark:text-neutral-250 pt-2 font-mono">
                    {para.replace('####', '').trim()}
                  </h4>
                );
              }
              if (para.startsWith('-')) {
                return (
                  <ul key={i} className="list-disc pl-5 space-y-1">
                    {para.split('\n').map((li, idx) => (
                      <li key={idx} className="text-xs sm:text-sm">{li.replace('-', '').trim()}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={i}>{para}</p>;
            })}
          </div>

          {/* Project Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="space-y-4 border-t border-neutral-150 dark:border-neutral-800/80 pt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono flex items-center gap-1.5">
                <HardDrive className="w-4 h-4" /> Supplementary Scans & Images
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {project.gallery.map((img, idx) => (
                  <div key={idx} className="aspect-video rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-950">
                    <img
                      src={img}
                      alt="Cad Scan Model"
                      referrerPolicy="no-referrer"
                      className="object-cover w-full h-full opacity-90 hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Technical Side Specs */}
        <div className="lg:col-span-4 space-y-6">
          {/* Detailed metrics box */}
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-855 rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono border-b border-neutral-100 dark:border-neutral-800 pb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> System Specifications
            </h3>
            <div className="space-y-4">
              {project.metrics.map((metric, i) => (
                <div key={i} className="flex flex-col gap-1.5 p-3 rounded-lg bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-850">
                  <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono tracking-wider uppercase">
                    {metric.label}
                  </span>
                  <span className="text-xs sm:text-sm font-black font-mono text-neutral-800 dark:text-neutral-200">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostics simulated live telemetry node */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 space-y-4 overflow-hidden">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono flex items-center gap-1.5">
              <Radio className="w-4 h-4 text-indigo-400 animate-pulse" /> Diagnostics Terminal
            </h3>
            <div className="bg-black border border-neutral-800 p-3 rounded-xl font-mono text-[10px] leading-relaxed text-indigo-300 max-h-40 overflow-y-auto flex flex-col gap-1">
              {streamLog.map((log, i) => (
                <div key={i} className="text-left">
                  <span className="text-neutral-600 mr-1.5">&gt;</span> {log}
                </div>
              ))}
            </div>
            <button
              onClick={toggleDiagnosticStream}
              className={`w-full py-2 border text-[10px] font-mono tracking-wider rounded-xl transition-all cursor-pointer font-bold ${
                isStreaming
                  ? 'bg-rose-500/10 border-rose-500/40 text-rose-450 hover:bg-rose-500/20'
                  : 'bg-indigo-500/10 border-indigo-400/30 text-indigo-300 hover:bg-indigo-500/20'
              }`}
            >
              {isStreaming ? 'DEACTIVE SWEEP' : 'ENGAGE DIAGNOSTIC SWEEP'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
