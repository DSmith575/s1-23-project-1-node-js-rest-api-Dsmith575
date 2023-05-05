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
  personality: "test",
  characterId: 4,
};

const updatePersonality = {
  personality: "Lance",
  characterId: 4,
};
