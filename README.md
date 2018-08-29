# PacktPub: Learning Express Web Application Development

[Course][1]

This course is a few years old now (December 2014)

I am using current version of NodeJS and [Yarn][2] package manager instead of **npm**

My development environment is Ubuntu 16.04.5 LTS

## Install Express.js and command-line tools

- [Install Node][4]
- [Install Yarn][3]

## Bootstrapping Your First App

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

[1]: https://www.packtpub.com/mapt/video/video/9781783989881
[2]: https://yarnpkg.com/en/
[3]: https://yarnpkg.com/en/docs/install#debian-stable
[4]: https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions
