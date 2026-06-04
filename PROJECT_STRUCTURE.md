# Projek-Mulmed - Project Structure

```
projek-mulmed/
│
├── 📦 package.json (Root)
├── README.md
├── .env
├── .git/
├── .gitignore
├── node_modules/
├── package-lock.json
│
├── 🔧 backend/
│   ├── 📦 package.json
│   ├── server.js
│   ├── node_modules/
│   ├── package-lock.json
│   │
│   ├── 📁 models/
│   │   ├── users.js
│   │   ├── albums.js
│   │   ├── songs.js
│   │   └── musicVideos.js
│   │
│   └── 📁 routes/
│       ├── register.js
│       ├── login.js
│       ├── albumsRoute.js
│       ├── songsRoute.js
│       └── musicVideosRoutes.js
│
└── 🎨 spojedy/ (Frontend - Vue.js)
    ├── 📦 package.json
    ├── vite.config.js
    ├── jsconfig.json
    ├── index.html
    ├── README.md
    ├── node_modules/
    ├── package-lock.json
    │
    ├── 📁 public/
    │   └── (Static assets)
    │
    └── 📁 src/
        ├── App.vue
        ├── display.vue
        ├── main.js
        ├── main.css
        │
        ├── 📁 api/
        │   ├── apiService.js
        │   └── authService.js
        │
        ├── 📁 assets/
        │   ├── assets.js
        │   ├── icon/
        │   ├── image/
        │   └── videos/
        │
        ├── 📁 component/
        │   ├── App.vue
        │   ├── navbar.vue
        │   ├── sideBar.vue
        │   ├── primaryButton.vue
        │   ├── textBox.vue
        │   ├── songPlayer.vue
        │   ├── songItem.vue
        │   ├── displayAlbum.vue
        │   ├── albumItem.vue
        │   └── musicVideoItem.vue
        │
        ├── 📁 layouts/
        │   └── AuthLayout.vue
        │
        ├── 📁 pages/
        │   ├── homePage.vue
        │   ├── loginPage.vue
        │   ├── registerPage.vue
        │   ├── profile.vue
        │   ├── musicDetail.vue
        │   ├── musicVideoPage.vue
        │   └── musicVideoDetail.vue
        │
        └── 📁 router/
            └── index.js
```

## 📋 Project Overview

**projek-mulmed** is a full-stack web application with:

### Backend (Node.js)
- REST API for managing users, albums, songs, and music videos
- Authentication routes (login, register)
- Database models for different entities

### Frontend (Vue.js + Vite)
- Single Page Application (SPA)
- Component-based architecture
- Modular pages for different views
- API integration layer
- Responsive design with layouts

---

## 🎯 Key Directory Functions

| Folder | Purpose |
|--------|---------|
| **backend/models** | Database schemas and data models |
| **backend/routes** | API endpoints and authentication |
| **src/api** | API service integration with backend |
| **src/component** | Reusable Vue components |
| **src/pages** | Page-level Vue components (views) |
| **src/router** | Vue Router configuration |
| **src/assets** | Images, icons, videos, and static files |
| **src/layouts** | Layout templates (e.g., AuthLayout) |
