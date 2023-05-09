/**
 * API Controller for managing character affinity bonus data.
 *
 * This controller handles CRUD operations related to affinity creation
 *
 * @file: affinities-test.js
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
  characterId: 4,
};

const updateAffinity = {
  bonus5: "END +10",
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
  bonus225: "PWR +3000000",
  bonus255: "All Stats +10",
  characterId: 4,
};

describe("affinities", () => {
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

  it("should get an affinity by id", (done) => {
    chai
      .request(app)
      .get(`${BASE_URL}/v1/affinities/1`)
      .end((__, affinityRes) => {
        chai.expect(affinityRes.status).to.be.equal(200);
        chai.expect(affinityRes.body).to.be.a("object");
        chai.expect(affinityRes.body.data).to.be.a("object");
        done();
      });
  });

  it("should get all affinities", (done) => {
    chai
      .request(app)
      .get(`${BASE_URL}/v1/affinities`)
      .end((__, affinityRes) => {
        chai.expect(affinityRes.status).to.be.equal(200);
        chai.expect(affinityRes.body).to.be.a("object");
        chai.expect(affinityRes.body.data).to.be.a("array");
        done();
      });
  });

  it("should update an affinity by id", (done) => {
    chai
      .request(app)
      .put(`${BASE_URL}/v1/affinities/1`)
      .send(updateAffinity)
      .end((__, affinityRes) => {
        chai.expect(affinityRes.status).to.be.equal(200);
        chai.expect(affinityRes.body).to.be.a("object");
        chai
          .expect(affinityRes.body.msg)
          .to.be.equal("Affinities with the id: 1 successfully updated");
        done();
      });
  });

  it("should delete an affinity by id", (done) => {
    chai
      .request(app)
      .delete(`${BASE_URL}/v1/affinities/1`)
      .end((__, affinityRes) => {
        chai.expect(affinityRes.status).to.be.equal(200);
        chai.expect(affinityRes.body).to.be.a("object");
        chai
          .expect(affinityRes.body.msg)
          .to.be.equal("Affinity with the id: 1 successfully deleted");
        done();
      });
  });
});
