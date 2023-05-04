process.env.NODE_ENV = "testing";

import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";

chai.use(chaiHttp);

const BASE_URL = "/api";

const character = {
  name: "Moonlight Flower",
  affinity: "Shadow",
  description:
    "The young heiress of the famous Lunabright family of Elzion. She's served as the family head stand-in for some time. While she's had a first-rate education and training in the arts, she's ignorant of the world at large. She carriers herself with elegance and grace, but acts more her age with people she trusts.",
};

const createElement = {
  element: "Water",
  characterId: 3,
};

const createElementTwo = {
  element: "Fire",
  characterId: 3,
};

const elementNoElement = {
  characterId: 3,
};

const elementUpdate = {
  element: "Wind",
  characterId: 3,
};

const customValidation = {
  element: "not an element",
  characterId: 3,
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

  it("should create a second element and attach it to the same character", (done) => {
    chai
      .request(app)
      .post(`${BASE_URL}/v1/elements`)
      .send(createElementTwo)
      .end((__, elementRes) => {
        chai.expect(elementRes.status).to.be.equal(201);
        chai.expect(elementRes.body).to.be.a("object");
        chai
          .expect(elementRes.body.msg)
          .to.be.equal("Character element created successfully");
        done();
      });
  });

  it("should require an element on create", (done) => {
    chai
      .request(app)
      .post(`${BASE_URL}/v1/elements/`)
      .send(elementNoElement)
      .end((__, elementRes) => {
        chai.expect(elementRes.status).to.be.equal(400);
        chai.expect(elementRes.body).to.be.a("object");
        chai.expect(elementRes.body.msg).to.be.equal('"element" is required');
        done();
      });
  });

  it("should check custom validation for correct element types", (done) => {
    chai
      .request(app)
      .post(`${BASE_URL}/v1/elements/`)
      .send(customValidation)
      .end((__, elementRes) => {
        chai.expect(elementRes.status).to.be.equal(400);
        chai.expect(elementRes.body).to.be.a("object");
        chai
          .expect(elementRes.body.msg)
          .to.be.equal(
            "Invalid element, accepted values are None, Fire, Earth, Wind, Water, Thunder, Shade, Crystal"
          );
        done();
      });
  });

  it("should get an element by id", (done) => {
    chai
      .request(app)
      .get(`${BASE_URL}/v1/elements/1`)
      .end((__, elementRes) => {
        chai.expect(elementRes.status).to.be.equal(200);
        chai.expect(elementRes.body).to.be.a("object");
        chai.expect(elementRes.body.data).to.be.a("object");
        done();
      });
  });

  it("should get all elements", (done) => {
    chai
      .request(app)
      .get(`${BASE_URL}/v1/elements`)
      .end((__, elementRes) => {
        chai.expect(elementRes.status).to.be.equal(200);
        chai.expect(elementRes.body).to.be.a("object");
        chai.expect(elementRes.body.data).to.be.a("array");
        done();
      });
  });

  it("should update an element by id", (done) => {
    chai
      .request(app)
      .put(`${BASE_URL}/v1/elements/1`)
      .send(elementUpdate)
      .end((__, elementRes) => {
        chai.expect(elementRes.status).to.be.equal(200);
        chai.expect(elementRes.body).to.be.a("object");
        chai
          .expect(elementRes.body.msg)
          .to.be.equal("Element with the id: 1 successfully updated");
        done();
      });
  });

  it("should delete an element by id", (done) => {
    chai
      .request(app)
      .delete(`${BASE_URL}/v1/elements/1`)
      .end((__, elementRes) => {
        chai.expect(elementRes.status).to.be.equal(200);
        chai.expect(elementRes.body).to.be.a("object");
        chai
          .expect(elementRes.body.msg)
          .to.be.equal("Element with the id: 1 successfully deleted");
        done();
      });
  });
});
