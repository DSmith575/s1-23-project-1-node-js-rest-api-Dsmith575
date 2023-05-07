# Project-1 API/API Testing
----
### Intro
This API is designed for the Intro App Dev ID607001 Paper  
This uses information from the video game Another Eden as the basis for my project.  

### Installation
----
* Clone the [repository](https://github.com/otago-polytechnic-bit-courses/s1-23-id607001-project-1-node-js-rest-api-DSmith575.git)

### Initial Setup
----
* Run `npm install` to install all dependencies 
* Create a .env file in the root directory  
* In the env use `PORT=3000`  
* Create a .env.development file in the root directory  
* Create a .env.testing file in the root directory  
* Run `npm run migrate` To migrate the db  
* Save if auto-save isn't turned on

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
```js
localhost:3000/
```
Will display a list of endpoints
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

### Example inputs
----
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

### Example Ouputs
----
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
            "character": {
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
            "character": {
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
