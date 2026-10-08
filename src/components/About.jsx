import React from 'react';
import { PERSONAL_INFO, EDUCATION, INTERESTS } from '../config/portfolioData';
import {
  FaGraduationCap,
  FaMicrochip,
  FaLayerGroup,
  FaCircleCheck,
} from 'react-icons/fa6';

export default function About() {
  return (
    <section id="about" className="py-20 border-b border-slate-200/80 dark:border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <span>01 / Background</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            About Me
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main narrative */}
          <div className="lg:col-span-7 space-y-5 text-slate-700 dark:text-slate-300 text-base leading-relaxed">
            <p>
              I am a third-year <strong className="text-slate-900 dark:text-white font-semibold">B.Tech Computer Science Engineering</strong> student at{' '}
              <span className="text-slate-900 dark:text-white font-medium">{PERSONAL_INFO.university}</span> with a CGPA of{' '}
              <span className="text-blue-600 dark:text-blue-400 font-semibold">{PERSONAL_INFO.cgpa}</span>.
            </p>

            <p>
              My hands-on technical background includes embedded systems prototyping using the{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">Arduino IDE</strong> and{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">ESP8266 / ESP-12E</strong> microcontrollers, where I have worked with GPIO, PWM, sensors, motor/servo control, and serial communication.
            </p>

            <p>
              Currently, I am actively expanding into <strong className="text-slate-900 dark:text-white font-semibold">MERN Full-Stack Development</strong> while reinforcing core computer science fundamentals and basic Java knowledge.
            </p>

            <p>
              I am primarily interested in building practical software and embedded-system projects, focusing on full-stack product development and competitive programming.
            </p>
          </div>

          {/* Key Facts / Highlights Card */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-6 shadow-xs">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 tracking-wide uppercase font-mono">
              Academic & Technical Overview
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 shrink-0">
                  <FaGraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Education</div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white">{EDUCATION.degree}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{EDUCATION.university} ({EDUCATION.duration})</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shrink-0">
                  <FaCircleCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Current CGPA</div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white">{EDUCATION.cgpa} / 10.0</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Third-Year Standing</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400 shrink-0">
                  <FaLayerGroup className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Software Track</div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white">MERN Full-Stack Development</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Currently learning & applying</div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-purple-600 dark:text-purple-400 shrink-0">
                  <FaMicrochip className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Hardware & IoT Track</div>
                  <div className="text-sm font-medium text-slate-900 dark:text-white">ESP8266 & Arduino Systems</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Microcontrollers, GPIO & sensors</div>
                </div>
              </div>
            </div>

            {/* Core Focus Tags */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-2.5 font-mono">Key Interests:</span>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((item) => (
                  <span
                    key={item.name}
                    className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
