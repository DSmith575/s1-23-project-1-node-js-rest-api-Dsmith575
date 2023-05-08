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

const createPersonality = {
  personality: "Cat Lover",
  characterId: 4,
};

const invalidPersonality = {
  characterId: 4,
};

const updatePersonality = {
  personality: "Lance",
  characterId: 4,
};

describe("personality", () => {
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

  it("should require a personality on create", (done) => {
    chai
      .request(app)
      .post(`${BASE_URL}/v1/personalities/`)
      .send(invalidPersonality)
      .end((__, personalityRes) => {
        chai.expect(personalityRes.status).to.be.equal(400);
        chai.expect(personalityRes.body).to.be.a("object");
        chai
          .expect(personalityRes.body.msg)
          .to.be.equal('"personality" is required');
        done();
      });
  });

  it("should get a personality by id", (done) => {
    chai
      .request(app)
      .get(`${BASE_URL}/v1/personalities/1`)
      .end((__, personalityRes) => {
        chai.expect(personalityRes.status).to.be.equal(200);
        chai.expect(personalityRes.body).to.be.a("object");
        chai.expect(personalityRes.body.data).to.be.a("object");
        done();
      });
  });

  it("should get all personalities", (done) => {
    chai
      .request(app)
      .get(`${BASE_URL}/v1/personalities`)
      .end((__, personalityRes) => {
        chai.expect(personalityRes.status).to.be.equal(200);
        chai.expect(personalityRes.body).to.be.a("object");
        chai.expect(personalityRes.body.data).to.be.a("array");
        done();
      });
  });

  it("should update a personality by id", (done) => {
    chai
      .request(app)
      .put(`${BASE_URL}/v1/personalities/1`)
      .send(updatePersonality)
      .end((__, personalityRes) => {
        chai.expect(personalityRes.status).to.be.equal(200);
        chai.expect(personalityRes.body).to.be.a("object");
        chai
          .expect(personalityRes.body.msg)
          .to.be.equal("Personality with the id: 1 successfully updated");
        done();
      });
  });

  it("should delete a personality by id", (done) => {
    chai
      .request(app)
      .delete(`${BASE_URL}/v1/personalities/1`)
      .end((__, personalityRes) => {
        chai.expect(personalityRes.status).to.be.equal(200);
        chai.expect(personalityRes.body).to.be.a("object");
        chai
          .expect(personalityRes.body.msg)
          .to.be.equal("Personality with the id: 1 successfully deleted");
        done();
      });
  });
});
