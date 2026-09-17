const motionState = { category: '전체', query: '', limit: 18 };
const motionItems = window.MOTION_GALLERY?.items || [];
function youtubeId(raw) {
  try {
    const url = new URL(raw);
    const host = url.hostname.replace(/^www\./, '');
    const id = host === 'youtu.be' ? url.pathname.slice(1) : ['youtube.com','m.youtube.com'].includes(host) ? (url.searchParams.get('v') || url.pathname.split('/')[2]) : '';
    return /^[\w-]{11}$/.test(id || '') ? id : '';
  } catch { return ''; }
}
function filteredMotionItems() {
  return motionItems.filter(item => (motionState.category === '전체' || item.category === `영상/모션${motionState.category}`) && item.title.toLocaleLowerCase().includes(motionState.query.toLocaleLowerCase().trim()))
    .sort((a,b) => Number(b.best) - Number(a.best));
}
function motionCards() {
  const list = filteredMotionItems();
  return `<div class="motion-result"><span role="status">${list.length}개 작품${motionState.query ? ' · 검색 결과' : ''}</span><span>제작 · 수강생 / 교육·지도 포트폴리오</span></div><div class="motion-grid">${list.slice(0,motionState.limit).map(item => {
    const vid = youtubeId(item.url);
    return `<a class="motion-card" href="#motion/${encodeURIComponent(item.id)}"><div class="motion-thumb">${vid ? `<img src="https://i.ytimg.com/vi/${vid}/hqdefault.jpg" alt="" loading="lazy" width="480" height="360">` : '<span class="motion-placeholder">MOTION PORTFOLIO</span>'}<span class="motion-play" aria-hidden="true">▶</span>${item.best ? '<span class="motion-best">BEST</span>' : ''}</div><div class="motion-card-meta"><span>${item.category === '영상/모션3D' ? '3D' : '2D'} MOTION <span>· 수강생 작품</span></span><h3>${e(item.title)}</h3>${item.creator || item.author || item.studentName ? `<p>제작 · ${e(item.creator || item.author || item.studentName)}</p>` : ''}</div></a>`;
  }).join('')}</div>${list.length === 0 ? '<p class="motion-empty">검색 결과가 없습니다. 다른 제목으로 검색해 보세요.</p>' : ''}${list.length > motionState.limit ? `<div class="motion-more"><button class="button secondary" data-motion-more>작품 더 보기 <span>${Math.min(motionState.limit,list.length)} / ${list.length}</span></button></div>` : ''}`;
}
function renderMotionGallery() {
  return `<section class="motion-gallery" aria-label="수강생 모션그래픽 작품"><div class="motion-intro"><div><p class="eyebrow">MENTORING PORTFOLIO / 5 YEARS</p><h2>5년간 함께 만든 성장의 결과.</h2><p>5년간 영상·CG 분야를 가르치며 지도한 수강생들의 2D·3D 모션그래픽 작품입니다. 교육·지도 성과를 담았습니다.</p></div></div><div class="motion-toolbar"><div class="filters motion-filters" aria-label="모션그래픽 분류">${['전체','2D','3D'].map(cat => `<button class="filter ${motionState.category === cat ? 'selected' : ''}" data-motion-filter="${cat}" aria-pressed="${motionState.category === cat}">${cat}<span>${cat === '전체' ? motionItems.length : motionItems.filter(i => i.category === `영상/모션${cat}`).length}</span></button>`).join('')}</div><label class="motion-search"><span>작품 검색</span><input type="search" id="motion-search" placeholder="제목으로 검색" value="${e(motionState.query)}" autocomplete="off"></label></div><div id="motion-results">${motionCards()}</div></section>`;
}
function motionDetail(id) {
  const item = motionItems.find(i => i.id === id);
  if (!item) return '<a class="back-link" href="#work">← 포트폴리오 목록</a><h1>작품을 찾을 수 없습니다.</h1>';
  const vid = youtubeId(item.url);
  const source = safeUrl(item.url);
  const list = filteredMotionItems().some(i => i.id === id) ? filteredMotionItems() : motionItems;
  const index = list.findIndex(i => i.id === id);
  return `<a class="back-link" href="#work">← 포트폴리오 목록</a>${heading('STUDENT WORK / '+(item.category === '영상/모션3D' ? '3D MOTION' : '2D MOTION'), e(item.title), '수강생 제작 작품 · 교육·지도 포트폴리오')}<div class="motion-player">${vid ? `<iframe src="https://www.youtube-nocookie.com/embed/${vid}" title="${e(item.title)} 영상 재생" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>` : item.type === 'video' && source ? `<video src="${e(source)}" controls playsinline preload="metadata"></video>` : '<p>아래 원본 링크에서 작품을 확인할 수 있습니다.</p>'}</div><div class="motion-player-footer"><span>영상이 재생되지 않으면 원본에서 시청할 수 있습니다.</span>${source ? `<a class="text-link" href="${e(source)}" target="_blank" rel="noopener noreferrer">원본 영상 보기 ↗</a>` : ''}</div><section class="panel motion-credit"><div><span class="eyebrow">CREDIT</span><h2>작품 제작 · ${e(item.creator || item.author || item.studentName || '수강생')}</h2><p>정세일의 교육·지도 포트폴리오로 소개하는 수강생 작품입니다. 작품 제목과 영상 속 제작자 표기를 유지합니다.</p>${item.description ? `<p>${e(item.description)}</p>` : ''}</div></section><nav class="motion-pagination" aria-label="작품 이동">${index > 0 ? `<a href="#motion/${encodeURIComponent(list[index-1].id)}">← 이전 작품</a>` : '<span></span>'}<span>${index+1} / ${list.length}</span>${index < list.length-1 ? `<a href="#motion/${encodeURIComponent(list[index+1].id)}">다음 작품 →</a>` : '<span></span>'}</nav>`;
}
document.addEventListener('click', event => {
  const filter = event.target.closest('[data-motion-filter]');
  const more = event.target.closest('[data-motion-more]');
  if (filter) {
    motionState.category = filter.dataset.motionFilter;
    motionState.limit = 18;
    document.querySelectorAll('[data-motion-filter]').forEach(button => { const active = button.dataset.motionFilter === motionState.category; button.classList.toggle('selected',active); button.setAttribute('aria-pressed',String(active)); });
    document.querySelector('#motion-results').innerHTML = motionCards();
  } else if (more) {
    const previousLimit = motionState.limit;
    motionState.limit += 18;
    document.querySelector('#motion-results').innerHTML = motionCards();
    document.querySelectorAll('.motion-card')[previousLimit]?.focus({preventScroll:true});
  }
});
document.addEventListener('input', event => {
  if (event.target.id !== 'motion-search') return;
  motionState.query = event.target.value;
  motionState.limit = 18;
  document.querySelector('#motion-results').innerHTML = motionCards();
});
document.addEventListener('error', event => {
  if(event.target.matches?.('.motion-thumb img')) event.target.hidden = true;
},true);

