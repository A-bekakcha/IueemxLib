// ── ZenjaLib · main.js ──
const YEARS = ['1cp', '2cp','1cs'];
 
const COMING_SOON = ['2cs', '3cs'];
 
const ICONS = {
  folder: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 4a1 1 0 0 1 1-1h4l1.5 2H14a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Z"/>
  </svg>`,
  externalLink: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3M10 2h4m0 0v4m0-4L7 9"/>
  </svg>`,
};
 
// Sets a link, or marks it as dead when there is no real URL
function setLink(a, url) {
  if (!url || url === '#') {
    a.removeAttribute('href');
    a.classList.add('dead');
    a.title = 'Link not available yet';
  } else {
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  }
}
 
function buildCompetitionBox() {
  const compBox = document.createElement('div');
  compBox.style.cssText = `
    background: rgba(32,181,115,0.06);
    border: 1px solid rgba(32,181,115,0.2);
    border-radius: 12px;
    padding: 16px 20px;
    margin-top: 16px;
  `;
 
  const compTitle = document.createElement('div');
  compTitle.style.cssText = `
    font-family: 'Space Mono', monospace;
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--green);
    margin-bottom: 12px;
  `;
  compTitle.textContent = 'Competition';
 
  const compGrid = document.createElement('div');
  compGrid.style.cssText = `display: flex; gap: 10px; flex-wrap: wrap; width: 100%;`;
 
  const schools = [
    { name: 'ESI-SBA',   url: 'https://drive.google.com/drive/folders/1xf2SJlDuAhMtKK4ZPCtNR2D983mmZmsG?usp=drive_link' },
    { name: 'ESI-ALG',   url: 'https://drive.google.com/drive/folders/1T8LY5jfVGYv-ZF2AyzQB3xHJd3OnJm-n?usp=drive_link' },
    { name: 'ESTIN', url: 'https://drive.google.com/drive/folders/1WT3xyGOddcXKlyuVOTPpt6D36iuL5O-y?usp=drive_link' },
  ];
 
  for (const school of schools) {
    const btn = document.createElement('a');
    setLink(btn, school.url);
    btn.textContent = school.name;
    btn.style.cssText = `
      font-family: 'Space Mono', monospace;
      font-size: 0.8rem; font-weight: 700;
      color: var(--green);
      text-decoration: none;
      padding: 8px 20px;
      border-radius: 8px;
      border: 1px solid rgba(32,181,115,0.35);
      background: rgba(32,181,115,0.08);
      transition: all 0.2s ease;
      letter-spacing: 0.05em;
      flex: 1;
      text-align: center;
    `;
    btn.onmouseenter = () => {
      btn.style.background = 'rgba(32,181,115,0.22)';
      btn.style.borderColor = 'var(--green)';
    };
    btn.onmouseleave = () => {
      btn.style.background = 'rgba(32,181,115,0.08)';
      btn.style.borderColor = 'rgba(32,181,115,0.35)';
    };
    compGrid.appendChild(btn);
  }
 
  compBox.append(compTitle, compGrid);
  return compBox;
}
 
function buildYear(data) {
  const block = document.createElement('div');
  block.className = 'yearBlock';
  block.id = data.id;
 
  const header = document.createElement('div');
  header.className = 'yearHeader';
 
  const badge = document.createElement('span');
  badge.className = 'yearBadge';
  badge.textContent = data.id.toUpperCase();
 
  const title = document.createElement('a');
  title.className = 'yearTitle';
  setLink(title, data.url);
  title.textContent = labelForYear(data.id);
 
  const divider = document.createElement('div');
  divider.className = 'yearDivider';
 
  header.append(badge, title, divider);
 
  const grid = document.createElement('div');
  grid.className = 'semGrid';
  grid.appendChild(buildSemester(data.s1, 'Semester 1'));
  grid.appendChild(buildSemester(data.s2, 'Semester 2'));
 
  if (data.id === '2cp') {
    block.append(header, grid, buildCompetitionBox());
  } else {
    block.append(header, grid);
  }
 
  return block;
}
 
function buildSemester(sem, label) {
  const card = document.createElement('div');
  card.className = 'semCard';
 
  const lnk = document.createElement('a');
  lnk.className = 'semLabel';
  setLink(lnk, sem.url);
  lnk.innerHTML = ICONS.folder + ` ${label}`;
 
  const ul = document.createElement('ul');
  ul.className = 'modList';
 
  for (const mod of sem.modules) {
    const li = document.createElement('li');
    li.className = 'modItem';
 
    const a = document.createElement('a');
    setLink(a, mod.url);
 
    const iconBox = document.createElement('span');
    iconBox.className = 'mod-icon';
    iconBox.innerHTML = ICONS.externalLink;
 
    a.append(iconBox, document.createTextNode(mod.name));
    li.appendChild(a);
    ul.appendChild(li);
  }
 
  card.append(lnk, ul);
  return card;
}
 
function buildComingSoon(yearId) {
  const block = document.createElement('div');
  block.className = 'yearBlock';
  block.id = yearId;
 
  const header = document.createElement('div');
  header.className = 'yearHeader';
 
  const badge = document.createElement('span');
  badge.className = 'yearBadge';
  badge.style.background = 'rgba(255,255,255,0.15)';
  badge.style.color = 'rgba(255,255,255,0.5)';
  badge.textContent = yearId.toUpperCase();
 
  const title = document.createElement('span');
  title.className = 'yearTitle';
  title.style.color = 'rgba(255,255,255,0.35)';
  title.textContent = labelForYear(yearId);
 
  const divider = document.createElement('div');
  divider.className = 'yearDivider';
  divider.style.opacity = '0.3';
 
  header.append(badge, title, divider);
 
  const cs = document.createElement('div');
  cs.className = 'comingSoon';
  cs.innerHTML = `<div class="cs-icon"></div>Content coming soon`;
 
  block.append(header, cs);
  return block;
}
 
function labelForYear(id) {
  const map = {
    '1cp': 'First Year Preparatory Cycle',
    '2cp': 'Second Year Preparatory Cycle',
    '1cs': 'First Year Superior Cycle',
    '2cs': 'Second Year Superior Cycle',
    '3cs': 'Third Year Superior Cycle',
  };
  return map[id] || id.toUpperCase();
}
 
async function loadAll() {
  const content = document.getElementById('content');
  content.innerHTML = `<p style="color:var(--muted);text-align:center;padding:60px;font-size:0.9rem;">Loading resources…</p>`;
 
  let first = true;
 
  for (const year of YEARS) {
    try {
      const res = await fetch(`./data/${year}.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
 
      if (first) { content.innerHTML = ''; first = false; }
      content.appendChild(buildYear(data));
 
    } catch (err) {
      console.error(`Failed to load ${year}.json:`, err.message);
      if (first) { content.innerHTML = ''; first = false; }
 
      const hint = location.protocol === 'file:'
        ? '<br><small>Open the site through a local server (e.g. <code>python -m http.server</code>) or host it online; browsers block fetch() on file://.</small>'
        : '';
      const errBlock = document.createElement('div');
      errBlock.className = 'yearBlock';
      errBlock.style.cssText = 'background:rgba(255,80,80,0.06);border:1px solid rgba(255,80,80,0.2);border-radius:14px;padding:24px;text-align:center;color:#ff9999;font-size:0.85rem;';
      errBlock.innerHTML = `<strong>⚠ Could not load ${year}.json</strong><br><small style="color:rgba(255,160,100,0.7)">${err.message}</small>${hint}`;
      content.appendChild(errBlock);
    }
  }
 
  for (const year of COMING_SOON) {
    content.appendChild(buildComingSoon(year));
  }
}
 
loadAll();