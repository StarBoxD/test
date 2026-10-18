// İnteraktif Arka Plan Takımyıldız, Kayan Yıldız, Şok Dalgası & 3D Tilt Motoru (60/120 FPS Optimize)

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundParticles();
  initCursorAndSpotlights();
  initClickRipples();
  initScrollProgress();
});

function initCursorAndSpotlights() {
  const cursorGlow = document.getElementById('cursor-glow');
  let lastCard = null;
  let rafPending = false;
  let lastEvent = null;

  window.addEventListener('pointermove', (e) => {
    lastEvent = e;
    if (rafPending) return;
    rafPending = true;

    requestAnimationFrame(() => {
      rafPending = false;
      const ev = lastEvent;
      if (!ev) return;

      if (cursorGlow && ev.pointerType === 'mouse') {
        cursorGlow.style.opacity = '1';
        cursorGlow.style.transform = `translate3d(${ev.clientX - 210}px, ${ev.clientY - 210}px, 0)`;
      }

      const card = ev.target && ev.target.closest ? ev.target.closest('.spotlight-card') : null;
      if (lastCard && lastCard !== card) {
        lastCard.style.setProperty('--rx', '0deg');
        lastCard.style.setProperty('--ry', '0deg');
      }
      lastCard = card;

      if (card) {
        const rect = card.getBoundingClientRect();
        const x = ev.clientX - rect.left;
        const y = ev.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x.toFixed(0)}px`);
        card.style.setProperty('--mouse-y', `${y.toFixed(0)}px`);

        if (ev.pointerType === 'mouse') {
          const rx = ((y - rect.height / 2) / (rect.height / 2)) * -4;
          const ry = ((x - rect.width / 2) / (rect.width / 2)) * 4;
          card.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
          card.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
        }
      }
    });
  }, { passive: true });
}

function initClickRipples() {
  window.addEventListener('pointerdown', (e) => {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = `${e.clientX}px`;
    ripple.style.top = `${e.clientY}px`;
    document.body.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  }, { passive: true });
}

function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = `${docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0}%`;
    });
  }, { passive: true });
}

function initBackgroundParticles() {
  const canvas = document.getElementById('bg-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }, { passive: true });

  const count = width < 640 ? 18 : 36;
  const colors = ['#818cf8', '#38bdf8', '#34d399', '#c084fc'];
  const particles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 1.7 + 0.8,
    color: colors[Math.floor(Math.random() * colors.length)],
    alpha: Math.random() * 0.5 + 0.2
  }));

  let shootingStar = null;
  setInterval(() => {
    if (!document.hidden && !shootingStar && Math.random() > 0.35) {
      shootingStar = {
        x: Math.random() * width * 0.8,
        y: Math.random() * height * 0.35,
        vx: Math.random() * 6 + 7,
        vy: Math.random() * 4 + 4,
        len: Math.random() * 70 + 50,
        alpha: 1
      };
    }
  }, 3800);

  const pointer = { x: -9999, y: -9999 };
  window.addEventListener('pointermove', (e) => { pointer.x = e.clientX; pointer.y = e.clientY; }, { passive: true });
  window.addEventListener('pointerup', () => { pointer.x = -9999; pointer.y = -9999; }, { passive: true });
  window.addEventListener('pointercancel', () => { pointer.x = -9999; pointer.y = -9999; }, { passive: true });

  function draw() {
    if (!document.hidden) {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < count; i++) {
        const p = particles[i];
        p.x = (p.x + p.vx + width) % width;
        p.y = (p.y + p.vy + height) % height;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        for (let j = i + 1; j < count; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 12500) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#6366f1';
            ctx.globalAlpha = (1 - Math.sqrt(distSq) / 112) * 0.14;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        const mdx = p.x - pointer.x;
        const mdy = p.y - pointer.y;
        const mdistSq = mdx * mdx + mdy * mdy;
        if (mdistSq < 21000) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.strokeStyle = '#38bdf8';
          ctx.globalAlpha = (1 - Math.sqrt(mdistSq) / 145) * 0.28;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      if (shootingStar) {
        shootingStar.x += shootingStar.vx;
        shootingStar.y += shootingStar.vy;
        shootingStar.alpha -= 0.022;
        if (shootingStar.alpha <= 0) {
          shootingStar = null;
        } else {
          ctx.save();
          ctx.globalAlpha = shootingStar.alpha;
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(shootingStar.x - shootingStar.len, shootingStar.y - shootingStar.len * 0.6);
          ctx.stroke();
          ctx.restore();
        }
      }
      ctx.globalAlpha = 1;
    }
    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}
