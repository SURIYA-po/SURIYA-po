import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './AskQuestion.css';

const TOPICS = [
  'AI Agent Development',
  'Machine Learning / Data Science',
  'Full-Stack Web Development',
  'Backend API Development',
  'AI in Cybersecurity',
  'Freelance / Upwork Project',
  'Research Collaboration',
  'General Inquiry',
];

const GMAIL = 'pokhrelsurya703@gmail.com';
const MAX_MSG = 800;

function AskQuestion({ onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    topic: '',
    subject: '',
    message: '',
  });
  const panelRef = useRef(null);

  /* ── body scroll lock & close on Escape ── */
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  /* ── close on backdrop click ── */
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  /* ── field change ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > MAX_MSG) return;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ── submit → open Gmail compose ── */
  const handleSubmit = (e) => {
    e.preventDefault();
    const subjectLine = form.subject
      ? `[Portfolio Inquiry] ${form.topic ? `[${form.topic}] ` : ''}${form.subject}`
      : `[Portfolio Inquiry] ${form.topic || 'General Question'}`;

    const body = [
      `Hi Surya,`,
      ``,
      form.message,
      ``,
      `---`,
      `From : ${form.name}`,
      `Reply: ${form.email}`,
      `Topic: ${form.topic || 'General Inquiry'}`,
    ].join('\n');

    const gmailUrl =
      `https://mail.google.com/mail/?view=cm&fs=1` +
      `&to=${encodeURIComponent(GMAIL)}` +
      `&su=${encodeURIComponent(subjectLine)}` +
      `&body=${encodeURIComponent(body)}`;

    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  const modalContent = (
    <div className="aq-overlay" onClick={handleBackdrop} role="dialog" aria-modal="true">
      <div className="aq-panel" ref={panelRef}>

        {/* Close */}
        <button className="aq-close" onClick={onClose} aria-label="Close">✕</button>

        {submitted ? (
          /* ─── Success State ─── */
          <div className="aq-success">
            <div className="aq-success-icon">✉️</div>
            <h3 className="aq-success-title">Gmail Opened!</h3>
            <p className="aq-success-msg">
              Your message has been pre-filled in Gmail. Just hit <strong style={{ color: '#bef842' }}>Send</strong> and
              Surya will get back to you as soon as possible.
            </p>
            <button className="aq-success-close" onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            {/* ─── Header ─── */}
            <div className="aq-header">
              <p className="aq-eyebrow">[ Ask Me Anything ]</p>
              <h2 className="aq-title">Send a Question</h2>
              <p className="aq-subtitle">
                Fill in the form — it will open Gmail with everything pre-filled. One click to send.
              </p>
            </div>

            {/* ─── Form ─── */}
            <form className="aq-form" onSubmit={handleSubmit} noValidate>

              {/* Name + Email row */}
              <div className="aq-row">
                <div className="aq-field">
                  <label className="aq-label" htmlFor="aq-name">Your Name *</label>
                  <input
                    id="aq-name"
                    className="aq-input"
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                  />
                </div>
                <div className="aq-field">
                  <label className="aq-label" htmlFor="aq-email">Your Email *</label>
                  <input
                    id="aq-email"
                    className="aq-input"
                    type="email"
                    name="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Topic dropdown */}
              <div className="aq-field">
                <label className="aq-label" htmlFor="aq-topic">Topic</label>
                <select
                  id="aq-topic"
                  className="aq-select"
                  name="topic"
                  value={form.topic}
                  onChange={handleChange}
                >
                  <option value="">— Select a topic —</option>
                  {TOPICS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Subject */}
              <div className="aq-field">
                <label className="aq-label" htmlFor="aq-subject">Subject</label>
                <input
                  id="aq-subject"
                  className="aq-input"
                  type="text"
                  name="subject"
                  placeholder="Brief subject line…"
                  value={form.subject}
                  onChange={handleChange}
                />
              </div>

              {/* Message */}
              <div className="aq-field">
                <label className="aq-label" htmlFor="aq-message">Message *</label>
                <textarea
                  id="aq-message"
                  className="aq-textarea"
                  name="message"
                  required
                  placeholder="Describe your question or project idea in detail…"
                  value={form.message}
                  onChange={handleChange}
                />
                <span className="aq-char-count">
                  {form.message.length} / {MAX_MSG}
                </span>
              </div>

              <div className="aq-divider" />

              {/* Actions */}
              <div className="aq-actions">
                <button type="submit" className="aq-submit">
                  <span>📧</span> Open in Gmail
                </button>
                <button type="button" className="aq-cancel" onClick={onClose}>
                  Cancel
                </button>
              </div>

            </form>
          </>
        )}

      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}

export default AskQuestion;
