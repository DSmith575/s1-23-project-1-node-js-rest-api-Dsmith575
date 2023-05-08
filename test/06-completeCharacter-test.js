/**
 * API Controller for managing character affinity bonus data.
 *
 * This controller handles CRUD operations related to affinity creation
 *
 * @file: affinities.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-04-17
 * @updated: 2023-05-04
 */

process.env.NODE_ENV = "testing";

import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";

chai.use(chaiHttp);

const BASE_URL = "/api";

const character = {
  name: "Violet Lancer",
  affinity: "Shadow",
  description: "test",
};

const createElement = {
  element: "Earth",
  characterId: 5,
};

const rarityOne = {
  rarity: 2,
  className: "Thruster",
  characterId: 5,
};

const rarityTwo = {
  rarity: 3,
  className: "Lancer",
  characterId: 5,
};

const rarityThree = {
  rarity: 4,
  className: "Griffin Lance",
  characterId: 5,
};

const rarityFour = {
  rarity: 5,
  className: "Persephone",
  characterId: 5,
};

const createAffinity = {
  bonus5: "END +5",
  bonus15: "MP + 40",
  bonus30: "SPD +10",
  bonus50: "PWR +15",
  bonus75: "SPD +15",
  bonus80: "Skill Slot +1",
  bonus105: "SPD + 15",
  bonus120: "Badge Slot +1",
  bonus140: "END +20",
  bonus175: "MP + 80",
  bonus200: "Grasta Slot +1",
  bonus215: "SPD + 25",
  bonus225: "PWR +30",
  bonus255: "All Stats +10",
  characterId: 5,
};

const createPersonality = {
  personality: "Lance",
  characterId: 5,
};

const createPersonalityTwo = {
  personality: "Lost Laboratory",
  characterId: 5,
};

const createAttributes = {
  hp: 4044,
  mp: 413,
  pwr: 286,
  int: 146,
  spd: 272,
  end: 214,
  spr: 178,
  lck: 205,
  characterId: 5,
};

describe("Complete Character", () => {
  it("should create a character", (done) => {
    chai
      .request(app)
      .post(`${BASE_URL}/v1/characters`)
      .send(character)
      .end((__, characterRes) => {
        chai.expect(characterRes.status).to.be.equal(201);
        chai.expect(characterRes.body).to.be.a("object");
        chai
          .expect(characterRes.body.msg)
          .to.be.equal("Character successfully created");
        done();
      });
  });

  it("should create an element", (done) => {
    chai
      .request(app)
      .post(`${BASE_URL}/v1/elements`)
      .send(createElement)
      .end((__, elementRes) => {
        chai.expect(elementRes.status).to.be.equal(201);
        chai.expect(elementRes.body).to.be.a("object");
        chai
          .expect(elementRes.body.msg)
          .to.be.equal("Character element created successfully");
        done();
      });
  });

  it("should create a rarity and attach it to a character", (done) => {
    chai
      .request(app)
      .post(`${BASE_URL}/v1/rarities`)
      .send(rarityOne)
      .end((__, rarityRes) => {
        chai.expect(rarityRes.status).to.be.equal(201);
        chai.expect(rarityRes.body).to.be.a("object");
        chai
          .expect(rarityRes.body.msg)
          .to.be.equal("Character rarity created successfully");
        done();
      });
  });

  it("should create another rarity and attach it to a character", (done) => {
    chai
      .request(app)
      .post(`${BASE_URL}/v1/rarities`)
      .send(rarityTwo)
      .end((__, rarityRes) => {
        chai.expect(rarityRes.status).to.be.equal(201);
        chai.expect(rarityRes.body).to.be.a("object");
        chai
          .expect(rarityRes.body.msg)
          .to.be.equal("Character rarity created successfully");
        done();
      });
  });

  it("should create another rarity and attach it to a character", (done) => {
    chai
      .request(app)
      .post(`${BASE_URL}/v1/rarities`)
      .send(rarityThree)
      .end((__, rarityRes) => {
        chai.expect(rarityRes.status).to.be.equal(201);
        chai.expect(rarityRes.body).to.be.a("object");
        chai
          .expect(rarityRes.body.msg)
          .to.be.equal("Character rarity created successfully");
        done();
      });
  });

  it("should create another rarity and attach it to a character", (done) => {
    chai
      .request(app)
      .post(`${BASE_URL}/v1/rarities`)
      .send(rarityFour)
      .end((__, rarityRes) => {
        chai.expect(rarityRes.status).to.be.equal(201);
        chai.expect(rarityRes.body).to.be.a("object");
        chai
          .expect(rarityRes.body.msg)
          .to.be.equal("Character rarity created successfully");
        done();
      });
  });

  it("should create an affinity and attach it to a character", (done) => {
    chai
      .request(app)
      .post(`${BASE_URL}/v1/affinities`)
      .send(createAffinity)
      .end((__, affinityRes) => {
        chai.expect(affinityRes.status).to.be.equal(201);
        chai.expect(affinityRes.body).to.be.a("object");
        chai
          .expect(affinityRes.body.msg)
          .to.be.equal("Character affinity created successfully");
        done();
      });
  });

  it("should create a personality and attach it to a character", (done) => {
    chai
      .request(app)
      .post(`${BASE_URL}/v1/personalities`)
      .send(createPersonality)
      .end((__, personalityRes) => {
        chai.expect(personalityRes.status).to.be.equal(201);
        chai.expect(personalityRes.body).to.be.a("object");
        chai
          .expect(personalityRes.body.msg)
          .to.be.equal("Personality successfully created");
        done();
      });
  });

  it("should create another personality and attach it to a character", (done) => {
    chai
      .request(app)
      .post(`${BASE_URL}/v1/personalities`)
      .send(createPersonalityTwo)
      .end((__, personalityRes) => {
        chai.expect(personalityRes.status).to.be.equal(201);
        chai.expect(personalityRes.body).to.be.a("object");
        chai
          .expect(personalityRes.body.msg)
          .to.be.equal("Personality successfully created");
        done();
      });
  });

  it("should create an attribute set and attach it to a character", (done) => {
    chai
      .request(app)
      .post(`${BASE_URL}/v1/attributes`)
      .send(createAttributes)
      .end((__, attributeRes) => {
        chai.expect(attributeRes.status).to.be.equal(201);
        chai.expect(attributeRes.body).to.be.a("object");
        chai
          .expect(attributeRes.body.msg)
          .to.be.equal("Character attribute created successfully");
        done();
      });
  });
});
