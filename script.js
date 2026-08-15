/* =========================================================
   EDITABLE PERSONAL DATA — fill these in for her

   PHOTOS TO ADD (drop into the /images folder):
   - images/hero-bg.jpg           → background photo behind the hero section
   - images/message-photo.jpg     → photo shown next to the gift message
   - images/profile.jpg           → circular profile photo
   - images/memory01.jpg ...15    → the memories gallery
   - images/achievement-graduation.jpg
   - images/achievement-academic.jpg
   - images/achievement-certificates.jpg
   - images/achievement-activities.jpg
   - images/achievement-leadership.jpg
   - images/achievement-award.jpg → the achievement cards
========================================================= */
const graduate = {
  name: "[NASTEHA ABDULLHI MOHAMED]",
  school: "[RAINBOW P.S.S]",
  graduationYear: "[2026]",
  favoriteSubject: "[ENGLISH]",
  achievementSummary: "Waxad ku guulaysatay dugsigaga sare adigo oo natiijo wanaagsan ku baastey, dadaal joogto ah iyo hufnaan muujisay sanadihii wax barashada oo dhan.",
  overallResult: "[OVERALL RESULT]",
  message: "Today is more than a result. It is a reminder of how far you have come. Congratulations on completing this chapter of your life. May everything ahead of you be even more beautiful."
};

// Exactly 15 memory photos — edit captions/paths as needed
const memories = [
  { src: "images/memory01.jpg", title: "School Days" },
  { src: "images/memory02.jpg", title: "First School Memories" },
  { src: "images/memory03.jpg", title: "Best Friends" },
  { src: "images/memory04.jpg", title: "Classroom Moments" },
  { src: "images/memory05.jpg", title: "School Activities" },
  { src: "images/memory06.jpg", title: "Special Event" },
  { src: "images/memory07.jpg", title: "Achievement Day" },
  { src: "images/memory08.jpg", title: "Certificate Moment" },
  { src: "images/memory09.jpg", title: "Favorite Memory" },
  { src: "images/memory10.jpg", title: "Friends Together" },
  { src: "images/memory11.jpg", title: "Graduation Preparation" },
  { src: "images/memory12.jpg", title: "Graduation Day" },
  { src: "images/memory13.jpg", title: "Graduation Outfit" },
  { src: "images/memory14.jpg", title: "Final School Memory" },
  { src: "images/memory15.jpg", title: "New Beginning 🎓" }
];

document.addEventListener("DOMContentLoaded", () => {
  applyGraduateData();
  initIcons();
  initStars();
  initHeroBg();
  initNav();
  initReveal();
  initEnvelope();
  initResultBars();
  initSkillBars();
  initTimelineFill();
  buildGallery();
  initLightbox();
  initRipples();
  initReplay();
});

/* ---------- personal data ---------- */
function applyGraduateData(){
  const map = {
    heroName: graduate.name,
    heroYear: graduate.graduationYear,
    profileName: graduate.name,
    profileSchool: graduate.school,
    profileYear: graduate.graduationYear,
    profileSubject: graduate.favoriteSubject,
    profileAchievement: graduate.achievementSummary,
    overallResult: graduate.overallResult,
    finalName: graduate.name
  };
  Object.entries(map).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  });
  const msg = document.getElementById("messageText");
  if (msg) msg.textContent = graduate.message;

  // profile image fallback
  const img = document.getElementById("profileImg");
  const fallback = document.getElementById("profileFallback");
  if (img && fallback){
    img.addEventListener("error", () => { img.style.display = "none"; fallback.style.display = "flex"; });
    fallback.style.display = "none";
  }

  // message photo fallback
  const mImg = document.getElementById("messagePhotoImg");
  const mFallback = document.getElementById("messagePhotoFallback");
  if (mImg && mFallback){
    mImg.addEventListener("error", () => { mImg.style.display = "none"; mFallback.style.display = "flex"; });
    mFallback.style.display = "none";
  }

  // achievement photo fallbacks
  document.querySelectorAll(".achieve-photo").forEach(wrap => {
    const img = wrap.querySelector("img");
    const fb = wrap.querySelector(".achieve-photo-fallback");
    if (!img || !fb) return;
    fb.style.display = "none";
    img.addEventListener("error", () => { img.style.display = "none"; fb.style.display = "flex"; });
  });
}

/* ---------- hero background photo ---------- */
function initHeroBg(){
  const img = document.getElementById("heroBgImg");
  if (!img) return;
  const show = () => img.classList.add("loaded");
  if (img.complete && img.naturalWidth > 0) show();
  img.addEventListener("load", show);
  img.addEventListener("error", () => { img.remove(); }); // keep the ambient gradient look if no photo yet
}

/* ---------- icons ---------- */
function initIcons(){
  // Phosphor icons are a webfont — they render automatically from their
  // "ph ph-*" classes, so no JS re-render step is needed. Kept as a
  // no-op so the rest of the code (which calls initIcons() after
  // injecting new markup) doesn't need to change.
}

/* ---------- ambient stars ---------- */
function initStars(){
  const wrap = document.getElementById("stars");
  if (!wrap) return;
  const count = window.innerWidth < 700 ? 22 : 40;
  for (let i = 0; i < count; i++){
    const s = document.createElement("span");
    s.className = "star-dot";
    s.style.top = Math.random() * 100 + "%";
    s.style.left = Math.random() * 100 + "%";
    s.style.animationDelay = (Math.random() * 4) + "s";
    wrap.appendChild(s);
  }
}

/* ---------- nav ---------- */
function initNav(){
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  const navLinkEls = Array.from(document.querySelectorAll(".nav-link"));

  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 30);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  navLinkEls.forEach(a => a.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));

  // scrollspy
  const sections = navLinkEls.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const id = "#" + entry.target.id;
        navLinkEls.forEach(a => a.classList.toggle("active", a.getAttribute("href") === id));
      }
    });
  }, { rootMargin: "-45% 0px -45% 0px" });
  sections.forEach(s => spy.observe(s));
}

/* ---------- scroll reveal ---------- */
function initReveal(){
  const items = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(el => io.observe(el));
}

/* ---------- gift envelope ---------- */
function initEnvelope(){
  const wrap = document.getElementById("envelopeWrap");
  const btn = document.getElementById("envelopeBtn");
  const burst = document.getElementById("heartsBurst");
  if (!btn) return;

  btn.addEventListener("click", () => {
    if (wrap.classList.contains("opened")) return;
    wrap.classList.add("opened");
    btn.setAttribute("aria-expanded", "true");
    spawnHearts(burst);
    const card = document.getElementById("messageCard");
    card.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

function spawnHearts(container){
  const icons = ["ph-heart", "ph-sparkle", "ph-star"];
  for (let i = 0; i < 14; i++){
    const span = document.createElement("span");
    span.className = "heart-particle";
    const angle = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 90;
    span.style.setProperty("--dx", Math.cos(angle) * dist + "px");
    span.style.setProperty("--dy", Math.sin(angle) * dist - 30 + "px");
    span.style.setProperty("--rot", (Math.random() * 60 - 30) + "deg");
    span.style.animationDelay = (Math.random() * 0.3) + "s";
    span.style.fontSize = (14 + Math.random() * 10) + "px";
    span.innerHTML = `<i class="ph ${icons[i % icons.length]}"></i>`;
    container.appendChild(span);
    setTimeout(() => span.remove(), 1800);
  }
}

/* ---------- results progress bars ---------- */
function initResultBars(){
  const bars = document.querySelectorAll(".result-bar span");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const target = entry.target.dataset.target || "0%";
        entry.target.style.setProperty("--val", target);
        entry.target.style.width = target;
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(b => io.observe(b));
}

/* ---------- skill bars ---------- */
function initSkillBars(){
  const skills = document.querySelectorAll(".skill");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const el = entry.target;
        const target = parseInt(el.dataset.target || "0", 10);
        const fill = el.querySelector(".skill-fill");
        const pct = el.querySelector(".skill-pct");
        fill.style.width = target + "%";
        let current = 0;
        const step = () => {
          current += Math.max(1, Math.round(target / 30));
          if (current >= target){ current = target; }
          pct.textContent = current + "%";
          if (current < target) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  skills.forEach(s => io.observe(s));
}

/* ---------- timeline fill ---------- */
function initTimelineFill(){
  const timeline = document.getElementById("timeline");
  const fill = document.getElementById("timelineFill");
  if (!timeline || !fill) return;
  const update = () => {
    const rect = timeline.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height;
    const visible = Math.min(Math.max(vh * 0.75 - rect.top, 0), total);
    fill.style.height = Math.min((visible / total) * 100, 100) + "%";
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

/* ---------- gallery ---------- */
const placeholderGradients = [
  "linear-gradient(135deg,#2563EB,#EC4899)",
  "linear-gradient(135deg,#EF4444,#EC4899)",
  "linear-gradient(135deg,#050505,#2563EB)",
  "linear-gradient(135deg,#EC4899,#111827)",
  "linear-gradient(135deg,#60A5FA,#EF4444)"
];

function buildGallery(){
  const gallery = document.getElementById("gallery");
  if (!gallery) return;
  memories.forEach((m, i) => {
    const card = document.createElement("div");
    card.className = "photo-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Open memory ${i + 1}: ${m.title}`);
    card.style.transitionDelay = Math.min(i * 60, 500) + "ms";

    const grad = placeholderGradients[i % placeholderGradients.length];
    card.innerHTML = `
      <div class="photo-media">
        <img src="${m.src}" alt="${m.title}" loading="lazy">
        <div class="photo-placeholder" style="--ph-grad:${grad}; display:none;">
          <i class="ph ph-image"></i>
          <span>Add ${m.src.split('/').pop()}</span>
        </div>
        <span class="photo-num">${String(i + 1).padStart(2, "0")} / 15</span>
        <i class="ph ph-camera photo-cam"></i>
        <div class="photo-overlay"><span class="photo-caption">${m.title}</span></div>
      </div>
    `;

    const img = card.querySelector("img");
    const ph = card.querySelector(".photo-placeholder");
    img.addEventListener("error", () => { img.style.display = "none"; ph.style.display = "flex"; });

    card.addEventListener("click", () => openLightbox(i));
    card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " "){ e.preventDefault(); openLightbox(i); } });

    gallery.appendChild(card);
  });

  initIcons();

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".photo-card").forEach(c => io.observe(c));
}

/* ---------- lightbox ---------- */
let currentIndex = 0;
function initLightbox(){
  const lb = document.getElementById("lightbox");
  document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
  document.getElementById("lightboxPrev").addEventListener("click", () => stepLightbox(-1));
  document.getElementById("lightboxNext").addEventListener("click", () => stepLightbox(1));
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") stepLightbox(-1);
    if (e.key === "ArrowRight") stepLightbox(1);
  });
}

function openLightbox(index){
  currentIndex = index;
  renderLightbox();
  document.getElementById("lightbox").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeLightbox(){
  document.getElementById("lightbox").classList.remove("open");
  document.body.style.overflow = "";
}
function stepLightbox(dir){
  currentIndex = (currentIndex + dir + memories.length) % memories.length;
  renderLightbox();
}
function renderLightbox(){
  const m = memories[currentIndex];
  const wrap = document.getElementById("lightboxImgWrap");
  const grad = placeholderGradients[currentIndex % placeholderGradients.length];
  wrap.innerHTML = `
    <img src="${m.src}" alt="${m.title}">
    <div class="photo-placeholder" style="--ph-grad:${grad}; display:none; border-radius:18px;">
      <i class="ph ph-image"></i><span>Add ${m.src.split('/').pop()}</span>
    </div>
  `;
  const img = wrap.querySelector("img");
  const ph = wrap.querySelector(".photo-placeholder");
  img.addEventListener("error", () => { img.style.display = "none"; ph.style.display = "flex"; });
  document.getElementById("lightboxTitle").textContent = m.title;
  document.getElementById("lightboxCounter").textContent = `${currentIndex + 1} / ${memories.length}`;
  initIcons();
}

/* ---------- ripple buttons ---------- */
function initRipples(){
  document.querySelectorAll(".ripple").forEach(btn => {
    btn.addEventListener("click", function(e){
      const rect = this.getBoundingClientRect();
      const circle = document.createElement("span");
      const size = Math.max(rect.width, rect.height);
      circle.className = "ripple-circle";
      circle.style.width = circle.style.height = size + "px";
      circle.style.left = (e.clientX - rect.left - size / 2) + "px";
      circle.style.top = (e.clientY - rect.top - size / 2) + "px";
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 650);
    });
  });
}

/* ---------- replay journey ---------- */
function initReplay(){
  const btn = document.getElementById("replayBtn");
  if (!btn) return;
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const burstHost = document.body;
    for (let i = 0; i < 18; i++){
      const s = document.createElement("span");
      s.textContent = ["✨", "🎓", "💫"][i % 3];
      s.style.position = "fixed";
      s.style.left = Math.random() * 100 + "vw";
      s.style.top = "100vh";
      s.style.fontSize = (14 + Math.random() * 14) + "px";
      s.style.zIndex = "500";
      s.style.pointerEvents = "none";
      s.style.transition = "transform 1.6s ease-out, opacity 1.6s ease-out";
      burstHost.appendChild(s);
      requestAnimationFrame(() => {
        s.style.transform = `translateY(-${60 + Math.random() * 40}vh) rotate(${Math.random()*360}deg)`;
        s.style.opacity = "0";
      });
      setTimeout(() => s.remove(), 1700);
    }
  });
}
