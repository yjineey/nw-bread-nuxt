# 📘 newway frontend

뉴웨이교회 성경 웹 애플리케이션

## 🚀 기술 스택

- Framework: [**Nuxt**](https://nuxt.com) 3.17.5
- Language: [**TypeScript**](https://www.typescriptlang.org/)
- Styling: [**Tailwind CSS**](https://tailwindcss.com/) 4.1.8
- State Management: [**Pinia**](https://pinia.vuejs.org/)
- Package Manager: pnpm 10.11.0
- Node.js: v22

## 🤝 개발 가이드

- 컴포넌트 작성 시 TypeScript와 Composition API 사용
- 스타일링은 Tailwind CSS 유틸리티 클래스 활용
- 페이지 추가는 pages/ 폴더에 Vue 파일 생성 (자동 라우팅)

## 📦 프로젝트 설정

```bash
# 개발 서버 실행
pnpm dev

# 빌드 (SSR)
pnpm build

# 정적 사이트 생성
pnpm generate

# 빌드 결과 미리보기
pnpm preview

# 개발 환경 준비 (설치 후 자동 실행)
pnpm postinstall
```

## 📁 프로젝트 구조

```bash
newway-frontend/
├── .nuxt/                 # Nuxt 빌드 파일 (자동 생성)
├── .vscode/               # VS Code 설정 디렉토리
├── assets/                # CSS, SCSS, 이미지 등 정적 에셋
├── components/            # 재사용 가능한 Vue 컴포넌트 저장소
├── layouts/               # 페이지 레이아웃 파일
├── pages/                 # 라우팅되는 뷰 페이지
├── public/                # 정적 파일 경로
├── server/                # 서버 API 경로
├── .eslintrc.json         # ESLint 설정
├── .gitignore
├── .prettierrc            # prettier 설정
├── app.vue                # 루트 컴포넌트
├── nuxt.config.ts         # Nuxt 설정
├── package.json
├── pnpm-lock.yaml
├── tailwind.config.js     # Tailwind 설정
├── postcss.config.js      # PostCSS 플러그인
└── tsconfig.json          # TypeScript 설정
```

## 📑 라이선스 (License)

ⓒ 2025. NEWWAY CHURCH
All rights reserved.
