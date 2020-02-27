# midnightboard

University project for the Wintersemester 19/20 to create a "schwarzes brett" on the web.

Please also see: [contributing](https://github.com/conclurer/midnightboard/blob/master/CONTRIBUTING.md) and [conventions](https://github.com/conclurer/midnightboard/blob/master/CONVENTIONS.md)

---

## DockerHub
Images for [application](https://hub.docker.com/r/tvsjsdock/midnightboard-app/tags) & [database](https://hub.docker.com/r/tvsjsdock/midnightboard-db/tags)

### Demo page on heroku is in progress

## Swagger [API Documentation](https://rawcdn.githack.com/conclurer/midnightboard/master/sails/swagger/swagger.html)

---

## Quick setup with Docker

#### 1. Install modules

```bash
$ npm install
```

#### 2. Build and start the docker images (database & application)

```bash
$ docker-compose build
$ docker-compose up
```

---

## Setup for development

#### Install modules & set up project

```bash
$ npm install
$ npm run setup
$ docker-compose up --no-deps --build --force-recreate db
```

#### Frontend (Vue.js)

```bash
$ cd vue
$ npm run serve
```

#### Backend (Sails.js)

```bash
$ cd sails
$ npm run start-dev
```

#### Open [http://localhost:1337/](http://localhost:1337/)

##### Restart database (imports automatically changes on db/backup.sql)

```bash
$ docker-compose stop db && docker-compose rm -f -v db && docker-compose up --no-deps --build --force-recreate db
```

---

## Setup without Docker
For running a local PostgreSQL server check out [datastores.js](https://github.com/conclurer/midnightboard/blob/master/sails/config/datastores.js) for more details.

```bash
$ npm install
$ npm run setup
$ npm run sails-start-dev
```

---
