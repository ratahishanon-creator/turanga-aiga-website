/* ===== Theme toggle ===== */
(function () {
  const t = document.querySelector('[data-theme-toggle]'),
    r = document.documentElement;
  let d = matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
  r.setAttribute('data-theme', d);
  const icon = (mode) =>
    mode === 'dark'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  if (t) {
    t.innerHTML = icon(d);
    t.addEventListener('click', () => {
      d = d === 'dark' ? 'light' : 'dark';
      r.setAttribute('data-theme', d);
      t.setAttribute('aria-label', 'Switch to ' + (d === 'dark' ? 'light' : 'dark') + ' mode');
      t.innerHTML = icon(d);
    });
  }
})();

/* ===== Sticky header shadow ===== */
(function () {
  const h = document.getElementById('header');
  const onScroll = () => h.classList.toggle('header--scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ===== Mobile nav ===== */
(function () {
  const btn = document.getElementById('menuBtn'),
    nav = document.getElementById('mobileNav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  nav.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    })
  );
})();

/* ===== 12 Modules ===== */
const MODULES = [
  ['01', 'Find Your People', 'Meet the crew, set your goals and settle in. A safe space from day one.'],
  ['02', 'Know Yourself', 'Explore who you are and what wellbeing means through Te Whare Tapa Whā.'],
  ['03', 'First Cuts', 'Pick up the tools and make your first cuts, plus mindfulness to steady the hands.'],
  ['04', 'Own the Chair', 'Learn to listen, connect and make every client feel at ease.'],
  ['05', 'Every Head, Every Story', 'Master different hair types and cut with respect for every culture.'],
  ['06', 'Present Yourself', 'How to present yourself, your work, your kit and your kōrero, so clients and employers back you.'],
  ['07', 'Lift Others Up', 'Step into leadership by mentoring your mates. Tuakana teina in action.'],
  ['08', 'Sharpen Your Craft', 'Level up with precision fades, advanced scissor work and pro standards.'],
  ['09', 'Run Your Own Barber Shop', 'Take the reins: run your own book, manage money and marketing, and learn to run a barber shop of your own one day.'],
  ['10', 'Plan Your Future', 'Build your CV, map your next move into employment, apprenticeship or study, and set a real plan for the future.'],
  ['11', 'Give Back', 'Take your skills into the community and deliver free cuts that matter.'],
  ['12', 'Celebrate the Journey', 'Showcase your growth to whānau, collect your certificate, stand proud.'],
];
(function () {
  const list = document.getElementById('modules');
  if (!list) return;
  list.innerHTML = MODULES.map(
    ([n, title, theme]) =>
      `<li class="module reveal"><span class="module__num">Module ${n}</span>
       <h3 class="module__title">${title}</h3>
       <p class="module__theme">${theme}</p></li>`
  ).join('');
})();

/* ===== Scroll reveal ===== */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach((e) => e.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  els.forEach((e) => io.observe(e));
})();

/* ===== Count-up stats ===== */
(function () {
  const nums = document.querySelectorAll('.stat__num[data-count]');
  const run = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const dur = 2600;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (!('IntersectionObserver' in window)) {
    nums.forEach((n) => (n.textContent = n.dataset.count + (n.dataset.suffix || '')));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          run(en.target);
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  nums.forEach((n) => io.observe(n));
})();

/* ===== Year ===== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ===== Pathways tabs ===== */
(function () {
  const tabs = document.querySelectorAll('.pathways__tab');
  if (!tabs.length) return;
  const panels = document.querySelectorAll('.pathways__panel');
  function activate(name) {
    tabs.forEach((t) => {
      const on = t.dataset.tab === name;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    panels.forEach((p) => {
      const on = p.id === 'tab-' + name;
      p.classList.toggle('is-active', on);
      if (on) { p.hidden = false; } else { p.hidden = true; }
    });
  }
  tabs.forEach((t) => t.addEventListener('click', () => activate(t.dataset.tab)));
})();
