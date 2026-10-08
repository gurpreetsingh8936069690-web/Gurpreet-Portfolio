import React from 'react';
import { EDUCATION, INTERESTS } from '../config/portfolioData';
import { FaGraduationCap, FaCompass, FaCode, FaMicrochip, FaTerminal, FaGlobe } from 'react-icons/fa6';

const INTEREST_ICONS = {
  'Full-Stack Product Development': FaGlobe,
  'Competitive Programming': FaTerminal,
  'Embedded Systems': FaMicrochip,
  'MERN Full-Stack Development': FaCode,
};

export default function Education() {
  return (
    <section id="education" className="py-20 border-b border-slate-200/80 dark:border-slate-900 bg-slate-100/50 dark:bg-slate-950/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <span>06 / Academics & Focus</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Education & Interests
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
            Formal engineering degree details and primary engineering interests.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Education Card */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-7 space-y-6 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400">
                <FaGraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Degree Program
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {EDUCATION.degree}
                </h3>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 dark:text-slate-400">Institution</span>
                <span className="text-slate-900 dark:text-slate-100 font-medium">{EDUCATION.university}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 dark:text-slate-400">Duration</span>
                <span className="text-slate-900 dark:text-slate-100 font-mono">{EDUCATION.duration}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 dark:text-slate-400">Academic Standing</span>
                <span className="text-slate-900 dark:text-slate-100">{EDUCATION.yearOfStudy}</span>
              </div>
              <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-100 dark:border-slate-800/80">
                <span className="text-slate-600 dark:text-slate-400 font-medium">Cumulative GPA</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono text-base">
                  {EDUCATION.cgpa} / 10.0
                </span>
              </div>
            </div>
          </div>

          {/* Interests Section */}
          <div className="lg:col-span-7">
            <div className="mb-4 flex items-center gap-2">
              <FaCompass className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="text-base font-semibold text-slate-900 dark:text-white tracking-tight">
                Areas of Technical Interest
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {INTERESTS.map((interest) => {
                const Icon = INTEREST_ICONS[interest.name] || FaCode;
                return (
                  <div
                    key={interest.name}
                    className="p-4 rounded-xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-xs"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {interest.name}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {interest.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
