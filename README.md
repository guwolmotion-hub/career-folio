# Career Folio

소개 · 이력서 · 자기소개서 · 포트폴리오를 버튼과 메뉴로 탐색하는 반응형 개인 사이트입니다.

## 내용 수정

`profile.js`의 `window.PROFILE` 데이터를 수정합니다. 현재 모든 개인정보와 경력은 **입력 전 안내 문구**이며 실제 인물의 경력을 나타내지 않습니다.

- `name`, `role`, `headline`, `introduction`, `about`: 소개
- `experience`, `education`, `certifications`, `skills`: 이력서
- `stories`: 자기소개서
- `projects`: 프로젝트 및 상세 페이지 (`url`에는 http/https 링크)
- `email`, `location`: 공개할 연락처 및 활동 지역
- 실제 내용 입력을 마치면 `isTemplate`을 `false`로 변경합니다.

## 실행과 배포

빌드나 서버 데이터베이스 없이 동작합니다. `python -m http.server 8017 --bind 127.0.0.1` 실행 후 `http://127.0.0.1:8017`을 엽니다.

GitHub Pages에서 main 브랜치의 루트 폴더를 배포하면 됩니다. `#resume`, `#story`, `#work` 주소로 직접 이동할 수 있으며 브라우저 뒤로 가기도 지원합니다.

이력서의 ‘인쇄 / PDF 저장’ 버튼은 브라우저 인쇄 창을 엽니다. 인쇄 대상에서 PDF 저장을 선택할 수 있습니다.

외부 폰트는 Google Fonts를 사용하며 연결되지 않을 경우 시스템 글꼴로 표시합니다.
