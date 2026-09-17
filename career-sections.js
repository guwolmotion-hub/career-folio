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
function renderWorkPage(category='전체') {
  const categories=['전체',...new Set(profile.projects.map(p=>p.category))];
  return `${heading('VIDEO · DIRECTION · AI', '생각을 결과로 만든 작업.', '영상 제작 경험을 중심으로 디렉팅·프로젝트 운영·AI 활용까지 소개합니다.')}<nav class="chapter-nav" aria-label="포트폴리오 목차"><a href="#work/production">영상 제작</a><a href="#work/direction">프로젝트·조직 기여</a><a href="#work/ai">AI 제작 방식</a><a href="#work/next">지원 방향</a><a href="#work/mentoring">교육·지도 작품</a></nav>
  <section id="work-production" class="portfolio-chapter production-chapter">${chapterHeading('01','MY PORTFOLIO / VIDEO · MOTION · 3D','좋은 화면을 만들기 위해 끝까지 고민합니다.','화면 구성과 색감, 조명, 움직임과 타이밍을 함께 고민합니다. 프로젝트의 목적에 맞춰 2D·3D 제작 방식을 선택하고 조합합니다.')}<div class="filters" aria-label="프로젝트 분류">${categories.map(c=>`<button class="filter ${c===category?'selected':''}" data-filter="${e(c)}" aria-pressed="${c===category}">${e(c)}</button>`).join('')}</div>${projectCards('production',category)}</section>
  <section id="work-direction" class="portfolio-chapter">${chapterHeading('02','PROJECT · DIRECTION · MANAGEMENT','개별 작업에서 프로젝트 전체로.','결과물을 검토하고 수정 방향을 제시하는 일, 사람과 일정을 조율하는 일을 통해 제작을 바라보는 시야를 넓혔습니다.')}<div class="direction-grid">${profile.direction.map(item=>`<article><span>${e(item.tag)}</span><h3>${e(item.title)}</h3><p>${e(item.body)}</p></article>`).join('')}</div><div class="organization-intro"><h3>교육혁신위 · 조직 단위의 콘텐츠와 프로젝트</h3><p>신규 과정 개발과 이를 전달하는 홍보 콘텐츠, 토크콘서트·세미나 운영 지원에 참여했습니다. 목적과 타깃을 이해하고 필요한 콘텐츠를 기획·제작하는 경험을 쌓았습니다.</p></div>${projectCards('organization',category)}</section>
  <section id="work-ai" class="portfolio-chapter ai-chapter">${chapterHeading('03','AI · NEW WORKFLOW',e(profile.ai.title),e(profile.ai.intro))}<p class="ai-body">${e(profile.ai.body)}</p><ol class="ai-workflow" aria-label="AI와 기존 영상 제작을 연결하는 과정">${profile.ai.steps.map((step,i)=>`<li><span>${String(i+1).padStart(2,'0')}</span><strong>${e(step.title)}</strong><p>${e(step.detail)}</p></li>`).join('')}</ol><div class="ai-takeaway"><strong>배우고, 비교하고, 제작에 적용합니다.</strong><p>새로운 도구의 기능을 익히는 데서 나아가 실제 작업에 필요한 방식을 찾아 콘텐츠로 연결합니다.</p></div></section>
  <section id="work-next" class="portfolio-chapter">${chapterHeading('04','WHY ME · NEXT STEP','넓어진 시야를 더 좋은 영상으로.','직접 만드는 역량에 결과물을 보는 시각, 프로젝트 운영 경험, 새로운 기술에 대한 적응력을 더했습니다.')}${valueCards()}<a class="text-link next-contact" href="#contact">함께할 프로젝트 이야기하기 ↗</a></section>
  <div id="work-mentoring">${renderMotionGallery()}</div>`;
}
