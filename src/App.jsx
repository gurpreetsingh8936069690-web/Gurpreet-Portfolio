import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ResumeProvider } from './context/ResumeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';

export default function App() {
  return (
    <ThemeProvider>
      <ResumeProvider>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 bg-grid-pattern flex flex-col font-sans transition-colors duration-200 selection:bg-blue-600 selection:text-white">
          <Navbar />
          <main id="main-content" className="flex-1">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Achievements />
            <Education />
            <Contact />
          </main>
          <Footer />
          <ResumeModal />
        </div>
      </ResumeProvider>
    </ThemeProvider>
  );
}
