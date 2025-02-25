[![CI](https://github.com/Romanow/person-frontend/actions/workflows/build.yml/badge.svg?branch=master)](https://github.com/Romanow/person-frontend/actions/workflows/build.yml)
[![pre-commit](https://img.shields.io/badge/pre--commit-enabled-brightgreen?logo=pre-commit)](https://github.com/pre-commit/pre-commit)
[![Release](https://img.shields.io/github/v/release/Romanow/person-frontend?logo=github&sort=semver)](https://github.com/Romanow/person-frontend/releases/latest)
[![Docker Pulls](https://img.shields.io/docker/pulls/romanowalex/person-frontend?logo=docker)](https://hub.docker.com/r/romanowalex/person-frontend)
[![License](https://img.shields.io/github/license/Romanow/person-frontend)](https://github.com/Romanow/person-frontend/blob/main/LICENSE)

# Person Service

GitHub: [romanow/person-frontend](https://github.com/Romanow/person-frontend).
Person Service Backend: [romanow/person-service](https://github.com/Romanow/person-service).

## Локальный запуск

Используем [docker-compose.yml](docker-compose.yml):

```shell
$ npm install
$ docker compose up -d --wait postgres person-service
$ npm run dev
```
