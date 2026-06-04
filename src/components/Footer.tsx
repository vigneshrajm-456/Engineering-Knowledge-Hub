import React, { useState } from 'react';
import { Cpu, Mail, Send, Github, Linkedin, MessageSquare, Shield, FileText } from 'lucide-react';

interface FooterProps {
  onPageChange: (page: string) => void;
}

export default function Footer({ onPageChange }: FooterProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setSubmitted(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800/80 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Info & Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onPageChange('home')}>
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shadow-xs">
                <Cpu className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-extrabold tracking-wider uppercase text-white font-sans">
                ENG<span className="text-blue-500">HUB</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Curating practical, professional-grade technical knowledge on Space exploration payloads, IoT edge integration nodes, autonomous AI robotics, and microcontroller assemblies.
            </p>
            <div className="flex gap-4 text-slate-400 mt-2">
              <a href="#" className="hover:text-blue-400 transition-colors" title="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors" title="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors" title="Tech Support Discord">
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Map */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-extrabold text-white mb-4 font-mono">
              Hub Exploration
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs text-slate-450 font-medium">
              <button onClick={() => onPageChange('home')} className="text-left hover:text-white transition-colors">Home Dashboard</button>
              <button onClick={() => onPageChange('articles')} className="text-left hover:text-white transition-colors">Technical Articles</button>
              <button onClick={() => onPageChange('projects')} className="text-left hover:text-white transition-colors">Active Projects</button>
              <button onClick={() => onPageChange('videos')} className="text-left hover:text-white transition-colors">Tech Videos</button>
              <button onClick={() => onPageChange('gallery')} className="text-left hover:text-white transition-colors">Diagram Gallery</button>
              <button onClick={() => onPageChange('announcements')} className="text-left hover:text-white transition-colors">Events & News</button>
              <button onClick={() => onPageChange('about')} className="text-left hover:text-white transition-colors">About our Team</button>
              <button onClick={() => onPageChange('contact')} className="text-left hover:text-white transition-colors">Contact Support</button>
            </div>
          </div>

          {/* Column 3: Contact Info */}
          <div className="text-xs leading-relaxed text-slate-440 flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-wider font-extrabold text-white mb-1 font-mono">
              Command Station
            </h4>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-blue-400" />
              <span>contact@engineeringknowledge-hub.org</span>
            </p>
            <p className="mt-1">
              <strong>Mailing Grid:</strong> Block-E, Spaceport Propulsion Sector, Orbit Lane 101
            </p>
            <p className="mt-1 text-[10px] text-slate-500 leading-snug">
              Disclaimer: Part of a portfolio system demonstrating telemetry modeling, full-stack CMS design, and sub-systems interface.
            </p>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-wider font-extrabold text-white font-mono">
              Telemetry Dispatch (Newsletter)
            </h4>
            <p className="text-xs text-slate-400 leading-snug">
              Subscribe to receive instant delta updates on custom firmware designs, rocketry testing reports, and AI models training weights.
            </p>
            
            {submitted ? (
              <div className="bg-slate-950/50 border border-blue-800/40 rounded-lg p-3 text-xs text-blue-300">
                🚀 Subscribed successfully. Ground station dispatch configured!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 mt-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter engineer email"
                  required
                  className="w-full bg-slate-950 text-xs border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="p-2 bg-blue-600 hover:bg-blue-550 text-white rounded-lg transition-all"
                  title="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Base */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-mono gap-4">
          <p>© {new Date().getFullYear()} EngHub. Built under high-contrast modular guidelines.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-slate-300 transition-colors flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" /> Security Rules
            </a>
            <a href="#" className="hover:text-slate-300 transition-colors flex items-center gap-1">
              <FileText className="w-3.5 h-3.5" /> Terms & SLA
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
