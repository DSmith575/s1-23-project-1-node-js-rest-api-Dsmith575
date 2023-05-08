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

describe("pagination", () => {
  it("should return the first page of results", (done) => {
    chai
      .request(app)
      .get(`${BASE_URL}/v1/characters`)
      .end((__, paginationRes) => {
        chai.expect(paginationRes.status).to.be.equal(200);
        chai.expect(paginationRes.body.nextPage).to.equal(2);
        done();
      });
  });

  it("should have a page with a length of 10", (done) => {
    chai
      .request(app)
      .get(`${BASE_URL}/v1/characters`)
      .end((__, paginationRes) => {
        chai.expect(paginationRes.status).to.be.equal(200);
        chai.expect(paginationRes.body.data).to.have.lengthOf(10);
        done();
      });
  });
  it("should sort by name asc", (done) => {
    chai
      .request(app)
      .get(`${BASE_URL}/v1/characters?sortBy=name&sortOrder=asc`)
      .end((__, paginationRes) => {
        chai.expect(paginationRes.status).to.be.equal(200);
        chai.expect(paginationRes.body.data[0].name).to.be.equal("Abc");
        done();
      });
  });
  it("should sort by name desc", (done) => {
    chai
      .request(app)
      .get(`${BASE_URL}/v1/characters?sortBy=name&sortOrder=desc`)
      .end((__, paginationRes) => {
        chai.expect(paginationRes.status).to.be.equal(200);
        chai.expect(paginationRes.body.data[0].name).to.be.equal("wxyz");
        done();
      });
  });

  it("should contain the attribute field", (done) => {
    chai
      .request(app)
      .get(`${BASE_URL}/v1/characters/10`)
      .end((__, paginationRes) => {
        chai.expect(paginationRes.body.data).to.include("attribute");
        done();
      });
  });

});
