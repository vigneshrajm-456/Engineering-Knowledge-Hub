import React from 'react';
import { TeamMember } from '../types';
import { TeamCard } from './Cards';
import { Info, ShieldAlert, Cpu, Sparkles, Server } from 'lucide-react';

interface AboutViewProps {
  teamMembers: TeamMember[];
}

export default function AboutView({ teamMembers }: AboutViewProps) {
  return (
    <div className="space-y-12 pb-16 font-sans">
      {/* Page Header */}
      <div className="border-b border-slate-205 dark:border-slate-800/80 pb-5">
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-50 flex items-center gap-2">
          <Info className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          Technical Foundations & Research Team
        </h1>
        <p className="text-xs text-slate-505 dark:text-slate-400 mt-1 leading-relaxed">
          Discover our development philosophy, physical engineering benchmarks, and meet our senior research partners.
        </p>
      </div>

      {/* CORE PILLARS SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-805 rounded-2xl shadow-xs space-y-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl w-12 h-12 flex items-center justify-center border border-blue-150">
            <Cpu className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">Embedded Assemblies</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Specialize in low-vibration sensor placement, differential transceiver lines signaling, high-reliability STM32 ARM compilers, and absolute electrical isolation.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-805 rounded-2xl shadow-xs space-y-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl w-12 h-12 flex items-center justify-center border border-blue-150">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">High-Frequency Telemetry</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Configure sub-orbital ground links over 915MHz LoRa and phased arrays, parsing real-time bytes using low-allocation Rust structures compiled directly to WASM.
          </p>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-805 rounded-2xl shadow-xs space-y-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl w-12 h-12 flex items-center justify-center border border-blue-150">
            <Server className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-50">Autonomous Mesh AI</h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Implement on-device, fully-quantized models running at the extreme edge inside microcontrollers to resolve routing, vision parameters, and vibration anomalies.
          </p>
        </div>
      </section>

      {/* STRATEGIC MISSION STATEMENT */}
      <section className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-2xl space-y-4 text-left">
          <span className="text-[10px] uppercase font-mono tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded">
            Our Commitment
          </span>
          <h2 className="text-xl sm:text-2xl font-black">
            Solder-First Physical Craftsmanship
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
            We believe that modern full-stack development and low-level physical telemetry systems should merge seamlessly. Every guideline on this platform is backed by oscilloscopes, CAD traces, sensor arrays, and direct validation trials. We bypass simulated placeholders to help developers achieve industrial robustness.
          </p>
        </div>
      </section>

      {/* SENIOR RESEARCH PARTNERS */}
      <section className="space-y-6">
        <div className="border-b border-slate-205 dark:border-slate-800/80 pb-3">
          <h2 className="text-md font-bold text-slate-900 dark:text-slate-50">
            Senior Ground Engineers & Researchers
          </h2>
          <p className="text-xs text-slate-500">
            Engineers, firmware designers, and avionics architects supporting our telemetry stack.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map(member => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </section>
    </div>
  );
}
