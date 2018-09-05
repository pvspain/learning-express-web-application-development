# PacktPub: Learning Express Web Application Development

[Course][1]

## Index

- [PacktPub: Learning Express Web Application Development](#packtpub-learning-express-web-application-development)
  - [Index](#index)
  - [Introduction](#introduction)
  - [Getting Started](#getting-started)
    - [Install Express.js and command-line tools](#install-expressjs-and-command-line-tools)
    - [Bootstrapping Your First App](#bootstrapping-your-first-app)
    - [Structure of an Express.js App](#structure-of-an-expressjs-app)
  - [Front-End Development](#front-end-development)
    - [Introducing the Jade Template Engine](#introducing-the-jade-template-engine)
    - [Introducing Stylus](#introducing-stylus)
    - [Bootstrap with Jade and Stylus](#bootstrap-with-jade-and-stylus)
    - [Public and Static Files](#public-and-static-files)
    - [Other templating options](#other-templating-options)
  - [Planning Our Application](#planning-our-application)
    - [Planning the Structure of Our Application](#planning-the-structure-of-our-application)
    - [Installing the Necessary Modules](#installing-the-necessary-modules)
    - [Creating Our Endpoints](#creating-our-endpoints)
  - [Creating Our User Interface](#creating-our-user-interface)
    - [Creating Our Application’s User Interface](#creating-our-applications-user-interface)
      - [Adding bootstrap via `yarn`](#adding-bootstrap-via-yarn)
    - [Displaying Dynamic Data with Jade](#displaying-dynamic-data-with-jade)
  - [Automated Testing](#automated-testing)
    - [Micro Testing/Unit Testing Versus Full Stack Testing](#micro-testingunit-testing-versus-full-stack-testing)
      - [Full Stack Testing (Selenium)](#full-stack-testing-selenium)
      - [Microtesing (Unit testing)](#microtesing-unit-testing)
      - [TDD/BDD](#tddbdd)
      - [Test Client](#test-client)
    - [Setting Up Test Tools](#setting-up-test-tools)
    - [Server-side JS Testing Versus Client-side JS Testing](#server-side-js-testing-versus-client-side-js-testing)
  - [Storing Data in MongoDB](#storing-data-in-mongodb)
    - [Installing and Configuring MongoDB](#installing-and-configuring-mongodb)
    - [Wiring Up Mongoose.js](#wiring-up-mongoosejs)
    - [Creating Our Models](#creating-our-models)
    - [Differences between MongoDB and a Relational Database](#differences-between-mongodb-and-a-relational-database)
  - [Auhenticating Users](#auhenticating-users)
  - [Deployment Options](#deployment-options)
  - [Final Thoughts](#final-thoughts)
  
## Introduction

This course is a few years old now (December 2014)

I am using current version of **NodeJS** and [Yarn][2] package manager instead of **npm**. My development environment is Ubuntu 16.04.5 LTS (Linux).

The following sections are my notes for the PacktPub video course. The structure below maps directly to the chapter structure of the course. Missing sections from the PacktPub structure indicate I didn't watch or didn't take any notes for the chapter.

## Getting Started

### Install Express.js and command-line tools

- [Install Node][4]
- [Install Yarn][3]

### Bootstrapping Your First App

```[Bash]
ROOT_PATH=~/git/github/pvspain/learning-express-web-application-development
mkdir --parents $ROOT_PATH/project1
cd $ROOT_PATH
# Initialise new Git repository
git init
cd project1

yarn add express-generator
# Validate installation
express --version
# Create a new express project with support for Stylus CSS engine
express --css stylus
# Install dependencies
yarn install
# Start Express webserver on localhost:3000
DEBUG=project1:* yarn start
```

Initialise project `.gitignore` from NodeJS [template][5]

### Structure of an Express.js App

- A lot of files are generated by Express
- `package.json`
  - common to all NodeJS projects
  - holds project metadata
  - defines _scripts_
    - executed as arguments to package manager
      ```[Bash]
      yarn start
      ```
  - lists dependencies
  - note `express`, `jade` (view engine), `stylus` (css engine specified when project generated)
- `app.js`
  - Express application file - initially auto-generated
- `bin/www`
  - Node webserver generated by Express
- `node_modules`
  - required modules - managed by package manager (Yarn)
        - exclude from version control
- `public`
  - static website assets - _not_ managed by Express
- `public/stylesheets`
  - Edit CSS styles in `style.styl` (Stylus) file
  - `style.css` is generated by CSS engine, which is invoked by Express
- `routes`
  - dynamic routes for application
  - route mappings are wired up in `app.js` ...
    ```[Bash]
    var indexRouter = require('./routes/index');
    var usersRouter = require('./routes/users');
    ...
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    ```  
- `views`
  - application views rendered by Jade engine

## Front-End Development

### Introducing the Jade Template Engine

- [Jade home][7]

### Introducing Stylus

- [Stylus home][6]

### Bootstrap with Jade and Stylus

- [Bootstrap home][8]
- [Bootstrap documentation][9]
- three versions
  - CSS, Sass, [Less][10] (see below)

### Public and Static Files

- stored in `public` folder
- static website assets - _not_ managed by Express
- add `public/fonts` folder for web-fonts

### Other templating options

- HTML template engines
  - Mustache
  - Handlebars (superset of handlebars)
    ```[Bash]
    yarn add express-handlebars
    ```
    - change view engine ienginesenginesn `app.js`
- more popular CSS pre-processors than Stylus now.
  - Sass
    - `compass` node module
    - written in Ruby
  - [Less][10]
    - very similar to Sass
    - written in JavaScript
    ```[Bash]
    express --css less
    ```

## Planning Our Application

### Planning the Structure of Our Application

- Authentication
  - PassportJS
    - social: Twitter, Facebook etc
    - SSO: GitHub, OpenID
    - local: username/password
- Database
  - Relational: MySQL
  - Key-value: Redis
  - Non-releational: Mongo (Mongoose.js)
- Testing
  - Runner: Karma
  - Framework: Mocha.js
  - Assertion lib: Chai
  - Mocking: Sinon.js
  - Helper util: SuperTest

### Installing the Necessary Modules

```[Bash]
yarn add --dev chai karma mocha sinon supertest
yarn add mongoose passport
```

### Creating Our Endpoints

Express doesn't restart webserver for server-side code changes.
Adding `supervisor` to dev dependencies restarts webserver when source changes detected.

```[Bash]
yarn add --dev supervisor
```

We also adjust `start` script in `package.json` to use `supervisor`:

```[Bash]
"scripts": {
    "start": "node node_modules/.bin/supervisor bin/www"
  },
```

Remove `users` routes created by default by Express.

Add routes for `/contacts` in `routes/contacts.js`

Wire up new routes in `app.js`

## Creating Our User Interface

### Creating Our Application’s User Interface

The `|` character in Jade is a line-continuation character for the current tag - whitespace is significant in Jade, like Python.

[Download][12] bootstrap files  
Add `bootstrap*.css` files as imports in `public\stylesheets\style.stl`

#### Adding bootstrap via `yarn`

[Processing peer dependencies for `bootstrap` npm module][11]

```[Bash]
yarn add bootstrap
yarn global add install-peerdeps
install-peerdeps bootstrap

# On yarn restart, bootstrap errors:

Starting child process with 'node bin/www'
/home/paul/git/github/pvspain/learning-express-web-application-development/project1/node_modules/bootstrap/dist/js/bootstrap.js:122
      $$$1.fn.emulateTransitionEnd = transitionEndEmulator;
                                   ^

TypeError: Cannot set property 'emulateTransitionEnd' of undefined
    at setTransitionEndSupport (/home/paul/git/github/pvspain/learning-express-web-application-development/project1/node_modules/bootstrap/dist/js/bootstrap.js:122:36)
    at /home/paul/git/github/pvspain/learning-express-web-application-development/project1/node_modules/bootstrap/dist/js/bootstrap.js:199:5
    at /home/paul/git/github/pvspain/learning-express-web-application-development/project1/node_modules/bootstrap/dist/js/bootstrap.js:201:4
    at /home/paul/git/github/pvspain/learning-express-web-application-development/project1/node_modules/bootstrap/dist/js/bootstrap.js:7:66
    at Object.<anonymous> (/home/paul/git/github/pvspain/learning-express-web-application-development/project1/node_modules/bootstrap/dist/js/bootstrap.js:10:2)
    at Module._compile (module.js:652:30)
    at Object.Module._extensions..js (module.js:663:10)
    at Module.load (module.js:565:32)
    at tryModuleLoad (module.js:505:12)
    at Function.Module._load (module.js:497:3)
Program node bin/www exited with code 1

# Reverting to explicitly importing bootstrap css to project...

yarn remove bootstrap popper.js jquery
```

### Displaying Dynamic Data with Jade

[`lodash.js`][14] is a JS utility library - a [superset][15] of `underscore.js`. Many of it's functions are now [included][13] in ES6

```[Bash]
yarn add lodash
yarn add method-override
```

Hacks needed to deal with PUT and DELETE requests, since browsers only support GET and POST HTTP verbs.

- PUT managed by `method-override` Node module, and form action argument in `views/edit.jade`:
  - `action="/contacts/#{contact.id}?_method=put"`
- DELETE managed by adding `jquery-min.js` and `main.js` (to `public/javascripts`) and including them in `views/layout.jade`
  - `main.js` intercepts all clicks on DELETE button and does an Ajax call to server to delete all checked contacts

## Automated Testing

### Micro Testing/Unit Testing Versus Full Stack Testing

#### Full Stack Testing (Selenium)

- Headless web browser
- Comprehensive - It tests
  - CSS
  - Client-side JavaScript
  - HTML
  - Databases
  - Infrastructure
- Slow (10 secs to multiple minutes)
- Others: Protractor, SST (Python)

#### Microtesing (Unit testing)

- Tests a small piece of code
  - i.e. one function or module)
- Isolated from the rest of the app
- Very fast
  
#### TDD/BDD

- Test Driven Development
  - Write tests first
  - Run the tests to be sure they fail
  - Write just enough code to make the tests pass
  - Refactor to improve code quality (with tests passing)
- Behaviour Driven Devlopment
  - Same pilosophy as TDD
  - More human-readable test format
- Both are compatible with the tools we'll be using

#### Test Client

- A tool halfway between the micro-test and the full-stack test
- In our app, it would test the full server side stack, including middleware
- It does not launch the app, instead merely runs the code in the same way Nodejs would, but with some hooks for testing
- It won't render the app and send it to a browser, but the app would not know the difference

### Setting Up Test Tools

- Karma
  - test runner for client-side code
- Mocha
  - test framework
- [Chai][16]
  - assertion library
    - note `ok()` - test for "truthiness"
- Sinon
  - mocking library
- Supertest
  - test client

- Create top-lvel folder `test` in project for tests
  
### Server-side JS Testing Versus Client-side JS Testing

- Client-side testing assumes the browser and its DOM are present.
- **Karma**, launches a test environment, loads a browser and loads environment inside browser
- **Karma** needs intialisation.

```[Bash]
./node_modules/karma/bin/karma init

Which testing framework do you want to use ?
Press tab to list possible options. Enter to move to the next question.
> mocha

Do you want to use Require.js ?
This will add Require.js plugin.
Press tab to list possible options. Enter to move to the next question.
> no

Do you want to capture any browsers automatically ?
Press tab to list possible options. Enter empty string to move to the next question.
> Chrome
>

What is the location of your source and test files ?
You can use glob patterns, eg. "js/*.js" or "test/**/*Spec.js".
Enter empty string to move to the next question.
> public/javascripts/**/*.js
> browser-tests/**/*.js
05 09 2018 18:13:34.188:WARN [init]: There is no file matching this pattern.

>

Should any of the files included by the previous patterns be excluded ?
You can use glob patterns, eg. "**/*.swp".
Enter empty string to move to the next question.
>

Do you want Karma to watch all the files and run the tests on change ?
Press tab to list possible options.
> yes


Config file generated at "/home/paul/git/github/pvspain/learning-express-web-application-development/project1/karma.conf.js".
```

- Create `browser-tests` folder anr run **Karma**

```[Bash]
mkdir browser-tests
./node_modules/karma/bin/karma start --single-run
```

- Add `karma` entry to `package.json` to simplify running tests

```[Bash]
  "scripts": {
    ...
    "karma": "./node_modules/karma/bin/karma start --single-run"
  },
```

- Execute

```[Bash]
yarn run karma
```

- Add `chai` and `sinon` to `karma.conf.js` as additional frameworks

```[Bash]
yarn add --dev karma-chai karma-sinon
```

## Storing Data in MongoDB

### Installing and Configuring MongoDB

- [Install MongoDB][17]

  - Use `apt` package manager on **Ubuntu 18.04**
  
    ```[Bash]
    sudo apt update
    sudo apt install -y mongodb
    # Get status
    sudo systemctl status mongodb
    # Further validation
    mongo --eval 'db.runCommand({ connectionStatus: 1 })'
    ```

  - Or use instructions in Mongo docs for [other Linux distros][19] 

### Wiring Up Mongoose.js

- We need one **Mongo** connection per app
- Typically, Mongo will be running on a different host
- We need a dev-only local instance of Mongo
- Note that Mongo runs asynchronously
  - In production environment, Mongo may intialise after your app is ready. 
    - When the connection is live **Mongoose** will fire an `open` event.
    - Handle this event to be notified. Refer to the [Mongoose docs][20]

    ```[Javascript]
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      // we're connected!
    });
    ```

### Creating Our Models

- **MongoDB** is a *document* database.
  - Other examples: CouchDB, Cassandra
- **Mongoose** allows us to define **schemas**.
- Schemas:
  - have helper functions to access data
  - can be defined anywhere, but typically in `models` folder under root of project
    ```[Bash]
    mkdir models
    ```
  - one schema per file
  - file name matches schema

### Differences between MongoDB and a Relational Database

-  Non-relational databases
- **MongoDB** is a *document* database.
  - Other examples: CouchDB, Cassandra
- Key/Value stores
  - Examples: Redis, GDBM, Memcached
- Graph databases
  - Example: Neo4j
- Column-oriented databases
  - Example: HBase

## Auhenticating Users

## Deployment Options

## Final Thoughts

[1]: https://www.packtpub.com/mapt/video/video/9781783989881
[2]: https://yarnpkg.com/en/
[3]: https://yarnpkg.com/en/docs/install#debian-stable
[4]: https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions
[5]: https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore
[6]: http://stylus-lang.com/
[7]: http://jade-lang.com/
[8]: https://getbootstrap.com/
[9]: https://getbootstrap.com/docs/4.1/getting-started/introduction/
[10]: http://lesscss.org/
[11]: https://github.com/yarnpkg/yarn/issues/1503
[12]: https://getbootstrap.com/
[13]: https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore
[14]: https://web.archive.org/web/20180101093627/http://kitcambridge.be/blog/say-hello-to-lo-dash/
[15]: https://stackoverflow.com/questions/13789618/differences-between-lodash-and-underscore
[16]: http://www.chaijs.com/
[17]: https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-18-04
[18]: https://docs.mongodb.com/
[19]: https://docs.mongodb.com/manual/administration/install-on-linux/
[20]: https://mongoosejs.com/docs/