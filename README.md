<!-- TOC --><a name="project-1-apiapi-testing"></a>
# Project-1 API/API Testing  

<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->
## Table of Contents
- [About](#about)
  * [Installation](#installation)
  * [Initial Setup](#initial-setup)
      - [Setting up the dev environment](#envdevelopment)
      - [Setting up the test environment](#envtesting)
  * [Script commands](#script-commands)
  * [API Endpoints](#api-endpoints)
  * [Example Inputs](#example-inputs)
  * [Example Outputs](#example-outputs)
  * [Packages Used](#packages-used)
  * [References](#references)

<!-- TOC end -->

<!-- TOC --><a name="about"></a>
# About
This API is designed for the Intro App Dev ID607001 Paper  
To create an API and implement CRUD functionality and testing
This uses information from the video game Another Eden as the basis for my project.  
Character information gathered from the [wiki](https://anothereden.wiki/w/Characters) & In-game

<!-- TOC --><a name="installation"></a>
## Installation
- Clone the [repository](https://github.com/otago-polytechnic-bit-courses/s1-23-id607001-project-1-node-js-rest-api-DSmith575.git)

<!-- TOC --><a name="initial-setup"></a>
## Initial Setup

- Run `npm install` to install all dependencies
- Create a .env file in the root directory
- In the env use `PORT=3000`
- Create a .env.development file in the root directory
- Create a .env.testing file in the root directory
- Run `npm run migrate` To migrate the db
- Save if auto-save isn't turned on

<!-- TOC --><a name="envdevelopment"></a>
#### .env.development

Place the following inside  
`NODE_ENV=development`  
`DATABASE_URL=file:./dev.db`

<!-- TOC --><a name="envtesting"></a>
#### .env.testing

Place the following inside  
`NODE_ENV=testing`  
`DATABASE_URL=file:./test.db`

<!-- TOC --><a name="script-commands"></a>
## Script commands

`npm run dev` Run in the dev environment  
`npm run prisma` Runs in prisma studio  
`npm run test` To run unit tests  
`npm run format` To run the prettier format  
Can also use  
`npm run p:write` `npm run p:check` to run the pretty-quick & prettier check commands  

<!-- TOC --><a name="api-endpoints"></a>
## API Endpoints
#### Will display route list
```js
localhost:3000/
```


| `localhost:[PORT]` | api/v1   | Endpoint      |
| ------------------ | -------- | ------------- |
| PORT               | /api/v1/ | characters    |
| PORT               | /api/v1/ | attributes    |
| PORT               | /api/v1/ | rarities      |
| PORT               | /api/v1/ | affinities    |
| PORT               | /api/v1/ | elements      |
| PORT               | /api/v1/ | personalities |

`/api/v1/characters`  
`/api/v1/attributes`  
`/api/v1/rarities`  
`/api/v1/affinities`  
`/api/v1/elements`  
`/api/v1/personalities`

<!-- TOC --><a name="example-inputs"></a>
## Example Inputs
`/characters`

```js
"name": "Example name",
"affinity": "Light",
"description": "This is a character description"
```

`/rarities`

```js
"rarity": 3,
"className": "Warrior",
"characterId": 1
```

`/affinities`

```js
  "bonus5": "SPD +5",
  "bonus15": "PWR +10",
  "bonus30": "INT + 3",
  "bonus50": "END + 10",
  "bonus75": "LCK + 40",
  "bonus80": "Skill Slot +1",
  "bonus105": "SPD + 20",
  "bonus120": "PWR + 20",
  "bonus140": "Grasta Slot +1",
  "bonus175": "INT + 2",
  "bonus200": "HP + 300",
  "bonus215": "MP + 200",
  "bonus225": "Badge Slot +1",
  "bonus255": "All Stats +10"
```

<!-- TOC --><a name="example-outputs"></a>
## Example Outputs
`/characters`

```js
{
    "id": 6,
    "name": "Abc",
    "description": "Test",
    "rarity": [],
    "element": [],
    "personality": [],
    "affinity": "Light",
    "affinityBonus": null,
    "attributes": null
},
```

`/rarities`

```js
{
    "character": 
    {
        "name": "Violet Lancer"
    },
    "rarity": 5,
    "className": "Persephone",
    "characterId": 5
}
```

`/attributes`

```js
{
    "character": 
    {
        "name": "Violet Lancer"
    },
    "characterId": 5,
    "hp": 4044,
    "mp": 413,
    "pwr": 286,
    "int": 146,
    "spd": 272,
    "end": 214,
    "spr": 178,
    "lck": 205
}
```

<!-- TOC --><a name="packages-used"></a>
## Packages Used
- NodeJS
- Prisma
- Dotenv
- Joi
- Express
- Nodemon
- Commitizen
- Mocha
- Chai
- Prettier

<!-- TOC --><a name="references"></a>
## References
[Prisma documentation](https://www.prisma.io/docs/concepts/components/prisma-schema)  
[Prisma relations](https://www.prisma.io/docs/concepts/components/prisma-schema/relations)  
[Chai documentation](https://www.chaijs.com/guide/)  
[Chai assertion](https://www.chaijs.com/guide/styles/)  
[Mocha documentation](https://mochajs.org/api/mocha)  
[Lecture Notes](https://github.com/otago-polytechnic-bit-courses/ID607001-intro-app-dev-concepts)  
[Markdown](https://github.com/tchapi/markdown-cheatsheet/blob/master/README.md)  
[Table of Contents Generator](https://derlin.github.io/bitdowntoc/)
