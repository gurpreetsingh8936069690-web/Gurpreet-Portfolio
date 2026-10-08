import React from 'react';
import { SKILL_CATEGORIES } from '../config/portfolioData';
import {
  FaCode,
  FaGlobe,
  FaMicrochip,
  FaWrench,
  FaBookOpen,
  FaBrain,
} from 'react-icons/fa6';

const CATEGORY_ICONS = {
  Languages: FaCode,
  'Web Development': FaGlobe,
  'Embedded Systems': FaMicrochip,
  'Tools & Design': FaWrench,
  'Core Computer Science': FaBookOpen,
  'Emerging Technology': FaBrain,
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 border-b border-slate-200/80 dark:border-slate-900 bg-slate-100/50 dark:bg-slate-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <span>02 / Technical Stack</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Skills & Competencies
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
            Structured skill areas spanning systems programming, embedded hardware, modern web development, and foundational computer science.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.category] || FaCode;
            return (
              <div
                key={cat.category}
                className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-5 hover:border-slate-300 dark:hover:border-slate-700 transition-colors flex flex-col justify-between shadow-xs"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800/80">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100 tracking-tight">
                      {cat.category}
                    </h3>
                  </div>

                  {/* Skills Badges */}
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 text-xs font-medium text-slate-700 dark:text-slate-200"
                      >
                        <span>{skill.name}</span>
                        {skill.level && (
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.5 rounded tracking-wide ${
                              skill.level === 'Currently Learning'
                                ? 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-500/30'
                                : 'bg-amber-500/10 dark:bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/25'
                            }`}
                          >
                            {skill.level}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note on honesty and learning progress */}
        <div className="mt-8 p-4 rounded-lg bg-white/60 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Currently focused on daily MERN stack practice and data structures in competitive programming.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
