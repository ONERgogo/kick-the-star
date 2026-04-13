// ============ DATA ============
const TOTAL_BUDGET = 1000000;
let budget = TOTAL_BUDGET;
let selected = [];
let currentAudio = null;
let playingCard = null;

const artists = [
  { id:1,  name:'回春丹',       genre:'Funk / 放克',       price:150000, emoji:'🎸', clip:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id:2,  name:'柏林护士',     genre:'Post-Punk / 后朋',  price:80000,  emoji:'🎹', clip:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id:3,  name:'超级斩',       genre:'Synth-Pop',         price:100000, emoji:'⚡', clip:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id:4,  name:'声音玩具',     genre:'Dream Pop / 梦幻',  price:120000, emoji:'🌙', clip:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id:5,  name:'野外合作社',   genre:'Indie Folk',        price:50000,  emoji:'🌿', clip:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
  { id:6,  name:'鸭打鹅',       genre:'Math Rock / 数摇',  price:80000,  emoji:'🦆', clip:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
  { id:7,  name:'白纸扇',       genre:'Shoegaze / 盯鞋',   price:60000,  emoji:'👟', clip:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
  { id:8,  name:'海朋森',       genre:'Brit-Pop / 英伦',    price:100000, emoji:'🌊', clip:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
  { id:9,  name:'Fine乐团',     genre:'City Pop / 都市',   price:70000,  emoji:'🏙️', clip:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
  { id:10, name:'裤裆里的宇宙', genre:'Noise / 噪音',      price:40000,  emoji:'🔥', clip:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3' },
  { id:11, name:'ChiliChill',   genre:'Neo Soul / 新灵魂',  price:90000,  emoji:'🌶️', clip:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3' },
  { id:12, name:'午夜飞行',     genre:'Electronic / 电子',  price:110000, emoji:'✈️', clip:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3' },
  { id:13, name:'棱镜',         genre:'Prog Rock / 前摇',   price:85000,  emoji:'💎', clip:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3' },
  { id:14, name:'跳大海',       genre:'Punk / 朋克',        price:55000,  emoji:'🌊', clip:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3' },
  { id:15, name:'山人乐队',     genre:'World / 世界音乐',   price:95000,  emoji:'🏔️', clip:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3' },
  { id:16, name:'宇宙弦',       genre:'Ambient / 氛围',     price:45000,  emoji:'🪐', clip:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3' },
];

const funNames = ['乐迷小张','摇滚阿姨','后朋信徒','地下室常客','现场狂人','噪音爱好者','独立青年','巡演追星人','Livehouse长住客','吉他手女友'];

// ============ ACT 1: KICK ============
function kickTheStar() {
  const btn = document.getElementById('kickBtn');
  btn.style.pointerEvents = 'none';

  const container = document.getElementById('starContainer');
  const rect = container.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  // Particle explosion
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 8 + 4;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = cx + 'px';
    p.style.top = cy + 'px';
    p.style.background = Math.random() > 0.5 ? '#C9A96E' : '#E8D5B0';

    const angle = (Math.PI * 2 * i) / 40;
    const dist = Math.random() * 300 + 100;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;

    document.body.appendChild(p);

    p.animate([
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: `translate(${dx}px, ${dy}px) scale(0)`, opacity: 0 }
    ], { duration: 800 + Math.random() * 400, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', fill: 'forwards' });

    setTimeout(() => p.remove(), 1400);
  }

  // Star shatter
  container.animate([
    { transform: 'scale(1)', opacity: 1, filter: 'blur(0px)' },
    { transform: 'scale(1.3)', opacity: 0, filter: 'blur(20px)' }
  ], { duration: 600, fill: 'forwards', easing: 'ease-out' });

  btn.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' });

  // Coin rain
  setTimeout(() => {
    for (let i = 0; i < 25; i++) {
      const coin = document.createElement('div');
      coin.className = 'coin';
      coin.textContent = '🪙';
      coin.style.left = (Math.random() * window.innerWidth) + 'px';
      coin.style.top = '-30px';
      coin.style.fontSize = (18 + Math.random() * 16) + 'px';
      document.body.appendChild(coin);

      const dur = 1200 + Math.random() * 800;
      coin.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: `translateY(${window.innerHeight + 60}px) rotate(${360 + Math.random() * 360}deg)`, opacity: 0 }
      ], { duration: dur, delay: Math.random() * 400, fill: 'forwards', easing: 'ease-in' });

      setTimeout(() => coin.remove(), dur + 600);
    }
  }, 500);

  // Show budget reveal
  setTimeout(() => {
    document.getElementById('budgetReveal').classList.add('show');
  }, 1400);
}

function enterAct2() {
  document.getElementById('budgetReveal').classList.remove('show');
  setTimeout(() => {
    document.getElementById('act1').classList.add('hidden');
    document.getElementById('act2').classList.add('active');
    renderArtistPool();
  }, 400);
}

// ============ ACT 2: BUILD ============
function renderArtistPool() {
  const grid = document.getElementById('artistGrid');
  grid.innerHTML = '';

  artists.forEach(a => {
    const isSelected = selected.includes(a.id);
    const canAfford = budget >= a.price;
    const disabled = !isSelected && !canAfford;

    const card = document.createElement('div');
    card.className = 'artist-card' + (isSelected ? ' selected' : '') + (disabled ? ' disabled' : '');
    card.dataset.id = a.id;

    card.innerHTML = `
      <div class="card-visual">
        <span class="emoji-art">${a.emoji}</span>
        <div class="wave-bars" id="wave-${a.id}"><span></span><span></span><span></span><span></span></div>
      </div>
      <div class="card-info">
        <div class="card-name">${a.name}</div>
        <div class="card-genre">${a.genre}</div>
        <div class="card-bottom">
          <span class="card-price">¥${(a.price / 10000).toFixed(0)}万</span>
          <span class="card-listen" data-clip="${a.clip}" data-aid="${a.id}">试听</span>
        </div>
      </div>
    `;

    // Listen button
    card.querySelector('.card-listen').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleAudio(a.id, a.clip);
    });

    // Select
    card.addEventListener('click', () => toggleSelect(a));

    grid.appendChild(card);
  });
}

function toggleAudio(id, clip) {
  const audio = document.getElementById('audioPlayer');
  const allWaves = document.querySelectorAll('.wave-bars');
  allWaves.forEach(w => w.classList.remove('playing'));

  if (playingCard === id) {
    audio.pause();
    playingCard = null;
    return;
  }

  audio.src = clip;
  audio.currentTime = 0;
  audio.play().catch(() => {});
  playingCard = id;

  const wave = document.getElementById('wave-' + id);
  if (wave) wave.classList.add('playing');

  // Auto stop after 15s
  clearTimeout(currentAudio);
  currentAudio = setTimeout(() => {
    audio.pause();
    playingCard = null;
    allWaves.forEach(w => w.classList.remove('playing'));
  }, 15000);

  audio.onended = () => {
    playingCard = null;
    allWaves.forEach(w => w.classList.remove('playing'));
  };
}

function toggleSelect(artist) {
  const idx = selected.indexOf(artist.id);
  if (idx > -1) {
    selected.splice(idx, 1);
    budget += artist.price;
    showToast(`已移除 ${artist.name}`);
  } else {
    if (budget < artist.price) return;
    selected.push(artist.id);
    budget -= artist.price;
    showToast(`已邀请 ${artist.name} 🎤`);
  }
  updateBudgetUI();
  renderArtistPool();

  const bar = document.getElementById('confirmBar');
  bar.classList.toggle('show', selected.length > 0);
}

function updateBudgetUI() {
  document.getElementById('budgetDisplay').innerHTML = `¥${budget.toLocaleString()}<span>/ ${TOTAL_BUDGET.toLocaleString()}</span>`;
  document.getElementById('budgetFill').style.width = ((budget / TOTAL_BUDGET) * 100) + '%';
  document.getElementById('selectedCount').textContent = `已选 ${selected.length} 组 · 已花 ¥${(TOTAL_BUDGET - budget).toLocaleString()}`;
}

// ============ ACT 3: POSTER ============
function generatePoster() {
  document.getElementById('act2').classList.remove('active');
  document.getElementById('act2').style.display = 'none';
  document.getElementById('act3').classList.add('active');

  const lineup = document.getElementById('posterLineup');
  lineup.innerHTML = '';

  const selectedArtists = artists.filter(a => selected.includes(a.id));
  selectedArtists.forEach(a => {
    const row = document.createElement('div');
    row.className = 'poster-artist';
    row.innerHTML = `
      <span class="poster-artist-name">${a.emoji} ${a.name}</span>
      <span class="poster-artist-price">¥${(a.price / 10000).toFixed(0)}万</span>
    `;
    lineup.appendChild(row);
  });

  const spent = TOTAL_BUDGET - budget;
  document.getElementById('posterTotal').textContent = `共 ${selectedArtists.length} 组艺人 · 总预算 ¥${spent.toLocaleString()}`;

  // Also add to lounge
  addToLounge(selectedArtists);
}

function savePoster() {
  showToast('长截图保存到相册（Demo 模式）✨');
}

// ============ LOUNGE ============
function enterLounge() {
  document.querySelector('.poster-output').style.display = 'none';
  document.getElementById('lounge').classList.add('active');
  renderLounge();
}

const loungeData = [];

function addToLounge(myArtists) {
  // Add user's lineup
  loungeData.unshift({
    user: '你的阵容',
    artists: myArtists,
    syncs: Math.floor(Math.random() * 20),
    isMine: true
  });

  // Generate some fake data
  for (let i = 0; i < 8; i++) {
    const count = Math.floor(Math.random() * 5) + 3;
    const shuffled = [...artists].sort(() => Math.random() - 0.5).slice(0, count);
    const totalCost = shuffled.reduce((s, a) => s + a.price, 0);
    if (totalCost > TOTAL_BUDGET) shuffled.pop();

    loungeData.push({
      user: funNames[i % funNames.length],
      artists: shuffled,
      syncs: Math.floor(Math.random() * 200) + 5,
      isMine: false
    });
  }
}

function renderLounge() {
  const wall = document.getElementById('loungeWall');
  wall.innerHTML = '';

  loungeData.forEach((entry, idx) => {
    const card = document.createElement('div');
    card.className = 'lounge-card';

    // Random slight rotation for that livehouse feel
    const rotate = (Math.random() - 0.5) * 4;
    card.style.transform = `rotate(${rotate}deg)`;

    const artistHTML = entry.artists.slice(0, 5).map(a =>
      `<div class="lc-artist">${a.emoji} ${a.name}</div>`
    ).join('');

    const moreHTML = entry.artists.length > 5 ? `<div class="lc-artist" style="color:var(--ink-muted)">+${entry.artists.length - 5} more</div>` : '';

    const spent = entry.artists.reduce((s, a) => s + a.price, 0);

    card.innerHTML = `
      <div class="lc-user">${entry.isMine ? '🎯 ' : ''}${entry.user}</div>
      <div class="lc-artists">${artistHTML}${moreHTML}</div>
      <div class="lc-bottom">
        <span class="lc-total">¥${(spent / 10000).toFixed(0)}万</span>
        <button class="sync-btn" onclick="syncClick(this, ${idx})">
          <span>⚡ 同频</span>
          <span class="sync-count">${entry.syncs}</span>
        </button>
      </div>
    `;

    wall.appendChild(card);
  });
}

function syncClick(btn, idx) {
  if (btn.classList.contains('synced')) return;
  btn.classList.add('synced');
  loungeData[idx].syncs++;
  btn.querySelector('.sync-count').textContent = loungeData[idx].syncs;
  showToast(`太卧槽了，${loungeData[idx].syncs} 人和你同频共振 ⚡`);
}

// ============ UTILS ============
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}
