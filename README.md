# Learn4Life Workshop

## Outline

- [Overview](#markdown-header-overview)
- [Local Setup](#markdown-header-local-setup)
- [Build a project with WebUI - Framework](#markdown-header-build-a-framework)
  	- [1. Intro](#markdown-header-1-intro)
    - [2. Setting up the project template locally](#markdown-header-2-setting-up-the-project-template-locally)
    - [3. Front-End Exercises](#markdown-header-3-front-end-exercises)
    - [4. Back-End Exercises](#markdown-header-4-back-end-exercises)
    - [5. Development Process](#markdown-header-5-development-process)
- [References](#markdown-header-references)

---

## Overview

The purpose of this repository is to provide training material and step by step instructions. The workshop will be split in 2 categories (Backend & Frontend) over the course of 2-3 days.

At the end of the workshop we would have successfully built a web project based on our stack using Strapi and Vue.js.

---

## Local Setup

### Docker

[Docker](https://www.docker.com/) choose based on your installed OS.
_Note: If you use Windows, We recommend that you should install Windows Subsystem for Linux ([WSL](https://learn.microsoft.com/en-us/windows/wsl/install)). This will integrate Docker into WSL automatically. The WSL should be installed after the Docker._

### IDE

Install an editor of your choice. For this workshop, presenters will be using [Visual Studio Code](https://code.visualstudio.com).

### Chrome Extension

Install Chrome extension [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd).

## Build a Framework

### 1. Intro

All applications are built using Docker. For backend, we use docker image [strapi/strapi](https://hub.docker.com/r/strapi/strapi). For frontend, we use docker image [node:lts-alpine](https://hub.docker.com/_/node) and [vue-cli](https://cli.vuejs.org/guide/installation.html) to install the SPAs (Single Page Applications). A single-page application is a web application or website that interacts with the web browser by dynamically rewriting the current web page with new data from the web server.

- Set of [UI-fort](https://docs.uifort.com/bamburgh-vue-admin-dashboard-bootstrap-vue-pro-docs) Components built in accordance with 4Life design system.

### 2. Setting up the project template locally

1. Clone the repository via HTTPS/SSH (https://bitbucket.org/kmutt-ets/learn4life-workshop.git)
2. Go to the directory of the project: `cd learn4life-workshop`
3. Create your own branch: `git checkout -b <your-branch-name>`
4. Setup backend:

    - Install dependencies via: `docker-compose run --rm backend npm install`
    - Start backend server: `docker-compose up backend`
    - Open Strapi admin account via [admin panel](http://localhost:1337)

5. Setup Frontend:

    - Install dependencies via: `docker-compose run --rm frontend npm install`
    - Start frontend server: `docker-compose up frontend`
    - Open Web application via [web](http://localhost:8080)

Now you should have a running Strapi server hosted on `localhost:1337` and Vue application hosted on `localhost:8080`.

## 3. [Front-End Exercises](docs/FRONTEND_WORKSHOP.md)

## 4. [Back-End Exercises](docs/BACKEND_WORKSHOP.md)

## 5. [Development Process](docs/DEVELOPMENT_PROCESS.md)
