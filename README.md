Rely micro service boilerplate
==============================

Introduction
------------
These installation instructions require you to have a bash shell, either from Git SCM for Windows or Linux. You also need to update this `README.md` file and the package.json meta data.

Cleaning up
-----------
Change every instance of the word "boilerplate" to the name of your new service.

In order to start developing a new microservice, simply use this repository as a template using the GitHub new repository interface.

The TestModule can safely be removed and is only used as a loopback test endpoint.

Security
--------
Please note that none of the endpoints available inside a microservice are available publicly, these endpoints are only to be called from the main API endpoints (probably GraphQL on Cloud Run at the time of the writting of these readme instructions) or other microservices. No permissions are validated appart from those from Google Cloud IAM.

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
npm install
npx husky install
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
