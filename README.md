# SpoJeDy

projek matkul binus digidaw awikwok


![Preview](https://i.pinimg.com/736x/43/b8/6e/43b86e47b2fb881380bf816b4dde324e.jpg)


## Tutor Setup

### Clone repository
```sh
git clone [https://github.com/username/nama-repositori.git](https://github.com/username/nama-repositori.git)
cd nama-repositori
```

### Di folder utama
```sh
npm install tailwindcss @tailwindcss/vite
```

### Masuk folder spojedy

```sh
cd spojedy
npm install
```

### Masuk folder backed

```sh
cd backend
npm install
```

### Tambah Mongo URI di .env

```sh
MONGO_URI=mongodb+srv://<namaUser>:<password>@spojedycluster.ywus1cc.mongodb.net/?appName=<AppName>
(ganti <namaUser> <passowrd> dan <AppName>)
```

## Tutor Jalanin

### Masuk folder spojedy

```sh
cd spojedy
npm run dev (buat jalanin frontend)
```

### Masuk folder backed (buka terminal baru)

```sh
cd backend
npm start
```


### Kalo Error WA atau DM Discrot bisa
![Demo](https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3U4MXM2NGVqeGdkaHNxMTN3bzRidzNoNnBjdDh5NnN3cWx4Z3RtYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4qylsr9HFUjsmCWdy9/giphy.gif)

## Projek-Mulmed - Project Structure

```
SpoJeDy/
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

## Key Directory Functions

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

