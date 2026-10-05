/* ─── NAVBAR SCROLL STATE ─────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

/* ─── HAMBURGER MENU ─────────────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ─── ACTIVE NAV HIGHLIGHT ───────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

function highlightNav() {
  const scrollPos = window.scrollY + 80;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        navAnchors.forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}
window.addEventListener('scroll', highlightNav, { passive: true });

/* ─── TYPED HERO TEXT ─────────────────────────────────────────────────── */
const phrases = [
  'Software Engineer',
  'AI Systems Builder',
  'LLM Pipeline Engineer',
  'Backend Architect',
  'Agentic AI Developer',
];
let phraseIndex = 0;
let charIndex   = 0;
let isDeleting  = false;
const typedEl   = document.getElementById('typedText');

function typeLoop() {
  const current = phrases[phraseIndex];

  if (!isDeleting) {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting  = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, isDeleting ? 50 : 80);
}
typeLoop();

/* ─── SCROLL REVEAL ───────────────────────────────────────────────────── */
const revealEls = document.querySelectorAll(
  '.section-title, .about-text, .about-stats, .skill-group, .timeline-item, ' +
  '.project-card, .edu-card, .achievement-card, .contact-card, .resume-cta'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

revealEls.forEach(el => revealObserver.observe(el));

/* ─── PROJECT VIDEO TOGGLES ──────────────────────────────────────────── */
document.querySelectorAll('.project-video-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const projectId = btn.dataset.project;
    const wrap      = document.getElementById(`video-${projectId}`);
    if (!wrap) return;

    const isOpen = wrap.classList.contains('active');

    // Toggle this one
    wrap.classList.toggle('active');

    // Update button text
    if (wrap.classList.contains('active')) {
      btn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
        Hide Demo`;
    } else {
      btn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
        Watch Demo`;
    }

    // Smooth scroll to show the video section
    if (!isOpen) {
      setTimeout(() => {
        wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  });
});

// Also handle small demo buttons
document.querySelectorAll('.project-video-btn-sm').forEach(btn => {
  btn.addEventListener('click', () => {
    const projectId = btn.dataset.project;
    const wrap      = document.getElementById(`video-${projectId}`);
    if (!wrap) return;

    const isOpen = wrap.classList.contains('active');
    wrap.classList.toggle('active');

    if (wrap.classList.contains('active')) {
      btn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
        Hide`;
    } else {
      btn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="5 3 19 12 5 21 5 3"/>
        </svg>
        Demo`;
    }

    if (!isOpen) {
      setTimeout(() => {
        wrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  });
});

/* ─── RESUME MODAL ───────────────────────────────────────────────────── */
const resumeModal      = document.getElementById('resumeModal');
const closeResumeModal = document.getElementById('closeResumeModal');

function openModal() {
  resumeModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  resumeModal.classList.remove('active');
  document.body.style.overflow = '';
}

// Hero card preview button (by ID)
document.getElementById('previewResumeBtn').addEventListener('click', openModal);

// Contact section preview button (by class, may be multiple)
document.querySelectorAll('.preview-resume-btn').forEach(btn => {
  btn.addEventListener('click', openModal);
});

closeResumeModal.addEventListener('click', closeModal);

resumeModal.addEventListener('click', (e) => {
  if (e.target === resumeModal) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

/* ─── SMOOTH SCROLL FOR ALL ANCHOR LINKS ─────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
