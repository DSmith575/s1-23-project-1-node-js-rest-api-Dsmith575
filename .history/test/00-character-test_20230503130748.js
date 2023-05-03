process.env.NODE_ENV = "testing";

import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";

chai.use(chaiHttp);

const BASE_URL = "/api";

const character = {
  name: "Hismena",
  affinity: "Light",
  description:
    "The best lancer in IDEA of the IDA Academy's student council. She has a tendency to take action based on instinct rather than deep thought. It is rumored that when it comes to close combat, even the school council leader Isuka has trouble keeping up with her. She is the child of one of the three parts of the Lunabright family of Elzion and stands to inherit the head position. However, she does not seem very happy about this...",
};

const characterTwo = {
  name: "Minalca",
  affinity: "Shadow",
  description:
    "A warrior from Chronos Empire. Scouted to join the Emperial Army's arbiters, she was dispatched to the world of Meks. Cautious of others, she prefers fighting to talking, and is considered dangerous even by arbiter standards. A strange steam creature Tetra follows her around.",
};

const characterAffinity = {
  name: "Isuka",
  affinity: "not valid",
  description: "IDEA",
};

describe("characters", () => {
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

  it("should create a another character", (done) => {
    chai
      .request(app)
      .post(`${BASE_URL}/v1/characters`)
      .send(characterTwo)
      .end((__, characterRes) => {
        chai.expect(characterRes.status).to.be.equal(201);
        chai.expect(characterRes.body).to.be.a("object");
        chai
          .expect(characterRes.body.msg)
          .to.be.equal("Character successfully created");
        done();
      });
  });

  it("should check if name is already in the database", (done) => {
    chai
      .request(app)
      .post(`${BASE_URL}/v1/characters`)
      .send(character)
      .end((__, characterRes) => {
        chai.expect(characterRes.status).to.be.equal(409);
        chai.expect(characterRes.body).to.be.a("object");
        chai
          .expect(characterRes.body.msg)
          .to.be.equal(
            "Character with the name Hismena already exists in the database"
          );
        done();
      });
  });

  it("should check if the affinity is Light or Shadow", (done) => {
    chai
      .request(app)
      .post(`${BASE_URL}/v1/characters`)
      .send(characterAffinity)
      .end((__, characterRes) => {
        chai.expect(characterRes.status).to.be.equal(400);
        chai.expect(characterRes.body).to.be.a("object");
        chai
          .expect(characterRes.body.msg)
          .to.be.equal("Invalid affinity. Allowed values are Light, Shadow");
        done();
      });
  });

  it("should get character by id", (done) => {
    chai
      .request(app)
      .get(`${BASE_URL}/v1/characters/1`)
      .end((__, characterRes) => {
        //      console.log(characterRes);
        chai.expect(characterRes.status).to.be.equal(200);
        chai.expect(characterRes.body).to.be.a("object");
        chai.expect(characterRes.body.data).to.be.a("object");
        done();
      });
  });

  it("should not find a character with an id not created", (done) => {
    chai
      .request(app)
      .get(`${BASE_URL}/v1/characters/9999`)
      .end((__, characterRes) => {
        //      console.log(characterRes);
        chai.expect(characterRes.status).to.be.equal(200);
        chai.expect(characterRes.body).to.be.a("object");
        chai
          .expect(characterRes.body.msg)
          .to.be.equal("No Character with the id: 9999 found");
        done();
      });
  });

  it("should get all characters", (done) => {
    chai
      .request(app)
      .get(`${BASE_URL}/v1/characters`)
      .end((__, institutionRes) => {
        chai.expect(institutionRes.status).to.be.equal(200);
        chai.expect(institutionRes.body).to.be.a("object");
        chai.expect(institutionRes.body.data).to.be.a("array");
        done();
      });
  });
});
