# Project-1 API/API Testing
----
### Intro
This API is designed for the Intro App Dev ID607001 Paper  
This uses information from the video game Another Eden as the basis for my project.  

### Installation
----
* Clone the repository [here](https://github.com/otago-polytechnic-bit-courses/s1-23-id607001-project-1-node-js-rest-api-DSmith575.git)

### Initial Setup
----
* Run `npm install` to install all dependencies 
* Create a .env file in the root directory  
* In the env use `PORT=3000`  
* Create a .env.development file in the root directory  
* Create a .env.testing file in the root directory  
* Run `npm run migrate` To migrate the db

#### .env.development  
Place the following inside  
`NODE_ENV=development`  
`DATABASE_URL=file:./dev.db`  

#### .env.testing  
Place the following inside  
`NODE_ENV=testing`  
`DATABASE_URL=file:./test.db`


### Script commands
----
`npm run dev` Run in the dev environment  
`npm run prisma` Runs in prisma studio
`npm run format` To run the prettier format  
Can also use  
`npm run p:write` `npm run p:check` to run the pretty-quick & prettier check commands
`npm run test` To run unit tests

### API Endpoints
----
| `localhost:[PORT]` | api/v1 | Endpoint |
| --- | --- | --- |
| PORT | /api/v1/ | characters |
| PORT | /api/v1/ | attributes |
| PORT | /api/v1/ | rarities |
| PORT | /api/v1/ | affinities |
| PORT | /api/v1/ | elements |
| PORT | /api/v1/ | personalities |  

`/api/v1/characters`  
`/api/v1/attributes`  
`/api/v1/rarities`  
`/api/v1/affinities`  
`/api/v1/elements`  
`/api/v1/personalities`

### Examples
----


### Packages Used
----
* NodeJS  
* Prisma  
* Dotenv  
* Joi  
* Express  
* Nodemon  
* Commitizen
* Mocha  
* Chai  
* Prettier

### References
----
[Prisma documentation](https://www.prisma.io/docs/concepts/components/prisma-schema)  
[Prisma relations](https://www.prisma.io/docs/concepts/components/prisma-schema/relations)  
[Chai documentation](https://www.chaijs.com/guide/)  
[Chai assertion](https://www.chaijs.com/guide/styles/)  
[Mocha documentation](https://mochajs.org/api/mocha)  
