---
layout: fs-post
title: <strong>Todos v3 project environment setting</strong>
categories: fastcampus
section: fastcampus
seq: 26
permalink: /:categories/:title
description:
---

* TOC
{:toc}

![](/assets/fs-images/exercise/todos.gif)

# 1. 디렉터리 구조

```bash
Project/
├── models/          # Models (Backend)
│   └── todo.js
├── public/          # Root directory (Frontend)
│   └── index.html
├── routes/          # Routes (Backend)
│   └── todos.js
├── src              # Source code (Frontend) => Transfiling => public
│   ├── js
│   │   └── app.js
│   └── sass
│       ├── partials/
│       └── style.scss
├── .env               # config file (Backend)
├── pakage.json
├── server.js          # Source code (Backend)
└── webpack.config.js  # config file (Frontend)
```

# 2. Front-end Setting

## 2.1 Install

```bash
$ cd <project-name>
$ npm init -y
# eslint
$ npm install --save-dev eslint eslint-config-airbnb-base eslint-plugin-import eslint-plugin-html
# install babel + webpack & friends
$ npm install --save-dev @babel/cli @babel/core @babel/plugin-proposal-class-properties @babel/preset-env babel-loader css-loader mini-css-extract-plugin node-sass sass-loader style-loader webpack webpack-cli
# install babel polyfill
$ npm install @babel/polyfill
```

## 2.2 Configuration

**.eslintrc.js**

```javascript
module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": false,
    "node": true,
    "jquery": true
  },
  "extends": "airbnb-base",
  "plugins": ["import", "html"],
  "rules": {
    // 0 "off", 1 "warn" 2 "error"
    "no-console": "warn",
    "quotes": ["error", "single"],
    "no-underscore-dangle": "off",
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "comma-dangle": ["error", "never"],
    "func-names": [2, "never"],
    "arrow-parens": ["error", "as-needed"]
  }
};
```

**webpack.config.js**

```javascript
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // entry files
  entry: ['@babel/polyfill', './src/js/app.js', './src/sass/style.scss'],
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    // 트랜스파일링된 소스 코드는 public에 저장된다.
    path: path.resolve(__dirname, 'public'),
    filename: 'js/bundle.js'
  },
  plugins: [
    // 트랜스파일링 + 번들링 CSS 파일이 저장될 경로와 이름 지정
    new MiniCssExtractPlugin({ filename: 'css/style.css' })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/js')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader?outputStyle=expanded'
          // 'sass-loader?outputStyle=compressed'
        ],
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map',
  // https://webpack.js.org/concepts/mode/#mode-development
  mode: 'development'
};
```

**package.json**

```json
{
  "name": "v3-1",
  "version": "1.0.0",
  "scripts": {
    "build": "webpack -w"
  },
  "devDependencies": {
    "@babel/cli": "^7.4.4",
    "@babel/core": "^7.4.5",
    "@babel/plugin-proposal-class-properties": "^7.4.4",
    "@babel/preset-env": "^7.4.5",
    "babel-loader": "^8.0.6",
    "css-loader": "^2.1.1",
    "eslint": "^5.16.0",
    "eslint-config-airbnb-base": "^13.1.0",
    "eslint-plugin-html": "^5.0.5",
    "eslint-plugin-import": "^2.17.3",
    "mini-css-extract-plugin": "^0.7.0",
    "node-sass": "^4.12.0",
    "sass-loader": "^7.1.0",
    "style-loader": "^0.23.1",
    "webpack": "^4.32.2",
    "webpack-cli": "^3.3.2"
  },
  "dependencies": {
    "@babel/polyfill": "^7.4.4"
  }
}
```

## 2.3 Build

```bash
$ npm run build

> v3-1@1.0.0 build /Users/leeungmo/Desktop/todos/v3
> webpack -w

webpack is watching the files…

Hash: 1d419e225955d438dbb0
Version: webpack 4.32.2
Time: 2407ms
Built at: 2019-06-02 20:11:16
            Asset      Size  Chunks             Chunk Names
    css/style.css  3.82 KiB    main  [emitted]  main
css/style.css.map  4.99 KiB    main  [emitted]  main
     js/bundle.js   409 KiB    main  [emitted]  main
 js/bundle.js.map   333 KiB    main  [emitted]  main
Entrypoint main = css/style.css js/bundle.js css/style.css.map js/bundle.js.map
[0] multi @babel/polyfill ./src/js/app.js ./src/sass/style.scss 52 bytes {main} [built]
[./src/js/app.js] 5.8 KiB {main} [built]
[./src/sass/style.scss] 39 bytes {main} [built]
    + 310 hidden modules
Child mini-css-extract-plugin node_modules/css-loader/dist/cjs.js!node_modules/sass-loader/lib/loader.js?outputStyle=expanded!src/sass/style.scss:
    Entrypoint mini-css-extract-plugin = *
    [./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/lib/loader.js?outputStyle=expanded!./src/sass/style.scss] 4.23 KiB {mini-css-extract-plugin} [built]
        + 1 hidden module
```

# 3. Back-end Setting

## 3.1 Install

### 3.1.1 MongoDB Install

<!-- - [mLab Hosting service](http://poiemaweb.com/mongdb-basics#43-mlab-hosting-service) -->

#### 3.1.1.1 Window

**1. mongodb 설치**

- [mongodb 다운로드](https://www.mongodb.com/download-center/community?jmp=homepage)

자신의 OS에 알맞는 인스톨러를 다운로드하여 기본 설정으로 설치한다.


**2. DB, Collection 추가**

MongoDB Compass Community를 사용하여 아래와 같이 DB, Collection을 추가한다.

- DB: mydb
- Collection: todos

![](/img/mongodb-compass.png)

#### 3.1.1.2 Mac

**1. download & install**

Mac의 경우, Homebrew를 사용하여 install할 수 있다.

```bash
$ brew update && brew install mongodb

$ mongo -version
MongoDB shell version v4.0.3
git version: 7ea530946fa7880364d88c8d8b6026bbc9ffa48c
allocator: system
modules: none
build environment:
    distarch: x86_64
    target_arch: x86_64
```

**2. 기본 데이터베이스 디렉터리 생성**

기본 데이터베이스 디렉터리(/data/db)를 생성한다. 기본 데이터베이스 디렉터리에 데이터가 store된다.

```bash
$ mkdir -p /data/db
$ sudo chmod 777 /data/db
```

**3. DB 기동**

MongoDB Server를 기동한다.

```bash
$ mongod
```

<!-- 새로운 터미널에서 MongoDB Client를 기동한다.

```bash
$ mongo
``` -->

**4. MongoDB Compass 설치**

- [MongoDB Compass 다운로드](https://www.mongodb.com/download-center/compass)

**5. DB, Collection 추가**

MongoDB Compass를 사용하여 아래와 같이 DB, Collection을 추가한다.

- DB: mydb
- Collection: todos

![](/img/mongodb-compass-mac.png)

### 3.1.2 Dependency Install

```bash
$ npm install nodemon -g
$ cd <project-name>
$ npm install express body-parser dotenv mongoose cors
```

package.json

```json
...
  "dependencies": {
    "@babel/polyfill": "^7.4.4",
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "dotenv": "^8.0.0",
    "express": "^4.17.1",
    "mongoose": "^5.5.12"
  }
}
```

## 3.2 Configuration

**.env**

```bash
# port number
PORT=4500
# MongoDB URI & User/Password
MONGO_URI=mongodb://localhost:27017/mydb
# mlab의 경우
# MONGO_URI=mongodb://<userid>:<password>@<database>:<port>/<db-name>
```

**package.json**

```json
  ...
  "scripts": {
    "start": "nodemon server.js",
    "build": "webpack -w"
  },
```

**models/todo.js**

```javascript
const mongoose = require('mongoose');

// Define Schemes
const todoSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  content: { type: String, required: true },
  completed: { type: Boolean, default: false }
},
{
  timestamps: true
});

// Create new todo document
// Statics model methods(Statics): Schema의 statics 프로퍼티에 사용자 정의 메소드를 추가한다.
todoSchema.statics.create = function (payload) {
  // this === Model Todo
  const todo = new this(payload);
  // return Promise
  return todo.save();
};

// Find All
todoSchema.statics.findAll = function () {
  return this.find({}, {
    _id: false, id: true, content: true, completed: true
  }).sort({ id: 'desc' });
};

// Update All
todoSchema.statics.updateAll = function (payload) {
  return this.update({ }, payload, { multi: true });
};

// Update by todoid
todoSchema.statics.updateByTodoid = function (id, payload) {
  return this.findOneAndUpdate({ id }, payload);
};

// Delete by todoid
todoSchema.statics.deleteByTodoid = function (id) {
  return this.remove({ id });
};

// Delete by completed
todoSchema.statics.deleteByCompleted = function () {
  return this.remove({ completed: true });
};

// Create Model & Export
module.exports = mongoose.model('Todo', todoSchema);
```

**routes/todos.js**

```javascript
const router = require('express').Router();
const Todo = require('../models/todo');

// Find All
router.get('/', (req, res) => {
  Todo.findAll()
    .then(todos => res.send(todos))
    .catch(err => res.status(500).send(err));
});

// Create new todo document
router.post('/', (req, res) => {
  Todo.create(req.body)
    .then(() => Todo.findAll())
    .then(todos => res.send(todos))
    .catch(err => res.status(500).send(err));
});

// Update All
router.patch('/', (req, res) => {
  Todo.updateAll(req.body)
    .then(() => Todo.findAll())
    .then(todos => res.send(todos))
    .catch(err => res.status(500).send(err));
});

// Update by id
router.patch('/:id([0-9]+)', (req, res) => {
  Todo.updateByTodoid(req.params.id, req.body)
    .then(() => Todo.findAll())
    .then(todos => res.send(todos))
    .catch(err => res.status(500).send(err));
});

// Delete by id
router.delete('/:id([0-9]+)', (req, res) => {
  Todo.deleteByTodoid(req.params.id)
    .then(() => Todo.findAll())
    .then(todos => res.send(todos))
    .catch(err => res.status(500).send(err));
});

// Delete by completed
router.delete('/completed', (req, res) => {
  Todo.deleteByCompleted()
    .then(() => Todo.findAll())
    .then(todos => res.send(todos))
    .catch(err => res.status(500).send(err));
});

module.exports = router;
```

**server.js**

```javascript
// ENV
require('dotenv').config();

// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());

const port = process.env.PORT || 4500;

// Static File Service
app.use(express.static('public'));

// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Node의 native Promise 사용
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(console.error);

// ROUTERS
app.use('/todos', require('./routes/todos'));

// app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server listening on port ${port}`));
```

## 3.3 Serve

```bash
$ npm start
```

## 3.4 REST APIs

### 3.4.1 Find All

```
GET /todos
```

### 3.4.2 Create new todo

```
POST /todos

{
	"id": <number>,
	"content": <string>,
	"completed": <boolean>
}
```

### 3.4.3 Update All

```
PATCH /todos

{
	"completed": <boolean>
}
```

### 3.4.4 Update by id

```
PATCH /todos/:id

{
	"completed": <boolean>
}
```

### 3.4.5 Delete by id

```
DELETE /todos/:id
```

### 3.4.6 Delete by completed

```
DELETE /todos/completed
```

