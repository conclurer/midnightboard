# midnightboard

University project for the winter semester 2019/2020 to create a digital notice board as web application.

Please also see: [contributing](https://github.com/conclurer/midnightboard/blob/master/CONTRIBUTING.md) and [conventions](https://github.com/conclurer/midnightboard/blob/master/CONVENTIONS.md)

---

### Docker Architecture

![Docker Architecture](https://user-images.githubusercontent.com/12168640/80148370-41ef5480-85b5-11ea-8c20-8567f3fafeaa.png)

Images for [application](https://hub.docker.com/r/tvsjsdock/midnightboard-app/tags) & [database](https://hub.docker.com/r/tvsjsdock/midnightboard-db/tags)

---

*Demo page on heroku may come at a future release*

---

## Swagger [API Documentation](https://rawcdn.githack.com/conclurer/midnightboard/master/sails/swagger/swagger.html)

---

## Preparations
Open the [configuration folder](https://github.com/conclurer/midnightboard/tree/master/config) and change
api.js if you don't start this locally.  
**You need to configure local.js (mailbox provider needed) and then copy it to sails/config/ 
before you do the setup part!**

Optional you can configure the other files or exchange the logo if you want.

---

## Quick setup with Docker

#### 1. Install modules

```bash
$ npm install
```

#### 2. Build and start the docker images (database & application)

```bash
$ docker-compose up --build
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
$ cd vue && npm run serve
```

#### Backend (Sails.js)

```bash
$ npm run sails-start-dev
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
$ npm run start
```

---

### Database design
![ERD](https://user-images.githubusercontent.com/12168640/80149158-73b4eb00-85b6-11ea-953e-c5f85c388a61.png)

---