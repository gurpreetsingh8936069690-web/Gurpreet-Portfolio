import React from 'react';
import { PROJECTS } from '../config/portfolioData';
import {
  FaArrowUpRightFromSquare,
  FaCheck,
  FaMicrochip,
  FaDisplay,
  FaGithub,
} from 'react-icons/fa6';

export default function Projects() {
  return (
    <section id="projects" className="py-20 border-b border-slate-200/80 dark:border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <span>03 / Work</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Featured Projects
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
            Real projects demonstrating responsive frontend engineering and embedded hardware interfacing.
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {PROJECTS.map((project, idx) => {
            const isHardware = project.id === 'embedded-systems-projects';
            return (
              <article
                key={project.id}
                className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-xl p-6 flex flex-col justify-between transition-all shadow-xs"
              >
                <div>
                  {/* Category & Status */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-200 dark:border-blue-500/20">
                      {isHardware ? <FaMicrochip className="w-3.5 h-3.5" /> : <FaDisplay className="w-3.5 h-3.5" />}
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Key Highlights List */}
                  <div className="mb-6">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                      Key Highlights:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                      {project.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <FaCheck className="w-3 h-3 text-blue-600 dark:text-blue-400 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Links / Buttons */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white transition-colors shadow-xs"
                      aria-label={`Live Demo of ${project.title}`}
                    >
                      <FaArrowUpRightFromSquare className="w-3 h-3" />
                      <span>Live Demo</span>
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 transition-colors"
                      aria-label={`GitHub Repository for ${project.title}`}
                    >
                      <FaGithub className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}

                  {isHardware && (
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono italic">
                      Hardware interfacing & firmware
                    </span>
                  )}
                </div>
              </article>
            );
          })}

          {/* Future project can be added here */}
          {/* Note: In accordance with instructions, no placeholder cards are rendered to visitors */}
        </div>
      </div>
    </section>
  );
}
