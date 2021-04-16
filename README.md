Rely micro service boilerplate
==============================
In order to properly setup this boilerplate, you need to change the SERVICE environment variable.

These installation instructions require you to have a bash shell, either from Git SCM for Windows or Linux.

You also need to update this `README.md` file and the package.json meta data.

Environment
-----------
The environment variables are loaded from the `env/` folder in the following
order, variables are kept in order of priority from the first file:

```bash
env/local.env
env/development.env
env/production.env
```

Installation
------------
Development tools
```bash
npm install -g @nestjs/cli
npm run prepare
npm install
```

You also need to install a local [MySQL server](https://dev.mysql.com/downloads/mysql).

Running the service
-------------------
```bash
# development
npm run start:dev

# production mode
npm run start:prod
```

Testing the service
-------------------
```bash
# unit tests
npm test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```
