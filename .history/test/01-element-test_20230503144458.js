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
  "The young heiress of the famous Lunabright family of Elzion. She's served as the family head stand-in for some time. While she's had a first-rate education and training in the arts, she's ignorant of the world at large. She carriers herself with elegance and grace, but acts more her age with people she trusts.",
};

const test = {
  "element": "Water",
  "characterId": 3
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

  it("should create an element and attach it to a character", (done) => {
    chai
      .request(app)
      .post(`${BASE_URL}/v1/elements`)
      .send(test)
      .end((__, characterRes) => {
        chai.expect(characterRes.status).to.be.equal(201);
        chai.expect(characterRes.body).to.be.a("object");
        chai
          .expect(characterRes.body.msg)
          .to.be.equal("Character element created successfully");
        done();
      });
  });



});
