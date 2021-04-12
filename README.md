Rely micro service boilerplate
==============================
In order to properly setup this boilerplate, you need to change every instance
of the work boilerplate to your project's name.

You also need to update this `README.md` file.

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
```bash
npm install -g @nestjs/cli
npm install
```

You also need to install a local [MySQL server](https://dev.mysql.com/downloads/mysql/).

Documentation
-------------
```bash
npm run doc
```

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

Deploy the service
------------------
Running this command will deploy the service onto the configured AppEngine
service.
```bash
npm run deploy
```