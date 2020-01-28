# midnightboard

University project for the Wintersemester 19/20 to create a "schwarzes brett" on the web.

Please also see: [contributing](https://github.com/conclurer/midnightboard/blob/master/CONTRIBUTING.md) and [conventions](https://github.com/conclurer/midnightboard/blob/master/CONVENTIONS.md)


#### Install modules

```bash
$ npm install
```

## Development with Docker (recommended)

```bash
$ docker-compose up
```

Restart database without application:

```bash
$ docker-compose stop db && docker-compose rm -f -v db && docker-compose up --no-deps --build --force-recreate db
```

### Development without Docker
#### You have to start PostgreSQL as local instance!
Check [datastores.js](https://github.com/conclurer/midnightboard/blob/master/sails/config/datastores.js) for more details.

```bash
$ npm run setup
$ npm run sails-start-dev
```

## Run
[http://localhost:1337/](http://localhost:1337/)

## Swagger API
[API Documentation](https://github.com/conclurer/midnightboard/blob/development/sails/swagger/swagger.html)

# DockerHub
[Build docker images](https://hub.docker.com/r/tvsjsdock/midnightboard-test/tags)

# Demo page (WIP)
[On heroku](https://midnightboard-test.herokuapp.com)