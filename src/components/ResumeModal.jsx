import React, { useState, useEffect, useRef } from 'react';
import { useResume } from '../context/ResumeContext';
import { FaFileLines, FaXmark, FaArrowUpRightFromSquare, FaCircleExclamation } from 'react-icons/fa6';

export default function ResumeModal() {
  const { modalOpen, setModalOpen, effectiveUrl, saveResumeUrl } = useResume();
  const [inputUrl, setInputUrl] = useState(effectiveUrl || '');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (modalOpen) {
      setInputUrl(effectiveUrl || '');
      setError('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [modalOpen, effectiveUrl]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && modalOpen) setModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen, setModalOpen]);

  if (!modalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputUrl.trim();
    if (!trimmed) {
      setError('Please paste a valid Google Drive URL.');
      return;
    }
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      setError('URL must start with https:// (e.g., https://drive.google.com/...)');
      return;
    }
    saveResumeUrl(trimmed);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400">
              <FaFileLines className="w-4 h-4" />
            </div>
            <div>
              <h3
                id="resume-modal-title"
                className="text-base sm:text-lg font-bold text-slate-900 dark:text-white"
              >
                Google Drive Resume
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Configure or test the resume document link
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close dialog"
          >
            <FaXmark className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="resume-url-input"
              className="block text-xs font-mono font-medium uppercase text-slate-600 dark:text-slate-300 mb-1.5"
            >
              Google Drive Shareable Link:
            </label>
            <input
              ref={inputRef}
              id="resume-url-input"
              type="url"
              placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
              value={inputUrl}
              onChange={(e) => {
                setInputUrl(e.target.value);
                if (error) setError('');
              }}
              className="w-full px-3.5 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <FaCircleExclamation className="w-3.5 h-3.5" />
                <span>{error}</span>
              </p>
            )}
          </div>

          <div className="p-3 rounded-lg bg-blue-50/60 dark:bg-slate-800/60 border border-blue-100 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 space-y-1">
            <p className="font-semibold text-slate-800 dark:text-slate-200">
              💡 Google Drive Sharing Tip:
            </p>
            <p>
              In Google Drive, right-click your PDF → Click <strong>Share</strong> → Set General access to <strong>"Anyone with the link can view"</strong> → Copy & paste here.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-colors"
            >
              <span>Save & Open Resume</span>
              <FaArrowUpRightFromSquare className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
