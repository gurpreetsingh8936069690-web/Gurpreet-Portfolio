import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO, CONTACT_CONFIG } from '../config/portfolioData';
import {
  submitContactForm,
  getLocalSubmissions,
  exportSubmissionsToCSV,
  clearLocalSubmissions,
} from '../utils/contactService';
import {
  FaEnvelope,
  FaPhone,
  FaLinkedinIn,
  FaGithub,
  FaCopy,
  FaCheck,
  FaArrowUpRightFromSquare,
  FaPaperPlane,
  FaSpinner,
  FaCircleCheck,
  FaDatabase,
  FaDownload,
  FaUser,
  FaTag,
  FaCommentDots,
  FaTrashCan,
  FaXmark,
} from 'react-icons/fa6';

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [statusMessage, setStatusMessage] = useState('');
  const [submittedLead, setSubmittedLead] = useState(null);

  // Database Modal State
  const [showDbModal, setShowDbModal] = useState(false);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    setSubmissions(getLocalSubmissions());

    const handleUpdate = (e) => {
      setSubmissions(e.detail || []);
    };
    window.addEventListener('portfolio_submissions_updated', handleUpdate);
    return () => window.removeEventListener('portfolio_submissions_updated', handleUpdate);
  }, []);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setStatusMessage('');

    try {
      const res = await submitContactForm(formData);
      setSubmitStatus('success');
      setStatusMessage(res.message);
      setSubmittedLead({ ...formData });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmissions(getLocalSubmissions());
    } catch (err) {
      setSubmitStatus('error');
      setStatusMessage(err.message || 'Failed to submit message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 border-b border-slate-200/80 dark:border-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              <span>07 / Get In Touch</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Let's Connect
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl">
              Interested in collaborating, discussing software or embedded projects, or exploring developer opportunities? Send a message directly below or reach out via direct channels.
            </p>
          </div>

          {/* Database Leads Badge / Counter */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowDbModal(true)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              title="View responses database & export leads CSV"
            >
              <FaDatabase className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Database Leads:</span>
              <span className="px-1.5 py-0.2 rounded-full bg-blue-600 text-white font-bold text-[10px]">
                {submissions.length}
              </span>
            </button>
          </div>
        </div>

        {/* 2-Column Layout: Direct Details on Left, Interactive Contact Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Methods (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Email Card */}
            <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <FaEnvelope className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Email
                    </div>
                    <a
                      href={`mailto:${PERSONAL_INFO.social.email}`}
                      className="text-sm font-semibold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors break-all"
                    >
                      {PERSONAL_INFO.social.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => copyToClipboard(PERSONAL_INFO.social.email, 'email')}
                  className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Copy email address"
                  title="Copy email"
                >
                  {copiedEmail ? <FaCheck className="w-3.5 h-3.5 text-emerald-500" /> : <FaCopy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <FaPhone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Phone
                    </div>
                    <a
                      href={`tel:${PERSONAL_INFO.social.phoneTel}`}
                      className="text-sm font-semibold text-slate-900 dark:text-slate-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-mono"
                    >
                      {PERSONAL_INFO.social.phone}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => copyToClipboard(PERSONAL_INFO.social.phone, 'phone')}
                  className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Copy phone number"
                  title="Copy phone"
                >
                  {copiedPhone ? <FaCheck className="w-3.5 h-3.5 text-emerald-500" /> : <FaCopy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Social Links Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* LinkedIn */}
              <a
                href={PERSONAL_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs hover:border-sky-500 dark:hover:border-sky-500/50 transition-colors group flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-sky-50 dark:bg-sky-950/50 flex items-center justify-center text-sky-600 dark:text-sky-400 group-hover:scale-105 transition-transform">
                  <FaLinkedinIn className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    LinkedIn
                  </div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate group-hover:text-sky-600 dark:group-hover:text-sky-400">
                    Gurpreet Singh
                  </div>
                </div>
              </a>

              {/* GitHub */}
              <a
                href={PERSONAL_INFO.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-xs hover:border-slate-400 dark:hover:border-slate-600 transition-colors group flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-800 dark:text-slate-200 group-hover:scale-105 transition-transform">
                  <FaGithub className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    GitHub
                  </div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    gurpreetsingh...
                  </div>
                </div>
              </a>
            </div>

            {/* Availability Box */}
            <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 text-xs text-slate-600 dark:text-slate-300">
              <div className="font-semibold text-slate-900 dark:text-slate-100 mb-1 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Quick Response Guaranteed</span>
              </div>
              <p>
                Responses are routed directly to <strong>{CONTACT_CONFIG.targetEmail}</strong> and logged into the leads database for review.
              </p>
            </div>
          </div>

          {/* Right Column: The Contact Card Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                  <FaPaperPlane className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Send a Message</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Fill in your details below. Responses are automatically emailed and stored.
                </p>
              </div>

              {/* Success Notification */}
              {submitStatus === 'success' ? (
                <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-center animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-3">
                    <FaCircleCheck className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                    Message Delivered & Logged!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{submittedLead?.name}</strong>. Your details have been sent to <strong>{CONTACT_CONFIG.targetEmail}</strong> and saved in the submissions database.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitStatus(null)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer"
                  >
                    <span>Send Another Message</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Error Notification */}
                  {submitStatus === 'error' && (
                    <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-400">
                      {statusMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <FaUser className="w-3.5 h-3.5" />
                        </div>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="e.g. John Doe"
                          className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Your Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <FaEnvelope className="w-3.5 h-3.5" />
                        </div>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="e.g. john@example.com"
                          className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Subject / Purpose
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <FaTag className="w-3.5 h-3.5" />
                      </div>
                      <input
                        id="contact-subject"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="e.g. Internship Opportunity / Project Collaboration"
                        className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <textarea
                        id="contact-message"
                        name="message"
                        rows="4"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Write your message or inquiry here..."
                        className="w-full p-3 rounded-lg text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <FaSpinner className="w-4 h-4 animate-spin" />
                          <span>Delivering & Saving...</span>
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-center text-slate-500 dark:text-slate-400 mt-2">
                      🔒 Submissions are delivered to {CONTACT_CONFIG.targetEmail} and saved to your leads database.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Database Submissions Modal for Gurpreet to View Captured Leads */}
      {showDbModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-scale-up">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <FaDatabase className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    Captured Contact Database
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {submissions.length} total lead(s) recorded from your portfolio
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {submissions.length > 0 && (
                  <button
                    type="button"
                    onClick={exportSubmissionsToCSV}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer"
                  >
                    <FaDownload className="w-3 h-3" />
                    <span>Download CSV</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowDbModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <FaXmark className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Content / Table */}
            <div className="p-6 overflow-y-auto flex-1">
              {submissions.length === 0 ? (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400 text-sm">
                  <FaDatabase className="w-8 h-8 mx-auto mb-2 text-slate-400 dark:text-slate-600" />
                  <p className="font-medium text-slate-700 dark:text-slate-300">No submissions recorded yet</p>
                  <p className="text-xs mt-1">When someone sends a message through the contact card, their details will appear here and in your email.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {submissions.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-200/80 dark:border-slate-700/80">
                        <div className="font-bold text-slate-900 dark:text-white text-sm">
                          {item.name}
                        </div>
                        <div className="font-mono text-slate-500 dark:text-slate-400 text-[11px]">
                          {item.dateString}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                        <div>
                          <span className="text-slate-500 dark:text-slate-400 font-mono">Email: </span>
                          <a href={`mailto:${item.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                            {item.email}
                          </a>
                        </div>
                        <div>
                          <span className="text-slate-500 dark:text-slate-400 font-mono">Subject: </span>
                          <span className="text-slate-800 dark:text-slate-200">{item.subject}</span>
                        </div>
                      </div>

                      <div className="mt-2 pt-2 border-t border-slate-200/50 dark:border-slate-700/50">
                        <span className="text-slate-500 dark:text-slate-400 font-mono block mb-1">Message:</span>
                        <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed bg-white dark:bg-slate-900/80 p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-800">
                          {item.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            {submissions.length > 0 && (
              <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/40">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Are you sure you want to clear stored submissions?')) {
                      clearLocalSubmissions();
                    }
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400 hover:underline cursor-pointer"
                >
                  <FaTrashCan className="w-3 h-3" />
                  <span>Clear All Submissions</span>
                </button>
                <span className="text-[11px] font-mono text-slate-400">
                  Data persists across browser sessions
                </span>
              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
