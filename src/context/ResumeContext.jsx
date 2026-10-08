import React, { createContext, useContext, useState } from 'react';
import { RESUME_URL as DEFAULT_RESUME_URL } from '../config/portfolioData';

const ResumeContext = createContext();

export function ResumeProvider({ children }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [overrideUrl, setOverrideUrl] = useState(() => {
    return localStorage.getItem('gurpreet_resume_override') || '';
  });

  const getEffectiveUrl = () => {
    if (overrideUrl && (overrideUrl.startsWith('http://') || overrideUrl.startsWith('https://'))) {
      return overrideUrl;
    }
    if (
      DEFAULT_RESUME_URL &&
      (DEFAULT_RESUME_URL.startsWith('http://') || DEFAULT_RESUME_URL.startsWith('https://')) &&
      !DEFAULT_RESUME_URL.includes('PASTE_YOUR_GOOGLE_DRIVE')
    ) {
      return DEFAULT_RESUME_URL;
    }
    return '';
  };

  const handleOpenResume = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const effective = getEffectiveUrl();
    if (effective) {
      window.open(effective, '_blank', 'noopener,noreferrer');
    } else {
      setModalOpen(true);
    }
  };

  const saveResumeUrl = (url) => {
    const trimmed = url.trim();
    if (trimmed) {
      localStorage.setItem('gurpreet_resume_override', trimmed);
      setOverrideUrl(trimmed);
      window.open(trimmed, '_blank', 'noopener,noreferrer');
      setModalOpen(false);
    }
  };

  return (
    <ResumeContext.Provider
      value={{
        modalOpen,
        setModalOpen,
        effectiveUrl: getEffectiveUrl(),
        handleOpenResume,
        saveResumeUrl,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
