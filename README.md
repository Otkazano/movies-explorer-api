### Бэкенд для веб приложения «‎Movies explorer»‎
Этот проект представляет собой интерактивную SPA-страницу, на которой пользователи могут искать фильмы по ключевым словам и добавлять их в избранное в личном кабинете.


### Технологии в проекте:  
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

### Директории:
`/routes` — папка с файлами роутера  
`/controllers` — папка с файлами контроллеров пользователя и фильма   
`/models` — папка с файлами описания схем пользователя и фильма  

### Функционал в проекте: 
* Для пользователя:
  - GET `/users/me` - возвращает текущего пользователя
  - PATCH `/users/me` - обновляет данные пользователя
  - POST `/signin` - для авторизации пользователя
  - POST `/signup` - для регистрации пользователя 

* Для карточек:
  - GET `/movies` - возвращает все лайкнутые пользователем фильмы
  - POST `/movies` - добавляет лайкнутый фильм в базу данных 
  - DELETE `/movies/:movieId` - удаляет фильм из лайкнутых по id

### Установка и запуск проекта: 
Клонировать репозиторий:
```bash
git clone https://github.com/Otkazano/movies-explorer-api.git
```
Установить зависимости:
```bash
npm install
```
Запустить базу данных:
```bash
mongod
```
Запустить сервер:
```bash
npm run start
```
Запустить сервер с hot-reload:
```bash
npm run dev
```

### Api добавлен на удаленный сервер и доступен по [ссылке](https://api.movies.media.nomoredomainsmonster.ru/)
