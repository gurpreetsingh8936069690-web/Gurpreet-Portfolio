import React from 'react';
import { EXPERIENCE } from '../config/portfolioData';
import { FaBriefcase, FaBuilding, FaCircleCheck } from 'react-icons/fa6';

export default function Experience() {
  return (
    <section id="experience" className="py-20 border-b border-slate-200/80 dark:border-slate-900 bg-slate-100/50 dark:bg-slate-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <span>04 / Experience</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Work Experience
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
            Professional industry exposure and ongoing developer internship.
          </p>
        </div>

        {/* Experience Item */}
        <div className="max-w-3xl space-y-6">
          {EXPERIENCE.map((exp, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-7 relative overflow-hidden shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-medium mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{exp.status}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium mt-1">
                    <FaBuilding className="w-3.5 h-3.5" />
                    <span>{exp.company}</span>
                  </div>
                </div>

                <div className="text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700/60 self-start sm:self-auto">
                  {exp.type}
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-5">
                {exp.description}
              </p>

              <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                {exp.points.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <FaCircleCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
