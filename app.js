// ═══════════════════════════════════════════════════════════════
//  PORTFOLIO CONFIG — Edit everything here to customize your site
// ═══════════════════════════════════════════════════════════════

const PORTFOLIO = {

  // ── Personal Info ────────────────────────────────────────────
  name: "Rohit Kumar Nayak",
  tagline: "Software Engineer & Creative Technologist",
  bio: "I am a Computer Science Engineering student specializing in AI and Machine Learning at DRIEMS University. Driven by a vision to modernize the current app ecosystem, I specialize in full-stack development with a relentless focus on emerging technologies. Beyond software, I am expanding my expertise into robotics, constantly learning and applying new skills to build projects that push the boundaries of modern applications.",
  location: "India",
  email: "rohitkumarnayak0001@gmail.com",

  // ── Nav Links ────────────────────────────────────────────────
  navLinks: [
    { label: "Projects", href: "#projects" },
    { label: "About",    href: "#about"    },
    { label: "Contact",  href: "#contact"  },
  ],

  // ── Social Links ─────────────────────────────────────────────
  socials: [
    { label: "GitHub",   href: "https://github.com/RohitNayak2006",              icon: "github"   },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rohit-kumar-nayak",  icon: "linkedin" },
    { label: "Twitter",  href: "https://x.com/_Rohit_Nayak",                     icon: "twitter"  },
  ],

  // ── Projects ─────────────────────────────────────────────────
  // Swap out image paths and project details as needed
  projects: [
    {
      id: "01",
      title: "Viora",
      subtitle: "Social Media App",
      description: "A new generation social media app built with latest technologies like one-to-one chat, reels, and photo sharing.",
      tags: ["React", "Node.js", "MongoDB", "Socket.io"],
      image: "viora-thumb.jpg",
      link: "https://vioraofficial.vercel.app/",
      year: "2026",
    },
    {
      id: "02",
      title: "Robotics Platform",
      subtitle: "Engineering / Robotics",
      description: "Real-time robotic control platform with ML-assisted motion planning, built for industrial automation pipelines.",
      tags: ["Python", "ROS", "ML", "C++"],
      image: "thumb2.png",
      link: "#",
      year: "2023",
    },
    {
      id: "03",
      title: "AI Medical Tool",
      subtitle: "AI / Healthcare",
      description: "A diagnostic assistance tool leveraging deep learning models for 3D dental scan analysis and automated segmentation.",
      tags: ["PyTorch", "DICOM", "React", "FastAPI"],
      image: "thumb3.png",
      link: "#",
      year: "2023",
    },
  ],

  // ── Skills ───────────────────────────────────────────────────
  skills: [
    "Web Development", "3D Graphics", "Robotics",
    "Creative Coding", "Backend Infrastructure", "WebGL",
    "Python", "React", "TypeScript", "Node.js",
  ],

  // ── Experience ───────────────────────────────────────────────
  experience: [
    {
      company: "Dentsply Sirona",
      role: "Software Engineer",
      period: "2023 – Present",
      description: "Built AI-powered 3D dental scan analysis tools for clinical workflows.",
    },
    {
      company: "Formlabs",
      role: "Software Engineer",
      period: "2022 – 2023",
      description: "Developed 3D printing software and toolchain infrastructure.",
    },
    {
      company: "Happly Robotics",
      role: "Robotics Engineer",
      period: "2021 – 2022",
      description: "Designed motion planning algorithms for industrial robotic arms.",
    },
    {
      company: "Make Me Pulse",
      role: "Creative Developer",
      period: "2019 – 2021",
      description: "Created award-winning interactive 3D web experiences and creative campaigns.",
    },
  ],

  // ── Loader text list (rolling animation) ─────────────────────
  loaderItems: [
    "Software Engineer", "Creative Technologist", "3D Developer",
    "Robotics Engineer", "AI Builder", "WebGL Enthusiast",
  ],
};

// ══════════════════════════════════════════════════════════════
//  RENDERER — No need to edit below this line
// ══════════════════════════════════════════════════════════════



function renderAll() {
  renderLoader();
  renderNav();
  renderHero();
  renderHeroPanels();       // floating project cards in hero
  renderCarousel();         // replaces flat renderProjects
  renderSkills();
  renderExperience();
  renderContact();
  renderFooter();
  initAnimations();
  initAboutTextAnimations(); // premium text animations for about section
  initStripes();
  initMobileMenu();
  initHeroCanvas();         // rotating wireframe sphere on hero
  initCarouselKeys();       // keyboard + Escape support
  initHeroPanelParallax();  // removed — panels now use CSS-only lift on hover

  // Kick off loader then reveal page
  startLoader();
}

// ── Loader ───────────────────────────────────────────────────
function renderLoader() {
  const el = document.getElementById("loader");
  if (!el) return;
  el.innerHTML = `
    <div class="loader-inner">
      <div class="loader-rolling">
        ${PORTFOLIO.loaderItems.map(i => `<div class="loader-item">${i}</div>`).join("")}
        <div class="loader-item">${PORTFOLIO.loaderItems[0]}</div>
      </div>
    </div>
  `;
}

function startLoader() {
  const overlay = document.getElementById("loader-overlay");
  const rolling = document.querySelector(".loader-rolling");
  if (!overlay || !rolling) return;

  let idx = 0;
  const total = PORTFOLIO.loaderItems.length;
  const itemH = 40;

  const tick = () => {
    idx++;
    rolling.style.transform = `translateY(-${idx * itemH}px)`;
    if (idx < total) {
      setTimeout(tick, 180);
    } else {
      setTimeout(() => {
        overlay.style.opacity = "0";
        overlay.style.pointerEvents = "none";
        setTimeout(() => overlay.remove(), 600);
      }, 300);
    }
  };
  setTimeout(tick, 400);
}

// ── Nav ───────────────────────────────────────────────────────
function renderNav() {
  const navLinks       = document.getElementById("nav-links");
  const mobileNavLinks = document.getElementById("mobile-nav-links");

  if (navLinks) {
    navLinks.innerHTML = PORTFOLIO.navLinks
      .map(l => `<li><a class="nav-link" href="${l.href}">${l.label}</a></li>`)
      .join("");
  }
  if (mobileNavLinks) {
    mobileNavLinks.innerHTML = PORTFOLIO.navLinks
      .map(l => `<li><a class="drawer-link" href="${l.href}">${l.label}</a></li>`)
      .join("");
  }

  // Render bottom-left socials in hero footer bar
  const heroSocials = document.getElementById("hero-socials");
  if (heroSocials) {
    heroSocials.innerHTML = PORTFOLIO.socials
      .map(s => `<a class="hero-social-link" href="${s.href}" target="_blank" rel="noopener">${s.label}</a>`)
      .join("");
  }
}

// ── Hero ──────────────────────────────────────────────────────
function renderHero() {
  const el = document.getElementById("hero-content");
  if (!el) return;
  el.innerHTML = `
    <div class="hero-text">
      <p class="hero-bio">${PORTFOLIO.bio}</p>
    </div>
  `;
}

// ══════════════════════════════════════════════════════════════
//  3D COVER-FLOW CAROUSEL
// ══════════════════════════════════════════════════════════════
let carouselIdx = 0;

function renderCarousel() {
  const el = document.getElementById("carousel-wrap");
  if (!el) return;

  el.innerHTML = `
    <div id="carousel-scene">
      <div id="carousel-track">
        ${PORTFOLIO.projects.map((p, i) => `
          <div class="carousel-card" data-idx="${i}">
            <img src="${p.image}" alt="${p.title}" class="carousel-card-image" loading="lazy" />
          </div>
        `).join("")}
      </div>
    </div>
  `;

  // ── Card click: side cards navigate, center card opens detail
  document.querySelectorAll(".carousel-card").forEach((card, i) => {
    card.addEventListener("click", () => {
      if (i === carouselIdx) {
        openProjectDetail(i);
      } else {
        carouselIdx = i;
        updateCarousel();
      }
    });
  });

  // ── Prev / Next buttons
  document.getElementById("carousel-prev")?.addEventListener("click", (e) => {
    e.stopPropagation();
    navigateCarousel(-1);
  });
  document.getElementById("carousel-next")?.addEventListener("click", (e) => {
    e.stopPropagation();
    navigateCarousel(1);
  });

  // ── Dot navigation
  document.querySelectorAll(".carousel-dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      carouselIdx = parseInt(dot.dataset.idx);
      updateCarousel();
    });
  });

  // ── Touch/swipe support
  let touchStartX = 0;
  const track = document.getElementById("carousel-track");
  track?.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  track?.addEventListener("touchend", (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) navigateCarousel(diff > 0 ? 1 : -1);
  });

  // Mouse drag support
  let isDragging = false;
  let mouseStartX = 0;
  track?.addEventListener("mousedown", (e) => {
    isDragging = true;
    mouseStartX = e.clientX;
  });
  track?.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    isDragging = false;
    const diff = mouseStartX - e.clientX;
    if (Math.abs(diff) > 50) navigateCarousel(diff > 0 ? 1 : -1);
  });
  track?.addEventListener("mouseleave", () => isDragging = false);

  updateCarousel();
}

function updateCarousel() {
  const cards = document.querySelectorAll(".carousel-card");
  const dots  = document.querySelectorAll(".carousel-dot");

  cards.forEach((card, i) => {
    const diff = i - carouselIdx;
    card.className = "carousel-card";
    if      (diff === 0)  card.classList.add("pos-center");
    else if (diff === -1) card.classList.add("pos-prev");
    else if (diff === 1)  card.classList.add("pos-next");
    else if (diff <= -2)  card.classList.add("pos-far-prev");
    else                  card.classList.add("pos-far-next");
  });

  // Update fan pagination
  const pagination = document.getElementById("fan-pagination");
  if (pagination) {
    const total = PORTFOLIO.projects.length;
    pagination.textContent = `0${carouselIdx + 1} — 0${total}`;
  }

  // Update dynamic preview
  const preview = document.getElementById("fan-preview");
  if (preview && PORTFOLIO.projects[carouselIdx]) {
    const p = PORTFOLIO.projects[carouselIdx];
    preview.classList.add("hidden");
    
    setTimeout(() => {
      preview.innerHTML = `
        <h3 class="fan-preview-title">${p.title}</h3>
        <div class="fan-preview-subtitle">${p.tags.join(" • ")}</div>
        <a href="${p.link}" target="_blank" class="fan-preview-link">View Project ↗</a>
      `;
      preview.classList.remove("hidden");
    }, 300);
  }
}

function navigateCarousel(dir) {
  const total = PORTFOLIO.projects.length;
  carouselIdx = (carouselIdx + dir + total) % total;
  updateCarousel();
}

// ══════════════════════════════════════════════════════════════
//  PROJECT DETAIL PANEL — full-screen slide in from right
// ══════════════════════════════════════════════════════════════
function openProjectDetail(idx) {
  const p       = PORTFOLIO.projects[idx];
  const detail  = document.getElementById("project-detail");
  const content = document.getElementById("detail-content");
  if (!detail || !content) return;

  content.innerHTML = `
    <div class="detail-body">
      <img src="${p.image}" alt="${p.title}" class="detail-image" />
      <div class="detail-meta">
        <span class="detail-subtitle">${p.subtitle}</span>
        <span class="detail-year">${p.year}</span>
      </div>
      <h2 class="detail-title">${p.title}</h2>
      <p class="detail-desc">${p.description}</p>
      <ul class="detail-tags">
        ${p.tags.map(t => `<li class="pill">${t}</li>`).join("")}
      </ul>
      <a href="${p.link}" target="_blank" rel="noopener" class="detail-link">
        View Project ↗
      </a>
    </div>
  `;

  detail.classList.add("open");
  document.body.style.overflow = "hidden";
  // Focus the close button for accessibility
  setTimeout(() => document.getElementById("detail-close")?.focus(), 50);
}

function closeProjectDetail() {
  const detailPanel = document.getElementById("project-detail");
  if (!detailPanel) return;

  detailPanel.classList.remove("open");
  // Restore body scroll
  document.body.style.overflow = "auto";
}
window.closeProjectDetail = closeProjectDetail;

// ── Keyboard navigation for carousel and detail panel ─────────
function initCarouselKeys() {
  document.addEventListener("keydown", (e) => {
    const detail = document.getElementById("project-detail");
    if (detail?.classList.contains("open")) {
      if (e.key === "Escape") closeProjectDetail();
    } else {
      if (e.key === "ArrowLeft")  navigateCarousel(-1);
      if (e.key === "ArrowRight") navigateCarousel(1);
    }
  });
}

// ── Skills ────────────────────────────────────────────────────
function renderSkills() {
  const el = document.getElementById("skills-list");
  if (!el) return;
  el.innerHTML = PORTFOLIO.skills
    .map(s => `<li class="pill">${s}</li>`)
    .join("");
}

// ── Experience ────────────────────────────────────────────────
function renderExperience() {
  const el = document.getElementById("experience-list");
  if (!el) return;
  el.innerHTML = PORTFOLIO.experience.map(e => `
    <li class="exp-item">
      <div class="exp-left">
        <span class="exp-period">${e.period}</span>
      </div>
      <div class="exp-right">
        <h4 class="exp-company">${e.company}</h4>
        <p class="exp-role">${e.role}</p>
        <p class="exp-desc">${e.description}</p>
      </div>
    </li>
  `).join("");
}

// ── Contact ───────────────────────────────────────────────────
function renderContact() {
  const el = document.getElementById("contact-content");
  if (!el) return;
  el.innerHTML = `
    <a href="mailto:${PORTFOLIO.email}" class="contact-email">${PORTFOLIO.email}</a>
    <ul class="contact-socials">
      ${PORTFOLIO.socials
        .map(s => `<li><a href="${s.href}" target="_blank" rel="noopener" class="nav-link">${s.label}</a></li>`)
        .join("")}
    </ul>
  `;
}

// ── Footer ────────────────────────────────────────────────────
function renderFooter() {
  const el = document.getElementById("footer-content");
  if (!el) return;
  el.innerHTML = `
    <span class="footer-name">${PORTFOLIO.name} &mdash; ${new Date().getFullYear()}</span>
    <div class="footer-right">
      <div class="footer-socials">
        ${PORTFOLIO.socials
          .map(s => `<a href="${s.href}" target="_blank" rel="noopener" class="footer-social-link">${s.label}</a>`)
          .join("")}
      </div>
      <a href="mailto:${PORTFOLIO.email}" class="footer-email">${PORTFOLIO.email}</a>
    </div>
  `;
}

// ── Background Stripes Animation ─────────────────────────────
function initStripes() {
  const container = document.getElementById("stripes-bg");
  if (!container) return;

  const projectImgs = PORTFOLIO.projects.map(p => p.image);
  const allImgs = [
    ...projectImgs, ...projectImgs, ...projectImgs,
    ...projectImgs, ...projectImgs, ...projectImgs,
  ];

  const NUM_STRIPES    = 4;
  const IMGS_PER_STRIPE = 6;

  let html = "";
  for (let s = 0; s < NUM_STRIPES; s++) {
    const direction = s % 2 === 0 ? "left" : "right";
    html += `<div class="stripe stripe-${direction}">`;
    for (let i = 0; i < IMGS_PER_STRIPE * 2; i++) {
      const src = allImgs[i % allImgs.length];
      html += `<div class="stripe-chunk"><img src="${src}" alt="" /></div>`;
    }
    html += `</div>`;
  }
  container.innerHTML = html;
}

// ── Scroll-triggered fade+slide animations ───────────────────
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".animate-in").forEach(el => observer.observe(el));

  // Nav link animated underline hover
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("mouseenter", () => link.classList.add("hovered"));
    link.addEventListener("mouseleave", () => link.classList.remove("hovered"));
  });

  // Copied email pill
  const emailEl = document.querySelector(".contact-email");
  if (emailEl) {
    emailEl.addEventListener("click", (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(PORTFOLIO.email).then(() => {
        const pill = document.getElementById("copied-pill");
        if (pill) {
          pill.classList.add("on");
          setTimeout(() => pill.classList.remove("on"), 2000);
        }
      });
    });
  }

  // ── Stats counter animation (count up on scroll) ──────────────
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll(".stat-number").forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        const duration = 1200;
        const steps = 40;
        const increment = target / steps;
        let current = 0;
        let step = 0;
        const timer = setInterval(() => {
          step++;
          current = Math.min(Math.round(increment * step), target);
          el.textContent = current;
          if (current >= target) clearInterval(timer);
        }, duration / steps);
      });
      statsObserver.unobserve(entry.target);
    });
  }, { threshold: 0.4 });

  const statsEl = document.querySelector(".about-stats");
  if (statsEl) statsObserver.observe(statsEl);
}

// ══════════════════════════════════════════════════════════════
//  ABOUT TEXT ANIMATIONS
//  Fires once when #about scrolls into view:
//  1. Curtain reveal on section labels
//  2. Character scramble on the heading
//  3. Word-by-word blur-fade on bio paragraphs (+ kinetic underline)
//  4. Letter stagger on experience company names
//  5. Gradient sweep on stat numbers
//  6. Badge pop-in with stagger on skill pills
// ══════════════════════════════════════════════════════════════

function scrambleText(el, finalText, duration = 1200) {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';
  const STEPS = 28;
  const ms    = duration / STEPS;
  let step = 0;

  // Store gradient class so we can restore it
  const hadGradient = el.classList.contains('about-gradient-heading');

  const tick = setInterval(() => {
    step++;
    const progress = step / STEPS;
    el.textContent = finalText.split('').map((char, i) => {
      if (char === ' ') return ' ';
      if (progress > (i / finalText.length) + 0.08) return char;
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    }).join('');

    if (step >= STEPS) {
      clearInterval(tick);
      el.textContent = finalText;
      // Gradient is CSS-applied — stays active automatically
    }
  }, ms);
}

function initAboutTextAnimations() {
  const about = document.getElementById('about');
  if (!about) return;

  // ── Pre-process: wrap section labels in curtain structure ────
  about.querySelectorAll('.section-label').forEach(label => {
    const text = label.textContent.trim();
    label.innerHTML = `<span class="curtain-inner">${text}</span>`;
    label.classList.add('curtain-wrap');
  });

  // ── Pre-process: split bio paragraphs into words ─────────────
  // Key phrases to underline kinetically
  const highlights = [
    'software engineer',
    'creative technologist',
    'AI-powered',
    'visually compelling',
    'full-stack engineering',
    'robotics',
    'creative coding',
  ];

  about.querySelectorAll('.about-bio-text').forEach((p, pi) => {
    let html = p.textContent.trim();
    // Wrap highlights first (before word-split)
    highlights.forEach((phrase, hi) => {
      const re = new RegExp(`(${phrase})`, 'gi');
      html = html.replace(re, `<span class="bio-highlight" style="--ud:${0.6 + hi * 0.12}s">$1</span>`);
    });
    // Now split non-highlighted text into word spans
    // We need to tokenize around existing span tags
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    let wordIdx = 0;
    tmp.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        const words = node.textContent.split(/( +)/);
        const frag = document.createDocumentFragment();
        words.forEach(token => {
          if (token.trim() === '') {
            frag.appendChild(document.createTextNode(token));
          } else {
            const span = document.createElement('span');
            span.className = 'word-reveal';
            span.style.setProperty('--i', wordIdx++);
            span.textContent = token;
            frag.appendChild(span);
          }
        });
        node.replaceWith(frag);
      } else if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('bio-highlight')) {
        // Wrap the highlight span itself as a word-reveal
        const wrapper = document.createElement('span');
        wrapper.className = 'word-reveal';
        wrapper.style.setProperty('--i', wordIdx++);
        node.parentNode?.insertBefore(wrapper, node);
        wrapper.appendChild(node);
      }
    });
    p.innerHTML = tmp.innerHTML;
  });

  // ── Pre-process: split experience company names into letters ──
  about.querySelectorAll('.exp-company').forEach((el, ci) => {
    const text = el.textContent;
    el.innerHTML = text.split('').map((char, li) =>
      char === ' '
        ? '&nbsp;'
        : `<span class="letter-reveal" style="--ci:${ci};--li:${li}">${char}</span>`
    ).join('');
    el.classList.add('exp-company-animated');
  });

  // Store heading original text for scramble
  const heading = about.querySelector('.about-gradient-heading');
  const headingText = heading?.textContent.trim() || '';

  // ── Main trigger: IntersectionObserver fires once on #about ───
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      // 1. Curtain reveal: labels slide in teal curtain, then out
      about.querySelectorAll('.curtain-wrap').forEach((label, i) => {
        setTimeout(() => {
          label.classList.add('curtain-in');
          setTimeout(() => label.classList.add('curtain-out'), 380);
        }, i * 160);
      });

      // 2. Heading scramble (slight delay so curtain leads)
      if (heading) {
        setTimeout(() => scrambleText(heading, headingText, 1300), 180);
      }

      // 3. Bio word blur-fade reveal (staggered per paragraph)
      about.querySelectorAll('.about-bio-text').forEach((p, pi) => {
        setTimeout(() => p.classList.add('words-visible'), 350 + pi * 120);
      });

      // 4. Experience company name letter stagger
      about.querySelectorAll('.exp-company-animated').forEach((el, ci) => {
        setTimeout(() => el.classList.add('letters-visible'), 500 + ci * 90);
      });

      // 5. Stat gradient sweep (starts after count-up nearly done)
      about.querySelectorAll('.stat-number').forEach(el => {
        setTimeout(() => {
          el.classList.add('sweeping');
        }, 1400);
      });
      about.querySelectorAll('.stat-plus').forEach(el => {
        setTimeout(() => el.classList.add('sweeping'), 1400);
      });

      // 6. Skill badge pop-in with stagger
      about.querySelectorAll('#skills-list .pill').forEach((pill, i) => {
        pill.style.animationDelay = `${600 + i * 55}ms`;
        pill.classList.add('pill-pop');
      });

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  observer.observe(about);
}

// ── Mobile Drawer ─────────────────────────────────────────────
function initMobileMenu() {
  const openBtn  = document.getElementById("mobile-menu-open");
  const closeBtn = document.getElementById("mobile-menu-close");
  const drawer   = document.getElementById("left-drawer");
  if (!drawer) return;

  openBtn?.addEventListener("click",  () => drawer.classList.add("open"));
  closeBtn?.addEventListener("click", () => drawer.classList.remove("open"));
  drawer.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => drawer.classList.remove("open"));
  });
}

// ══════════════════════════════════════════════════════════════
//  HERO CANVAS — rotating wireframe sphere (Fibonacci distribution)
// ══════════════════════════════════════════════════════════════
function initHeroCanvas() {
  const canvas = document.getElementById("hero-3d");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let angle = 0;
  let dpr = window.devicePixelRatio || 1;

  function resize() {
    const rect = canvas.getBoundingClientRect();
    dpr = window.devicePixelRatio || 1;
    canvas.width  = rect.width  * dpr;
    canvas.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener("resize", resize);
  resize();

  // ── Generate Fibonacci sphere points ────────────────────────
  const NUM_POINTS   = 130;
  const goldenAngle  = Math.PI * (3 - Math.sqrt(5));
  const pts = [];
  for (let i = 0; i < NUM_POINTS; i++) {
    const y  = 1 - (i / (NUM_POINTS - 1)) * 2;
    const r  = Math.sqrt(Math.max(0, 1 - y * y));
    const th = goldenAngle * i;
    pts.push({ x: Math.cos(th) * r, y, z: Math.sin(th) * r });
  }

  // ── Pre-compute edges between nearby points ──────────────────
  const CONNECT_SQ = 0.52 * 0.52;
  const edges = [];
  for (let i = 0; i < NUM_POINTS; i++) {
    for (let j = i + 1; j < NUM_POINTS; j++) {
      const dx = pts[i].x - pts[j].x;
      const dy = pts[i].y - pts[j].y;
      const dz = pts[i].z - pts[j].z;
      if (dx*dx + dy*dy + dz*dz < CONNECT_SQ) edges.push([i, j]);
    }
  }

  // ── Project a 3D point to 2D with perspective ───────────────
  function project(p, cx, cy, R, a) {
    // Y-axis rotation
    const cosA = Math.cos(a), sinA = Math.sin(a);
    const rx  =  p.x * cosA + p.z * sinA;
    const rz  = -p.x * sinA + p.z * cosA;
    // Gentle X-axis tilt
    const tilt = 0.28;
    const ry2  =  p.y * Math.cos(tilt) - rz * Math.sin(tilt);
    const rz2  =  p.y * Math.sin(tilt) + rz * Math.cos(tilt);
    // Perspective divide
    const fov  = 2.8;
    const sc   = fov / (fov + rz2 + 1.2);
    return { x: cx + rx * sc * R, y: cy + ry2 * sc * R, sc, depth: rz2 };
  }

  // ── Animation loop ───────────────────────────────────────────
  function draw() {
    const W  = canvas.width  / dpr;
    const H  = canvas.height / dpr;
    const cx = W * 0.5;
    const cy = H * 0.5;
    const R  = Math.min(W, H) * 0.42;

    ctx.clearRect(0, 0, W, H);

    const proj = pts.map(p => project(p, cx, cy, R, angle));

    // Draw edges
    for (const [i, j] of edges) {
      const a = proj[i], b = proj[j];
      const alpha = ((a.sc + b.sc) * 0.35).toFixed(2);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = `rgba(10,107,88,${alpha})`;
      ctx.lineWidth   = 0.75;
      ctx.stroke();
    }

    // Draw vertices
    for (const p of proj) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.5, 2.2 * p.sc), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(10,107,88,${(p.sc * 0.85).toFixed(2)})`;
      ctx.fill();
    }

    angle += 0.006;
    requestAnimationFrame(draw);
  }

  draw();
}

// ══════════════════════════════════════════════════════════════
//  FLOATING HERO PANELS — project cards in the hero centre
// ══════════════════════════════════════════════════════════════
function renderHeroPanels() {
  const el = document.getElementById("hero-panels");
  if (!el) return;

  el.innerHTML = PORTFOLIO.projects.map((p, i) => `
    <div class="hero-panel" data-idx="${i}" title="${p.title}">
      <div class="hero-panel-body">
        <img src="${p.image}" alt="${p.title}" class="hero-panel-image" />
        <span class="hero-panel-subtitle">${p.subtitle}</span>
        <h3 class="hero-panel-title">${p.title}</h3>
        <div class="hero-panel-tags">
          ${p.tags.slice(0, 3).map(t => `<span class="hero-panel-tag">${t}</span>`).join("")}
        </div>
      </div>
    </div>
  `).join("");

  // Clicking a panel scrolls to and activates the carousel at that project
  el.querySelectorAll(".hero-panel").forEach((card, i) => {
    card.addEventListener("click", () => {
      carouselIdx = i;
      updateCarousel();
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
    });
  });
}

// ── Mouse-parallax removed — panels lift on hover via CSS only ─
function initHeroPanelParallax() {
  // no-op: replaced with CSS :hover { transform: translateY(-14px) }
}

// ══════════════════════════════════════════════════════════════
//  INITIALIZATION
// ══════════════════════════════════════════════════════════════
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderAll);
} else {
  renderAll();
}
