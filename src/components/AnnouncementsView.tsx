import React, { useState, useMemo } from 'react';
import { Announcement } from '../types';
import { Bell, MapPin, Calendar, HelpCircle, X, CheckSquare, Award, Clock } from 'lucide-react';

interface AnnouncementsViewProps {
  announcements: Announcement[];
}

export default function AnnouncementsView({ announcements }: AnnouncementsViewProps) {
  const [selectedType, setSelectedType] = useState('All');
  const [activeRsvp, setActiveRsvp] = useState<Announcement | null>(null);
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  const filterTypes = ['All', 'Events', 'Competitions', 'Workshops', 'News'];

  const filteredAnnouncements = useMemo(() => {
    if (selectedType === 'All') return announcements;
    return announcements.filter(ann => ann.type.toLowerCase() === selectedType.toLowerCase());
  }, [announcements, selectedType]);

  const handleSubmitRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim() || !rsvpEmail.trim()) return;
    setRsvpSuccess(true);
  };

  const handleCloseModal = () => {
    setActiveRsvp(null);
    setRsvpName('');
    setRsvpEmail('');
    setRsvpSuccess(false);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Page Header */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-5">
        <h1 className="text-3xl font-black text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
          <Bell className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          Broadcast Dispatch & Announcements
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
          Signup for high-energy rocket competitions, embedded systems workshops, and community newsletters.
        </p>
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap gap-2 pt-1">
        {filterTypes.map(type => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`text-xs px-4 py-2 font-semibold tracking-wide rounded-full border transition-all ${
              selectedType === type
                ? 'bg-neutral-900 border-neutral-950 text-white dark:bg-white dark:border-white dark:text-neutral-950 font-bold shadow-sm'
                : 'bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* ANNOUNCEMENTS CARDS LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredAnnouncements.map((ann) => (
          <div
            key={ann.id}
            className="flex flex-col justify-between bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-850 p-6 rounded-2xl shadow-xs"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2.5 py-1 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-150 dark:border-indigo-900/50">
                  {ann.type}
                </span>
                <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {ann.date}
                </span>
              </div>

              <h3 className="text-lg font-black text-neutral-900 dark:text-neutral-50 leading-snug">
                {ann.title}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-355 leading-relaxed">
                {ann.content}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-4">
              <div className="flex items-start gap-2 text-xs font-mono text-neutral-400 leading-relaxed min-h-12">
                <MapPin className="w-4 h-4 text-neutral-550 flex-shrink-0 mt-0.5" />
                <span>Station coordinates:<br /><strong className="text-neutral-800 dark:text-neutral-200 font-sans font-semibold">{ann.location}</strong></span>
              </div>

              {ann.registrationUrl && (
                <button
                  onClick={() => setActiveRsvp(ann)}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold font-sans tracking-wide transition-all shadow-sm shadow-indigo-600/10 cursor-pointer text-center"
                >
                  Acquire Seat & Live Coordinates
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* COMPREHENSIVE RSVP TICKET VIRTUAL MODAL */}
      {activeRsvp && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="relative max-w-md w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-1.5 bg-neutral-100 hover:bg-neutral-200 hover:text-red-500 rounded-full text-neutral-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {rsvpSuccess ? (
              /* Success Virtual Ticket Receipt */
              <div className="space-y-6 text-center py-4">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 rounded-full flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                  <Award className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 font-sans">
                    Ground Ticket Confirmed!
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Your clearance code has been baked into our station dispatch logs.
                  </p>
                </div>

                {/* Simulated ticket */}
                <div className="bg-neutral-50 dark:bg-neutral-950 p-4 rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-800 text-left space-y-3 font-mono text-[11px] relative">
                  <div className="space-y-1.5">
                    <p className="text-[10px] text-neutral-400 uppercase tracking-widest">TICKET LOG: #{Math.floor(Math.random() * 900000 + 100000)}</p>
                    <p><strong className="text-neutral-400 font-normal">DELEGATE:</strong> <span className="text-neutral-900 dark:text-neutral-150 font-bold">{rsvpName}</span></p>
                    <p><strong className="text-neutral-400 font-normal">CLEARANCE:</strong> <span className="text-neutral-900 dark:text-neutral-150">{rsvpEmail}</span></p>
                    <p><strong className="text-neutral-400 font-normal">EVENT:</strong> <span className="text-indigo-600 dark:text-indigo-400 font-bold">{activeRsvp.title}</span></p>
                    <p><strong className="text-neutral-400 font-normal">TIMECODE:</strong> <span className="text-neutral-900 dark:text-neutral-150">{activeRsvp.date}</span></p>
                  </div>
                  <div className="pt-2.5 border-t border-neutral-200/50 dark:border-neutral-800 text-center text-neutral-400">
                    * Present at Station *
                  </div>
                </div>

                <button
                  onClick={handleCloseModal}
                  className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              /* RSVP Entry Form */
              <div className="space-y-4">
                <div className="space-y-2">
                  <span className="text-[9px] font-mono uppercase bg-indigo-50 border border-indigo-150 rounded px-2.5 py-0.5 text-indigo-600 inline-block">
                    Acquire seat
                  </span>
                  <h3 className="text-lg font-black text-neutral-900 dark:text-neutral-50 font-sans tracking-tight leading-snug">
                    {activeRsvp.title}
                  </h3>
                  <p className="text-xs text-neutral-500 line-clamp-2">
                    {activeRsvp.content}
                  </p>
                </div>

                <form onSubmit={handleSubmitRsvp} className="space-y-4 font-sans text-xs">
                  <div className="space-y-1.5">
                    <label className="text-neutral-500 font-mono text-[10px] uppercase">Your Name</label>
                    <input
                      type="text"
                      className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-2.5 rounded-xl focus:outline-none"
                      placeholder="e.g. Dr. Alan Turing"
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-neutral-500 font-mono text-[10px] uppercase">Clearance Email</label>
                    <input
                      type="email"
                      className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-2.5 rounded-xl focus:outline-none"
                      placeholder="e.g. turing@station.org"
                      value={rsvpEmail}
                      onChange={(e) => setRsvpEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl text-neutral-500 text-[10px] leading-relaxed">
                    <Clock className="w-4 h-4 flex-shrink-0 text-indigo-500" />
                    <span>RSVP confirmation completes instantly. Clearance coordinates will compile onto screen upon submittion.</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
                  >
                    Confirm RSVP Seat Clear
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
