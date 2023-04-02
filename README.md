# Repository Introduction

## What is starter template?

This Template is to speed up development for Serverless apps written by Typescript and support friendly development environment

## What starter template covers?

- Backbone of Serverless app that will provide API level service and Stand alone Lambda service
- SQL DataBase connection via [Knex](https://www.npmjs.com/package/knex)
- Cache management via [Redis](https://www.npmjs.com/package/redis)
- Queue management via [Redis](https://www.npmjs.com/package/node-redis-pubsub)
- CRUD Operation for a resource within MVC architecture
- Import CSV management via `S3` Presigned URLs + Lambda event listener
- Batch Insert into DataBase's Table
- Batch Delete from DataBase's Table

## What is start template technical stack?

- Docker to build Postgresql Database and Redis instances
- ExpressJs with TypeScript
- Knex to handle Database management
- Redis to handle cache and pub/sub management
- Jest to handle testing
- Nodemon to handle local development build and run
- Serverless to handle build, deployment and run in AWS

## How to run this app locally?

- Make sure you have `NodeJs, Npm, Yarn, and Docker` installed on your machine
- Make sure `Docker is up and running`
- Create `.env.development` for local environment, `.ene.test` for test environment
- Run command `yarn install` to download all required packages
- Run command `yarn docker:build` to build docker images for DB + Redis
- Run command `yarn docker:up` to run docker images for DB + Redis
- Run command `yarn start:development` to start the app locally
  - This command will build then export the TS app to build folder then run it from there
  - Changes will be caught and the app will be rebuilt and reloaded via `nodemon`

## How to stop the app

- Exit the app via (command + c for `mac` and control + c for `windows + linux`)
- Run command `yarn docker:down` to shutdown docker images for DB + Redis

## How to add a new migration file?

- As we are using kenx with typescript and we are relying on build folder to manage our work, we identified the path to kenx in node modules to be the start point
  - example: `Create a new user table`
    - Run command `yarn knex migrate:make create-user-table`
- So in short add `yarn` to any `knex` command to work as expected
