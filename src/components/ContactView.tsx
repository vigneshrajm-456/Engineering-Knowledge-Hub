import React, { useState } from 'react';
import { Mail, Send, ShieldAlert, Cpu, Terminal, CheckCircle2, Sliders } from 'lucide-react';

export default function ContactView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Embedded Engineer');
  const [priority, setPriority] = useState('Low');
  const [message, setMessage] = useState('');
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmitLog, setTransmitLog] = useState<string[]>([]);
  const [transmitted, setTransmitted] = useState(false);

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsTransmitting(true);
    setTransmitLog(['[SYS] Allocating UDP buffer ports...', '[SYS] Packaging raw form payloads...']);

    // Sequence simulated transmission logs
    setTimeout(() => {
      setTransmitLog(prev => [...prev, `[TX] Priority override engaged: PR-${priority.toUpperCase()}`]);
    }, 400);

    setTimeout(() => {
      setTransmitLog(prev => [...prev, `[OK] Encrypted handshake success. Sending ${Buffer.from(message).length * 8} bits.`]);
    }, 900);

    setTimeout(() => {
      setIsTransmitting(false);
      setTransmitted(true);
    }, 1500);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setRole('Embedded Engineer');
    setPriority('Low');
    setMessage('');
    setTransmitted(false);
    setTransmitLog([]);
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto font-sans">
      {/* Page Header */}
      <div className="border-b border-slate-205 dark:border-slate-800/80 pb-5">
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-50 flex items-center gap-2">
          <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          Secure Uplink Command Contact
        </h1>
        <p className="text-xs text-slate-505 dark:text-slate-400 mt-1 leading-relaxed">
          Report subsystem anomalies, suggest telemetry integrations, or collaborate on hardware schematics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact info / guidelines card */}
        <div className="md:col-span-4 space-y-6 text-left">
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-805 p-5 rounded-2xl space-y-4 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-blue-500" /> Uplink Rules
            </h3>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-3 leading-relaxed">
              <li className="flex gap-2">
                <span className="text-blue-650 dark:text-blue-400 font-mono font-bold">1.</span>
                <span>Critical Priority is reserved, use only during telemetry drops or rotor failures.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-655 dark:text-blue-400 font-mono font-bold">2.</span>
                <span>Ground station response targets are typical ~12 hours.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-655 dark:text-blue-400 font-mono font-bold">3.</span>
                <span>No unsolicited tracking payloads allowed in transmission fields.</span>
              </li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-805 space-y-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-50 flex items-center gap-1">
              <ShieldAlert className="w-4 h-4 text-amber-500" /> Active Containment
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              If an ongoing embedded firmware loop triggers a core stack dump, include raw hexadecimal stack residues inside your transmission log fields.
            </p>
          </div>
        </div>

        {/* Uplink form */}
        <div className="md:col-span-8">
          {transmitted ? (
            /* Successful Transmit Screen */
            <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 p-6 sm:p-10 rounded-2xl text-center space-y-6 shadow-xs animate-fade-in">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-950/40 border border-blue-250 dark:border-blue-900/65 rounded-full flex items-center justify-center mx-auto text-blue-600 dark:text-blue-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 font-sans">
                  Transmission Transferred!
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-300">
                  Uplink payload fully queued under station clearance reference.
                </p>
              </div>

              {/* Hex / transmission details logs */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-left font-mono text-[10px] space-y-1 text-blue-300">
                {transmitLog.map((log, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-slate-600">&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
                <div className="text-emerald-400 font-bold mt-1">&gt; [OK] SYSTEM STACK UPLINK ENROLLED. READY.</div>
              </div>

              <button
                onClick={resetForm}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                Assemble New Transmission
              </button>
            </div>
          ) : (
            /* Contact Form Input fields */
            <form onSubmit={handleTransmit} className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-805 p-6 sm:p-8 rounded-2xl shadow-xs space-y-5 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider font-bold">Engineer Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Marcus Vance"
                    className="w-full bg-slate-50 dark:bg-slate-950 text-xs border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl font-medium focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-650 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider font-bold">Clearance Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. vance@embedded-nodes.io"
                    className="w-full bg-slate-50 dark:bg-slate-950 text-xs border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl font-medium focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-650 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider font-bold">Active Role Focus</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-xs border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl focus:outline-none focus:border-blue-600 mr-2"
                  >
                    <option>Avionics Architect</option>
                    <option>Embedded Engineer</option>
                    <option>AI Researcher</option>
                    <option>Hobbyist Solderer</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider font-bold">Transmission Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 text-xs border border-slate-200 dark:border-slate-800 p-2.5 rounded-xl focus:outline-none focus:border-blue-600"
                  >
                    <option value="Low">Low - System inquiries / Suggestions</option>
                    <option value="Medium">Medium - Project collaborations</option>
                    <option value="Critical">Critical - Subsystem fault / Telemetry drop</option>
                  </select>
                </div>
              </div>

              {/* Priority warning rendering dynamically */}
              {priority === 'Critical' && (
                <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-xl text-red-700 dark:text-red-400 text-[11px] leading-relaxed flex items-start gap-2 animate-pulse font-sans">
                  <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span><strong>⚠️ Fault priority triggered:</strong> Critical priority uplinks are treated with immediate station response buffers. Please ensure logs are correct.</span>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider font-bold">Transmission Message / Error residue</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Draft system suggestions or paste raw hex logs here..."
                  className="w-full bg-slate-50 dark:bg-slate-950 text-xs border border-slate-200 dark:border-slate-800 p-3 rounded-xl font-medium focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-650 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isTransmitting}
                className={`w-full py-3 rounded-xl text-xs font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                  isTransmitting
                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed dark:bg-slate-800'
                    : 'bg-blue-600 hover:bg-blue-500 text-white'
                }`}
              >
                {isTransmitting ? (
                  <>
                    <Terminal className="w-4 h-4 animate-spin" /> Packaging telemetry arrays...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Transmit Secure Signal
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
