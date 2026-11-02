# SpoJeDy

projek matkul binus digidaw awikwok


![Preview](https://i.pinimg.com/736x/43/b8/6e/43b86e47b2fb881380bf816b4dde324e.jpg)


## How 2 Setup Locally

### Clone repository
```sh
git clone [https://github.com/username/nama-repositori.git](https://github.com/username/nama-repositori.git)
cd nama-repositori
```

### In the main folder
```sh
npm install tailwindcss @tailwindcss/vite
```

### Cd to the spojedy folder

```sh
cd spojedy
npm install
```

### Cd to the backend folder

```sh
cd backend
npm install
```

### Add the Mongo URI in .env

```sh
MONGO_URI=mongodb://<namaUser>:<password>@ac-jqcujoo-shard-00-00.ywus1cc.mongodb.net:27017,ac-jqcujoo-shard-00-01.ywus1cc.mongodb.net:27017,ac-jqcujoo-shard-00-02.ywus1cc.mongodb.net:27017/spojedy?ssl=true&replicaSet=atlas-2m0d14-shard-0&authSource=admin&appName=<AppName>
(ganti <namaUser> <passowrd> dan <AppName>)
```

## How 2 Run 

### Cd to the spojedy folder

```sh
cd spojedy
npm run dev (buat jalanin frontend)
```

### Cd to the backend (open a new terminal)

```sh
cd backend
npm start
```
