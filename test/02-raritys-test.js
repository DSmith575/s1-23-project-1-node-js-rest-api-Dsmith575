/**
 * API Controller for managing character affinity bonus data.
 *
 * This controller handles CRUD operations related to affinity creation
 *
 * @file: raritys-test.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-05-02
 * @updated: 2023-05-10
 */

process.env.NODE_ENV = "testing";

import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";

chai.use(chaiHttp);

const BASE_URL = "/api";

const rarityOne = {
  rarity: 2,
  className: "Fighter",
  characterId: 4,
};

const rarityTwo = {
  rarity: 3,
  className: "Soldier",
  characterId: 4,
};

const rarityThree = {
  rarity: 4,
  className: "Sword Master",
  characterId: 4,
};

const rarityFour = {
  rarity: 5,
  className: "Fraulein",
  characterId: 4,
};

const rarityNoRarity = {};

const rarityNoClassName = {
  rarity: 2,
};

const customValidation = {
  rarity: 9,
  className: "Test",
  characterId: 2,
};

const rarityTest = {
  rarity: 4,
  className: "Test",
  characterId: 4,
};

const rarityUpdate = {
  rarity: 3,
  className: "updated",
  characterId: 4,
};

describe("rarities", () => {
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

  it("should create a 2nd rarity and attach it to the same character", (done) => {
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

  it("should create a 3rd rarity and attach it to the same character", (done) => {
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

  it("should create a 4th rarity and attach it to the same character", (done) => {
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

  it("should require rarity on create", (done) => {
    chai
      .request(app)
      .post(`${BASE_URL}/v1/rarities`)
      .send(rarityNoRarity)
      .end((__, rarityRes) => {
        chai.expect(rarityRes.status).to.be.equal(400);
        chai.expect(rarityRes.body).to.be.a("object");
        chai.expect(rarityRes.body.msg).to.be.equal('"rarity" is required');
        done();
      });
  });

  it("should require className on create", (done) => {
    chai
      .request(app)
      .post(`${BASE_URL}/v1/rarities`)
      .send(rarityNoClassName)
      .end((__, rarityRes) => {
        chai.expect(rarityRes.status).to.be.equal(400);
        chai.expect(rarityRes.body).to.be.a("object");
        chai.expect(rarityRes.body.msg).to.be.equal('"className" is required');
        done();
      });
  });

  it("should check custom validation for correct rarity value", (done) => {
    chai
      .request(app)
      .post(`${BASE_URL}/v1/rarities/`)
      .send(customValidation)
      .end((__, rarityRes) => {
        chai.expect(rarityRes.status).to.be.equal(400);
        chai.expect(rarityRes.body).to.be.a("object");
        chai
          .expect(rarityRes.body.msg)
          .to.be.equal("Invalid rarity. Allowed values are 2, 3, 4, 5");
        done();
      });
  });

  it("should check custom validation that a rarity number already exists on a character", (done) => {
    chai
      .request(app)
      .post(`${BASE_URL}/v1/rarities/`)
      .send(rarityTest)
      .end((__, rarityRes) => {
        chai.expect(rarityRes.status).to.be.equal(409);
        chai.expect(rarityRes.body).to.be.a("object");
        chai
          .expect(rarityRes.body.msg)
          .to.be.equal("Rarity of 4 already exists for the character with the id 4");
        done();
      });
  });

  it("should get a rarity by id", (done) => {
    chai
      .request(app)
      .get(`${BASE_URL}/v1/rarities/4`)
      .end((__, rarityRes) => {
        chai.expect(rarityRes.status).to.be.equal(200);
        chai.expect(rarityRes.body).to.be.a("object");
        chai.expect(rarityRes.body.data).to.be.a("object");
        done();
      });
  });

  it("should get all rarities", (done) => {
    chai
      .request(app)
      .get(`${BASE_URL}/v1/rarities`)
      .end((__, rarityRes) => {
        chai.expect(rarityRes.status).to.be.equal(200);
        chai.expect(rarityRes.body).to.be.a("object");
        chai.expect(rarityRes.body.data).to.be.a("array");
        done();
      });
  });

  it("should update a rarity by id", (done) => {
    chai
      .request(app)
      .put(`${BASE_URL}/v1/rarities/4`)
      .send(rarityUpdate)
      .end((__, rarityRes) => {
        chai.expect(rarityRes.status).to.be.equal(200);
        chai.expect(rarityRes.body).to.be.a("object");
        chai
          .expect(rarityRes.body.msg)
          .to.be.equal("Rarity with the id: 4 successfully updated");
        done();
      });
  });

  it("should delete a rarity by id", (done) => {
    chai
      .request(app)
      .delete(`${BASE_URL}/v1/rarities/4`)
      .end((__, rarityRes) => {
        chai.expect(rarityRes.status).to.be.equal(200);
        chai.expect(rarityRes.body).to.be.a("object");
        chai
          .expect(rarityRes.body.msg)
          .to.be.equal("Rarity with the id: 4 successfully deleted");
        done();
      });
  });
});
