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

const test = {
  "element": "Ice",
  "characterId": 1
};

describe("elements", () => {
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



  it("should create an  element and attach it to a character", (done) => {
    chai
      .request(app)
      .post(`${BASE_URL}/v1/characters`)
      .send(test)
      .end((__, characterRes) => {
        chai.expect(characterRes.status).to.be.equal(201);
        chai.expect(characterRes.body).to.be.a("object");
        chai
          .expect(characterRes.body.msg)
          .to.be.equal("Character successfully created");
        done();
      });
  });
});
