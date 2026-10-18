// Efe Dönmez | Vitrin, Bento Kartları ve Daktilo Bileşen Yöneticisi

document.addEventListener('DOMContentLoaded', () => {
  renderProfileData();
  initTypewriter();
});

function renderProfileData() {
  if (typeof PROFILE_DATA === 'undefined') return;

  // 1. İstatistik Sayaç Kartları
  const statsContainer = document.getElementById('stats-container');
  if (statsContainer && PROFILE_DATA.stats) {
    statsContainer.innerHTML = PROFILE_DATA.stats.map((s, idx) => `
      <div class="stat-card spotlight-card stagger-item" style="--delay: ${0.15 + idx * 0.08}s">
        <div class="stat-val">${s.value}</div>
        <div class="stat-lbl">${s.label}</div>
        <div class="stat-sub">${s.sub}</div>
      </div>
    `).join('');
  }

  // 2. Bento Grid Kartları (Her karta özel canlı animasyon widget'ı)
  const bentoContainer = document.getElementById('bento-container');
  if (bentoContainer && PROFILE_DATA.bento) {
    bentoContainer.innerHTML = PROFILE_DATA.bento.map((item, idx) => {
      const widgetHtml = getBentoWidgetHtml(item.id);

      return `
        <div class="bento-card spotlight-card stagger-item ${item.size}" style="--delay: ${0.25 + idx * 0.08}s">
          <div class="bento-badge-row">
            <span class="bento-badge ${item.badgeColor}">${item.badge}</span>
            ${widgetHtml}
          </div>
          <div>
            <h3 class="bento-title" style="margin-bottom: 0.4rem;">${item.title}</h3>
            <p class="bento-desc">${item.description}</p>
          </div>
          <div class="bento-tags">
            ${item.tags.map(t => `<span class="bento-tag">#${t}</span>`).join('')}
          </div>
        </div>
      `;
    }).join('');
  }

  // 3. Sosyal Medya Linkleri
  const socialContainer = document.getElementById('social-strip');
  if (socialContainer && PROFILE_DATA.socials) {
    socialContainer.innerHTML = PROFILE_DATA.socials.map(soc => `
      <a href="${soc.url}" target="_blank" rel="noopener noreferrer" class="social-badge">
        <span class="floating-emoji">${soc.icon}</span>
        <span>${soc.name}</span>
      </a>
    `).join('');
  }
}

function getBentoWidgetHtml(id) {
  if (id === 'okul' || id === 'focus') {
    return `
      <svg class="ecg-widget" viewBox="0 0 100 28">
        <path class="ecg-line" d="M0,14 L22,14 L28,6 L34,24 L42,2 L50,26 L56,10 L62,14 L100,14" />
      </svg>
    `;
  }
  if (id === 'muzik' || id === 'music') {
    return `
      <div class="music-widget" title="Şu an çalıyor">
        <div class="vinyl-disc"></div>
        <div class="equalizer">
          <span class="eq-bar"></span><span class="eq-bar"></span><span class="eq-bar"></span><span class="eq-bar"></span><span class="eq-bar"></span>
        </div>
      </div>
    `;
  }
  if (id === 'spor' || id === 'routine') {
    return `
      <div class="power-meter" title="Antrenman Enerjisi">
        <span class="pwr-seg"></span><span class="pwr-seg"></span><span class="pwr-seg"></span><span class="pwr-seg"></span>
      </div>
    `;
  }
  if (id === 'sohbet') {
    return `
      <div class="chat-typing" title="Sohbet aktif">
        <span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>
      </div>
    `;
  }
  if (id === 'oyun' || id === 'gaming') return `<span class="game-ping">🕹️</span>`;
  return '';
}

function triggerAvatarBurst(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  if (typeof spawnSparkBurst === 'function') {
    spawnSparkBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
  }
}

function initTypewriter() {
  const el = document.getElementById('typewriter-text');
  if (!el) return;

  const words = ["Müzik & Oyun", "FTR & Anatomi", "Düzenli Antrenman", "Kafa Dengi Sohbet"];
  let wordIndex = 0;
  let charIndex = words[0].length;
  let isDeleting = true;

  function tick() {
    const currentWord = words[wordIndex];
    charIndex += isDeleting ? -1 : 1;
    el.textContent = currentWord.substring(0, charIndex);

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(tick, 350);
    } else if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(tick, 2200);
    } else {
      setTimeout(tick, isDeleting ? 45 : 75);
    }
  }
  setTimeout(tick, 2200);
}

function switchSection(target) {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
