process.env.NODE_ENV = "testing";

import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";

chai.use(chaiHttp);

const BASE_URL = "/api";

const createAttributes = {
  hp: 423,
  mp: 4513,
  pwr: 286,
  int: 156,
  spd: 652,
  end: 244,
  spr: 548,
  lck: 345,
  characterId: 4,
};

const missingAttribute = {
  mp: 4513,
  pwr: 286,
  int: 156,
  spd: 652,
  end: 244,
  spr: 548,
  lck: 345,
  characterId: 2,
};

const updateAttribute = {
  hp: 9999,
  mp: 4513,
  pwr: 286,
  int: 156,
  spd: 652,
  end: 244,
  spr: 548,
  lck: 345,
  characterId: 2,
};

describe("attributes", () => {
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

  it("should require hp on create", (done) => {
    chai
      .request(app)
      .post(`${BASE_URL}/v1/attributes/`)
      .send(missingAttribute)
      .end((__, attributeRes) => {
        chai.expect(attributeRes.status).to.be.equal(400);
        chai.expect(attributeRes.body).to.be.a("object");
        chai.expect(attributeRes.body.msg).to.be.equal('"hp" is required');
        done();
      });
  });

  it("should get an attribute set by id", (done) => {
    chai
      .request(app)
      .get(`${BASE_URL}/v1/attributes/1`)
      .end((__, attributeRes) => {
        chai.expect(attributeRes.status).to.be.equal(200);
        chai.expect(attributeRes.body).to.be.a("object");
        chai.expect(attributeRes.body.data).to.be.a("object");
        done();
      });
  });

  it("should get all attributes", (done) => {
    chai
      .request(app)
      .get(`${BASE_URL}/v1/attributes/1`)
      .end((__, attributeRes) => {
        chai.expect(attributeRes.status).to.be.equal(200);
        chai.expect(attributeRes.body).to.be.a("object");
        chai.expect(attributeRes.body.data).to.be.a("object");
        done();
      });
  });

  it("should update an attribute by id", (done) => {
    chai
      .request(app)
      .put(`${BASE_URL}/v1/attributes/1`)
      .send(updateAttribute)
      .end((__, attributeRes) => {
        chai.expect(attributeRes.status).to.be.equal(200);
        chai.expect(attributeRes.body).to.be.a("object");
        chai
          .expect(attributeRes.body.msg)
          .to.be.equal("Attribute with the id: 1 successfully updated");
        done();
      });
  });

  it("should delete an attribute by id", (done) => {
    chai
      .request(app)
      .delete(`${BASE_URL}/v1/attributes/1`)
      .end((__, attributeRes) => {
        chai.expect(attributeRes.status).to.be.equal(200);
        chai.expect(attributeRes.body).to.be.a("object");
        chai
          .expect(attributeRes.body.msg)
          .to.be.equal("Attribute with the id: 1 successfully deleted");
        done();
      });
  });
});
