import React from 'react';
import './AboutPage.css';

/* =============================================
   ALL personal data lives here — easy to edit
   ============================================= */
const PERSONAL = {
  name: 'Surya Pokhrel',
  title: 'AI Engineer',
  subtitle: 'Back-End Developer',
  email: 'pokhrelsurya703@gmail.com',
  phone: '+977-9826110703',
  location: 'Imadol, Lalitpur, Nepal',
  github: 'https://github.com/SURIYA-po',
  linkedin: 'https://linkedin.com/in/pokhrelsurya-z',
  upwork: 'https://www.upwork.com/freelancers/~01a58c5d929441a2dc',
  whatsapp: 'https://wa.me/9779826110703',
  summary:
    'Final-year Information Technology engineering student with hands-on experience in machine learning, deep learning, agentic AI systems, and cybersecurity. Developing a multi-agent autonomous cyber defense framework at IAC, NAST and delivering AI/ML training to students. Seeking opportunities in AI engineering, machine learning, and data science.',
};

const STATS = [
  { num: '3.8', label: 'GPA / 4.0', suffix: '' },
  { num: '5+', label: 'Projects Built', suffix: '' },
  { num: '2+', label: 'Years Experience', suffix: '' },
  { num: '1', label: 'NAST Research Accepted', suffix: '' },
];

const TIMELINE = [
  {
    id: 1,
    icon: '🎓',
    type: 'education',
    role: 'B.E. in Information Technology',
    org: 'Pokhara University — NCIT, Lalitpur',
    period: 'Jun 2022 – Sep 2026 (Expected)',
    isCurrent: true,
    location: '📍 Lalitpur, Nepal',
    bullets: [
      'GPA: 3.8 / 4.0 — merit-based scholarship for academic excellence.',
      'Coursework: OOP, DSA, Databases, OS, Networks, Discrete Math, Data Science, Machine Learning.',
      'Led and participated in team software projects spanning AI, IoT, and full-stack web development.',
    ],
  },
  {
    id: 2,
    icon: '💻',
    type: 'volunteer',
    role: 'Member — Curriculum & Web Development',
    org: 'HP Tech Student Club, NCIT',
    period: 'Sep 2022 – Jun 2024',
    isCurrent: false,
    location: '📍 Lalitpur, Nepal',
    bullets: [
      'Delivered short courses and technical workshops on programming and software engineering to fellow students.',
      'Collaborated on designing and developing websites for the club and external clients.',
    ],
  },
  {
    id: 3,
    icon: '🔒',
    type: 'achievement',
    role: 'IntelliScan — Automated Network Defense Monitor',
    org: 'Personal Project',
    period: '2023',
    isCurrent: false,
    location: '🌐 Python · scikit-learn · Streamlit',
    bullets: [
      'Engineered an ML-powered network security dashboard that classifies intrusions in real time from raw log data.',
      'Built end-to-end Python pipeline with interactive Streamlit interface, dynamic threat visualizations, and automated alerts.',
    ],
  },
  {
    id: 4,
    icon: '🌱',
    type: 'achievement',
    role: 'Krishi Sathi — IoT Smart Farming Application',
    org: 'Personal Project',
    period: '2024',
    isCurrent: false,
    location: '🌐 React Native · Firebase · ESP32 · IoT',
    bullets: [
      'Cross-platform mobile app integrated with ESP32 IoT sensors streaming real-time soil quality metrics from fields.',
      'Firebase Realtime Database for continuous synchronization and live monitoring across distributed IoT devices.',
    ],
  },
  {
    id: 5,
    icon: '📊',
    type: 'achievement',
    role: 'ML & Data Analysis Portfolio',
    org: 'Personal Project',
    period: '2024 – 2025',
    isCurrent: false,
    location: '🌐 Python · scikit-learn · Pandas · NumPy · Matplotlib',
    bullets: [
      'Cancer detection (classification), house price prediction (regression), IPL data analysis (EDA), Iris flower classification.',
      'Published complete documented notebooks at github.com/SURIYA-po/Data-Analysis.',
    ],
  },
  {
    id: 6,
    icon: '📋',
    type: 'achievement',
    role: 'Sajilo Hajiri — Digital Attendance Management System',
    org: 'Personal Project',
    period: '2025',
    isCurrent: false,
    location: '🌐 React · Django REST Framework · PostgreSQL',
    bullets: [
      'Full-stack digital attendance platform with automated session tracking and role-based dashboards.',
      'Attendance alerts, detailed reporting modules, and CSV export functionality with secure backend APIs.',
    ],
  },
  {
    id: 7,
    icon: '🤖',
    type: 'work',
    role: 'AI Engineer Intern — Agentic AI & AI/ML Trainer',
    org: 'IAC - Information Access Centre, NAST',
    period: 'Apr 2026 – Present',
    isCurrent: true,
    location: '📍 Lalitpur, Nepal',
    bullets: [
      'Architected Cyber Surakshya — a five-agent autonomous cybersecurity framework submitted to Nepal Academy of Science & Technology, integrating ML intrusion detection, LLM threat reasoning, and RL-based automated response.',
      'Designed agent pipeline (Detection, Analysis, Decision, Response, Coordinator) with Redis pub/sub messaging, FastAPI REST layer, and React monitoring dashboard.',
      'Trained ensemble models (Random Forest, Extra Trees, HistGradientBoosting) on CICIDS2017 dataset; integrated locally-hosted LLMs via Ollama for contextual threat analysis.',
      'Delivered structured AI/ML training sessions covering machine learning, prompt engineering, cybersecurity, and digital literacy to students and professionals.',
    ],
  },
  {
    id: 8,
    icon: '🏆',
    type: 'achievement',
    role: 'NAST Research Proposal Accepted',
    org: 'Nepal Academy of Science and Technology',
    period: 'June 2026',
    isCurrent: false,
    location: '📍 Kathmandu, Nepal',
    bullets: [
      'Co-authored and submitted Cyber Surakshya — a funded multi-agent AI cybersecurity research proposal — accepted by NAST.',
      'Recognised as a legitimate scientific research contribution to national cybersecurity infrastructure.',
    ],
  },
];

const SKILLS = [
  {
    icon: '⌨️',
    name: 'Languages',
    tags: ['Python', 'Java', 'JavaScript', 'TypeScript', 'C/C++', 'SQL', 'PHP'],
  },
  {
    icon: '🧠',
    name: 'AI / ML & Data',
    tags: ['PyTorch', 'scikit-learn', 'NumPy', 'Pandas', 'Matplotlib', 'Hugging Face', 'LangChain', 'Pinecone'],
  },
  {
    icon: '🤖',
    name: 'Agentic AI & LLMs',
    tags: ['LangGraph', 'Ollama', 'FastAPI', 'Prompt Engineering', 'RAG', 'Multi-Agent Systems'],
  },
  {
    icon: '🌐',
    name: 'Web & Backend',
    tags: ['React', 'Spring Boot', 'Node.js', 'Django REST Framework', 'React Native'],
  },
  {
    icon: '🗄️',
    name: 'Databases',
    tags: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'Redis'],
  },
  {
    icon: '🛠️',
    name: 'DevOps & Tools',
    tags: ['Docker', 'Git', 'Streamlit', 'Linux', 'Postman'],
  },
];

const PROJECTS = [
  {
    id: 1,
    icon: '🛡️',
    name: 'Cyber Surakshya',
    year: '2026 — Active',
    desc: 'Multi-agent autonomous cybersecurity framework submitted to NAST. Five-agent pipeline with ML intrusion detection, LLM threat reasoning, Redis pub/sub messaging, and automated response (IP blocking, firewall rules).',
    stack: ['Python', 'PyTorch', 'FastAPI', 'Redis', 'React', 'Docker', 'Ollama'],
    link: 'https://github.com/SURIYA-po',
    featured: true,
  },
  {
    id: 2,
    icon: '📋',
    name: 'Sajilo Hajiri',
    year: '2025',
    desc: 'Full-stack digital attendance management system with role-based dashboards for admins, teachers, and students. Real-time updates, alert notifications, and CSV reporting.',
    stack: ['React', 'Django REST', 'PostgreSQL'],
    link: 'https://github.com/SURIYA-po',
    featured: false,
  },
  {
    id: 3,
    icon: '🌱',
    name: 'Krishi Sathi',
    year: '2024',
    desc: 'IoT smart farming app with React Native frontend integrating real-time ESP32 sensor data via Firebase for soil quality monitoring across agricultural fields.',
    stack: ['React Native', 'Firebase', 'ESP32', 'IoT'],
    link: 'https://github.com/SURIYA-po',
    featured: false,
  },
  {
    id: 4,
    icon: '🔒',
    name: 'IntelliScan',
    year: '2023',
    desc: 'Automated network defense monitor — ML classification pipeline with Streamlit dashboard delivering real-time threat visualizations and automated security alerts.',
    stack: ['Python', 'scikit-learn', 'Streamlit', 'ML'],
    link: 'https://github.com/SURIYA-po',
    featured: false,
  },
];

const AWARDS = [
  {
    emoji: '🏅',
    title: 'Merit Scholarship',
    desc: 'Awarded merit-based scholarship by Pokhara University for academic excellence and consistently maintaining a 3.8/4.0 GPA throughout the B.E. program.',
  },
  {
    emoji: '🔬',
    title: 'NAST Research Accepted',
    desc: 'Co-authored Cyber Surakshya — a funded multi-agent AI cybersecurity proposal accepted by Nepal Academy of Science and Technology in June 2026.',
  },
  {
    emoji: '📚',
    title: 'AI/ML Trainer',
    desc: 'Delivered structured AI/ML training to students and working professionals, covering machine learning, prompt engineering, and cybersecurity at NAST.',
  },
];

const LANGUAGES = [
  { flag: '🇳🇵', name: 'Nepali', level: 'Native', pct: 100 },
  { flag: '🇬🇧', name: 'English', level: 'Professional Working', pct: 85 },
  { flag: '🇮🇳', name: 'Hindi', level: 'Fluent', pct: 80 },
];

const INTERESTS = [
  { emoji: '🤖', label: 'Agentic AI' },
  { emoji: '🔒', label: 'Cybersecurity' },
  { emoji: '🧬', label: 'Deep Learning' },
  { emoji: '💻', label: 'Open Source' },
  { emoji: '📊', label: 'Data Science' },
  { emoji: '🌱', label: 'IoT & Embedded' },
  { emoji: '🏔️', label: 'Hiking (Nepal)' },
  { emoji: '📖', label: 'Research' },
];

/* =============================================
   COMPONENT
   ============================================= */
const AboutPage = () => {
  return (
    <div className="about-page">

      {/* ====== HERO ====== */}
      <section className="about-hero">
        <div className="about-hero-inner">

          {/* Photo */}
          <div className="about-photo-wrap">
            <div className="about-photo-ring">
              <div className="about-photo-inner" />
            </div>
            <span className="about-badge">⚡ Open to Opportunities</span>
          </div>

          {/* Text */}
          <div className="about-hero-text">
            <p className="about-hero-label">About Me</p>

            <h1 className="about-hero-name">
              {PERSONAL.name.split(' ')[0]}{' '}
              <span>{PERSONAL.name.split(' ')[1]}</span>
            </h1>

            <p className="about-hero-title">
              <strong>{PERSONAL.title}</strong> &amp; {PERSONAL.subtitle}
            </p>

            <p className="about-hero-desc">{PERSONAL.summary}</p>

            <div className="about-hero-meta">
              <span className="about-meta-item">
                <span className="about-meta-icon">📍</span>
                {PERSONAL.location}
              </span>
              <span className="about-meta-item">
                <span className="about-meta-icon">📧</span>
                {PERSONAL.email}
              </span>
              <span className="about-meta-item">
                <span className="about-meta-icon">📞</span>
                {PERSONAL.phone}
              </span>
            </div>

            <div className="about-hero-socials">
              <a href={PERSONAL.upwork} className="about-social-btn primary" target="_blank" rel="noopener noreferrer">
                <img src="/assets/upwork.svg" alt="Upwork" />
                Hire Me
              </a>
              <a href={PERSONAL.github} className="about-social-btn secondary" target="_blank" rel="noopener noreferrer">
                <img src="/assets/github.svg" alt="GitHub" />
                GitHub
              </a>
              <a href={PERSONAL.linkedin} className="about-social-btn secondary" target="_blank" rel="noopener noreferrer">
                <img src="/assets/linkedin.svg" alt="LinkedIn" />
                LinkedIn
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ====== STATS ====== */}
      <div className="about-stats">
        <div className="about-stats-inner">
          {STATS.map((s, i) => (
            <div className="about-stat-item" key={i}>
              <div className="about-stat-num">{s.num}</div>
              <div className="about-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ====== TIMELINE ====== */}
      <div className="about-timeline-wrap">
        <div className="about-section" style={{ paddingTop: 0, paddingBottom: 0 }}>
          <div className="about-section-header">
            <div className="about-section-title-group">
              <p className="about-section-tag">[ Journey ]</p>
              <h2 className="about-section-title">My Life Timeline</h2>
              <div className="about-section-line" />
            </div>
          </div>
        </div>

        <div className="about-timeline" style={{ maxWidth: 900, margin: '0 auto' }}>
          {TIMELINE.map((item) => (
            <div className="about-tl-item" key={item.id}>
              <div className={`about-tl-dot${item.isCurrent ? ' is-current' : ''}`} />

              <div className="about-tl-card">
                <div className="about-tl-top">
                  <span className="about-tl-icon">{item.icon}</span>
                  <div className="about-tl-header">
                    <p className="about-tl-role">{item.role}</p>
                    <p className="about-tl-org">{item.org}</p>
                  </div>
                  <span className={`about-tl-period${item.isCurrent ? ' active' : ''}`}>
                    {item.isCurrent ? '🟢 ' : ''}{item.period}
                  </span>
                </div>

                <p className="about-tl-location">{item.location}</p>

                <ul className="about-tl-bullets">
                  {item.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                </ul>

                <span className={`about-tl-tag ${item.type}`}>
                  {item.type === 'work' && '💼 Work'}
                  {item.type === 'education' && '🎓 Education'}
                  {item.type === 'volunteer' && '🤝 Volunteer'}
                  {item.type === 'achievement' && '⭐ Project / Achievement'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="about-divider" />

      {/* ====== SKILLS ====== */}
      <div className="about-section">
        <div className="about-section-header">
          <div className="about-section-title-group">
            <p className="about-section-tag">[ Expertise ]</p>
            <h2 className="about-section-title">Skills &amp; Technologies</h2>
            <div className="about-section-line" />
          </div>
        </div>

        <div className="about-skills-grid">
          {SKILLS.map((cat, i) => (
            <div className="about-skill-category" key={i}>
              <div className="about-skill-cat-header">
                <span className="about-skill-cat-icon">{cat.icon}</span>
                <span className="about-skill-cat-name">{cat.name}</span>
              </div>
              <div className="about-skill-tags">
                {cat.tags.map((tag, ti) => (
                  <span className="about-skill-tag" key={ti}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="about-divider" />

      {/* ====== PROJECTS ====== */}
      <div className="about-section">
        <div className="about-section-header">
          <div className="about-section-title-group">
            <p className="about-section-tag">[ Work ]</p>
            <h2 className="about-section-title">Featured Projects</h2>
            <div className="about-section-line" />
          </div>
        </div>

        <div className="about-projects-grid">
          {PROJECTS.map((proj) => (
            <div
              className={`about-project-card${proj.featured ? ' featured' : ''}`}
              key={proj.id}
            >
              {/* Left col of featured card, or full single card */}
              <div>
                <div className="about-proj-top">
                  <span className="about-proj-icon">{proj.icon}</span>
                  <span className="about-proj-year">{proj.year}</span>
                </div>
                <h3 className="about-proj-name">{proj.name}</h3>
                <p className="about-proj-desc">{proj.desc}</p>
                <div className="about-proj-stack">
                  {proj.stack.map((t, ti) => (
                    <span className="about-proj-tech" key={ti}>{t}</span>
                  ))}
                </div>
                <a className="about-proj-link" href={proj.link} target="_blank" rel="noopener noreferrer">
                  View on GitHub →
                </a>
              </div>

              {/* Right col only for featured (shows visual badge) */}
              {proj.featured && (
                <div style={{
                  background: 'linear-gradient(135deg, rgba(190,248,66,0.08), rgba(190,248,66,0.02))',
                  border: '1px dashed rgba(190,248,66,0.25)',
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '28px',
                  gap: '12px',
                  textAlign: 'center',
                }}>
                  <span style={{ fontSize: '48px' }}>🏆</span>
                  <p style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', margin: 0 }}>
                    NAST Accepted Research
                  </p>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '12px', margin: 0, lineHeight: 1.6 }}>
                    Submitted to Nepal Academy of Science &amp; Technology as a funded research proposal — June 2026.
                  </p>
                  <span style={{
                    background: 'var(--color-accent-dim)',
                    border: '1px solid var(--color-accent-border)',
                    color: 'var(--color-accent)',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                  }}>
                    Active Development
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ====== AWARDS ====== */}
      <div className="about-awards-section">
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="about-section-header" style={{ paddingTop: 0 }}>
            <div className="about-section-title-group">
              <p className="about-section-tag">[ Recognition ]</p>
              <h2 className="about-section-title">Awards &amp; Achievements</h2>
              <div className="about-section-line" />
            </div>
          </div>
        </div>
        <div className="about-awards-grid">
          {AWARDS.map((a, i) => (
            <div className="about-award-card" key={i}>
              <span className="about-award-emoji">{a.emoji}</span>
              <p className="about-award-title">{a.title}</p>
              <p className="about-award-desc">{a.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="about-divider" />

      {/* ====== LANGUAGES + INTERESTS ====== */}
      <div className="about-section">
        <div className="about-section-header">
          <div className="about-section-title-group">
            <p className="about-section-tag">[ More About Me ]</p>
            <h2 className="about-section-title">Languages &amp; Interests</h2>
            <div className="about-section-line" />
          </div>
        </div>

        <div className="about-lang-interests">
          {/* Languages */}
          <div className="about-lang-card">
            <p className="about-lang-title">🗣️ Languages I Speak</p>
            <div className="about-lang-list">
              {LANGUAGES.map((lang, i) => (
                <div className="about-lang-item" key={i}>
                  <span className="about-lang-flag">{lang.flag}</span>
                  <div className="about-lang-info">
                    <p className="about-lang-name">{lang.name}</p>
                    <p className="about-lang-level">{lang.level}</p>
                  </div>
                  <div className="about-lang-bar-wrap">
                    <div className="about-lang-bar" style={{ width: `${lang.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="about-interest-card">
            <p className="about-interest-title">✨ Interests &amp; Passions</p>
            <div className="about-interest-tags">
              {INTERESTS.map((it, i) => (
                <span className="about-interest-tag" key={i}>
                  <span className="interest-emoji">{it.emoji}</span>
                  {it.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ====== CTA ====== */}
      <div className="about-cta">
        <div className="about-cta-inner">
          <p className="about-cta-eyebrow">[ Let's Connect ]</p>
          <h2 className="about-cta-title">
            Ready to build something <span>incredible?</span>
          </h2>
          <p className="about-cta-sub">
            Whether it's an AI system, a backend API, or a research collaboration — I'm actively looking for opportunities where I can contribute and grow.
          </p>
          <div className="about-cta-btns">
            <a href={PERSONAL.whatsapp} className="about-cta-btn lime" target="_blank" rel="noopener noreferrer">
              💬 Contact on WhatsApp
            </a>
            <a href={PERSONAL.upwork} className="about-cta-btn ghost" target="_blank" rel="noopener noreferrer">
              🚀 Hire on Upwork
            </a>
            <a href={`mailto:${PERSONAL.email}`} className="about-cta-btn ghost">
              📧 Send Email
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutPage;
