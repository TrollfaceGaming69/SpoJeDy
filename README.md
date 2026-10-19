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
MONGO_URI=mongodb://<namaUser>:<password>@ac-jqcujoo-shard-00-00.ywus1cc.mongodb.net:27017,ac-jqcujoo-shard-00-01.ywus1cc.mongodb.net:27017,ac-jqcujoo-shard-00-02.ywus1cc.mongodb.net:27017/spojedy?ssl=true&replicaSet=atlas-2m0d14-shard-0&authSource=admin&appName=<AppName>
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
