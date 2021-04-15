Rely micro service boilerplate
==============================
In order to properly setup this boilerplate, you need to change every instance
of the word boilerplate to your project's name.

These installation instructions require you to have a bash shell, either from Git SCM for Windows or Linux.

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
Pub/Sub emulator
```bash
gcloud components install pubsub-emulator
gcloud components update
```

Development tools
```bash
yarn global install @nestjs/cli
yarn install
```

You also need to install a local [MySQL server](https://dev.mysql.com/downloads/mysql).

Running the service
-------------------
```bash
# development
yarn run start:dev

# production mode
yarn run start:prod
```

Testing the service
-------------------
```bash
# unit tests
yarn test

# e2e tests
yarn run test:e2e

# test coverage
yarn run test:cov
```
