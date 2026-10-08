import React from 'react';
import { ACHIEVEMENTS, SPECIAL_HIGHLIGHT } from '../config/portfolioData';
import { FaMicrophone, FaCircleCheck } from 'react-icons/fa6';

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 border-b border-slate-200/80 dark:border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <span>05 / Leadership & Participation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Achievements & Leadership
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
            Active involvement in national hackathons, university event leadership, and major campus initiatives.
          </p>
        </div>

        {/* 12. DEDICATED SPOTLIGHT: MAHAKHUMBH ROJGAR MELA JOB FAIR */}
        <div className="mb-12 bg-white dark:bg-slate-900/80 border border-blue-300 dark:border-blue-500/30 rounded-xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider font-mono">
                <FaMicrophone className="w-3.5 h-3.5" />
                <span>Featured Event & Leadership Highlight</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                {SPECIAL_HIGHLIGHT.title}
              </h3>

              <div className="text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <span>Venue: {SPECIAL_HIGHLIGHT.venue}</span>
                <span>•</span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold">{SPECIAL_HIGHLIGHT.role}</span>
              </div>

              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed pt-1">
                {SPECIAL_HIGHLIGHT.scopeDescription}
              </p>
            </div>

            {/* Highlights Box */}
            <div className="lg:w-80 bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-lg p-5 space-y-3 shrink-0">
              <div className="text-xs font-mono uppercase text-slate-600 dark:text-slate-400 tracking-wider">
                Event Responsibilities
              </div>
              <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                {SPECIAL_HIGHLIGHT.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <FaCircleCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ACHIEVEMENTS & LEADERSHIP TIMELINE / LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-colors flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-blue-700 dark:text-blue-400 border border-slate-200 dark:border-slate-700/60">
                    {item.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                    0{index + 1}
                  </span>
                </div>

                <h4 className="text-base font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                  {item.title}
                </h4>

                <div className="inline-block text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-3 font-mono">
                  Role: {item.role}
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
