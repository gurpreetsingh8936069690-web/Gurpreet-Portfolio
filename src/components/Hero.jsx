import React from 'react';
import { PERSONAL_INFO } from '../config/portfolioData';
import { useResume } from '../context/ResumeContext';
import {
  FaArrowRight,
  FaFileLines,
  FaArrowUpRightFromSquare,
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
} from 'react-icons/fa6';

export default function Hero() {
  const { handleOpenResume } = useResume();

  return (
    <section
      id="home"
      className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 border-b border-slate-200/80 dark:border-slate-900 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Introduction & Content Column */}
          <div className="lg:col-span-7 xl:col-span-7 order-2 lg:order-1">
            {/* Developer Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-3 sm:mb-4">
              {PERSONAL_INFO.name}
            </h1>

            {/* Subtitle / Title */}
            <h2 className="text-xl sm:text-2xl text-slate-700 dark:text-slate-300 font-semibold tracking-tight mb-4 sm:mb-5">
              {PERSONAL_INFO.title}
            </h2>

            {/* Statement */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mb-8">
              "{PERSONAL_INFO.heroStatement}"
            </p>

            {/* CTA Buttons - Sole Resume button on site */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-blue-400 group cursor-pointer"
              >
                <span>View Projects</span>
                <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* The Only Resume Button Across Website */}
              <button
                type="button"
                onClick={handleOpenResume}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 hover:border-slate-400 dark:bg-slate-900 dark:hover:bg-slate-850 dark:text-slate-100 dark:border-slate-700 dark:hover:border-slate-600 transition-all focus-visible:ring-2 focus-visible:ring-blue-400 group shadow-xs cursor-pointer"
                aria-label="View Resume via Google Drive"
              >
                <FaFileLines className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>View Resume</span>
                <FaArrowUpRightFromSquare className="w-3 h-3 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </button>
            </div>

            {/* Social Quick Links */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-slate-900/80 flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">Connect:</span>
              
              <a
                href={PERSONAL_INFO.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
                aria-label="GitHub Profile"
              >
                <FaGithub className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>

              <a
                href={PERSONAL_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedinIn className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>LinkedIn</span>
              </a>

              <a
                href={`mailto:${PERSONAL_INFO.social.email}`}
                className="inline-flex items-center gap-1.5 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
                aria-label="Send Email"
              >
                <FaEnvelope className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                <span>{PERSONAL_INFO.social.email}</span>
              </a>
            </div>
          </div>

          {/* Professional Photo Column */}
          <div className="lg:col-span-5 xl:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[340px] xl:max-w-[360px]">
              {/* Photo Card with clean border & subtle shadow */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
                <img
                  src="/gurpreet.jpg"
                  alt="Gurpreet Singh"
                  className="w-full h-auto object-cover object-top"
                  width="650"
                  height="650"
                  loading="eager"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
