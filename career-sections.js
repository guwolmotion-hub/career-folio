function personalVideoDetail(id) {
  const index = profile.projects.findIndex(p=>(p.videoIds || []).includes(id));
  return index >= 0 ? project(index) : work();
}
function projectVideoWorks(p) {
  const videos = (p.videoIds || []).map(id=>(profile.videos || []).find(v=>v.id===id)).filter(Boolean);
  if (!videos.length) return '';
  return '<section class="project-video-works" aria-label="프로젝트 영상">'+videos.map(v=>`<article class="project-video-work ${v.format==='short'?'project-video-short':''}"><h2>${e(v.title)}</h2><div class="motion-player ${v.format==='short'?'personal-short-player':''}"><iframe src="https://www.youtube-nocookie.com/embed/${e(v.id)}" title="${e(v.title)} 영상 재생" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div><div class="motion-player-footer"><span>영상이 재생되지 않으면 YouTube에서 확인해 주세요.</span><a class="text-link" href="${e(safeUrl(v.url))}" target="_blank" rel="noopener noreferrer">YouTube에서 보기 ↗</a></div></article>`).join('')+'</section>';
}
function careerEvolution() {
  return `<section class="career-evolution" aria-label="경력의 확장"><div><p class="eyebrow">VIDEO AT THE CORE</p><h2>제작에서 디렉팅, 그리고 새로운 제작 환경까지.</h2><p>${e(profile.careerSummary)}</p></div><ol>${profile.evolution.map((step,i)=>`<li><span>${String(i+1).padStart(2,'0')}</span>${e(step)}</li>`).join('')}</ol></section>`;
}
function valueCards() {
  return `<div class="value-grid">${profile.values.map(value=>`<article><p class="eyebrow">${e(value.tag)}</p><h3>${e(value.title)}</h3><p>${e(value.body)}</p></article>`).join('')}</div>`;
}
function projectCards(group, category) {
  const items=profile.projects.map((p,i)=>({p,i})).filter(({p})=>p.group===group && (category==='전체'||p.category===category));
  return items.length ? `<div class="projects-grid">${items.map(({p,i})=>`<a class="project-card" href="#project/${i}"><div class="project-art art-${i%3}"><span class="project-art-label">${e(p.category)} / ${String(i+1).padStart(2,'0')}</span><span class="project-art-title">${p.cover.map(e).join('<br>')}</span><span class="project-art-foot">${group==='production'?'PRODUCTION EXPERIENCE':'PROJECT CONTRIBUTION'} <span>↗</span></span></div><div class="project-meta"><span>${e(p.category)} · ${e(p.year)}</span><h3>${e(p.title)}</h3><p>${e(p.description)}</p><span class="project-role">${e(p.role)}</span></div></a>`).join('')}</div>` : '';
}
function chapterHeading(number, tag, title, description) {
  return `<div class="chapter-heading"><span class="chapter-number">${number}</span><div><p class="eyebrow">${tag}</p><h2>${title}</h2><p>${description}</p></div></div>`;
}
function renderWorkPage() {
  return `${heading('SELECTED PROJECTS', '생각을 결과로 만든 작업.', '직접 기획·제작한 프로젝트와 교육·디렉팅에 참여한 작품을 소개합니다.')}<nav class="chapter-nav" aria-label="포트폴리오 목차"><a href="#work/production">제작 프로젝트</a><a href="#work/mentoring">교육·지도 작품</a></nav><section id="work-production" class="portfolio-chapter production-chapter">${projectCards('production','전체')}</section><div id="work-mentoring">${renderMentoredPreview()}</div>`;
}
