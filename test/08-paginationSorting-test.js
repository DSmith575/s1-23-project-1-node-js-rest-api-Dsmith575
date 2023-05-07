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
        chai.expect(paginationRes.body.results).to.have.lengthOf(10);
        chai.expect(paginationRes.body).to.equal(2);
        done();
      });
  });
  it("sort by name asc", (done) => {
    chai
      .request(app)
      .get(`${BASE_URL}/v1/characters?sortBy=name&sortOrder=asc`)
      .end((__, paginationRes) => {
        const characters = paginationRes.body.results;
        for (let i = 0; i < characters.length; i++) {
          const currentName = characters[i].name;
          const nextName = characters[i + 1].name;
          chai.expect(currentName <= nextName).to.be.true;
        }
        done();
      });
  });
});
