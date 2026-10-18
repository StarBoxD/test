// Ultra Dinamik Konfeti, Havai Fişek ve Tıklama Kıvılcım Motoru

function launchConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const colors = ['#6366f1', '#10b981', '#38bdf8', '#a855f7', '#f43f5e', '#f59e0b'];

  // Sol ve sağ alttan + ortadan çift konfeti topu
  for (let i = 0; i < 130; i++) {
    const side = i % 3;
    let startX = window.innerWidth * 0.5;
    let vx = (Math.random() - 0.5) * 16;
    if (side === 0) {
      startX = window.innerWidth * 0.15;
      vx = Math.random() * 14 + 2;
    } else if (side === 1) {
      startX = window.innerWidth * 0.85;
      vx = -(Math.random() * 14 + 2);
    }

    pieces.push({
      x: startX,
      y: window.innerHeight * 0.65,
      vx: vx,
      vy: -(Math.random() * 15 + 7),
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRotation: (Math.random() - 0.5) * 12,
      opacity: 1,
      shape: Math.random() > 0.4 ? 'rect' : 'circle'
    });
  }

  let startTime = Date.now();
  function animate() {
    const elapsed = Date.now() - startTime;
    if (elapsed > 3800) {
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let p of pieces) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.34;
      p.vx *= 0.99;
      p.rotation += p.vRotation;
      if (elapsed > 2200) {
        p.opacity = Math.max(0, 1 - (elapsed - 2200) / 1600);
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      }
      ctx.restore();
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// Herhangi bir koordinatta mini neon kıvılcım patlaması
function spawnSparkBurst(x, y) {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9998';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const sparks = [];
  const colors = ['#818cf8', '#38bdf8', '#34d399', '#c084fc', '#fb7185'];

  for (let i = 0; i < 24; i++) {
    const angle = (Math.PI * 2 * i) / 24 + (Math.random() - 0.5) * 0.3;
    const speed = Math.random() * 6 + 2.5;
    sparks.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: Math.random() * 3 + 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1
    });
  }

  let start = performance.now();
  function frame(now) {
    const t = now - start;
    if (t > 650) {
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let s of sparks) {
      s.x += s.vx;
      s.y += s.vy;
      s.vx *= 0.94;
      s.vy *= 0.94;
      s.alpha = Math.max(0, 1 - t / 650);

      ctx.save();
      ctx.globalAlpha = s.alpha;
      ctx.fillStyle = s.color;
      ctx.shadowColor = s.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
