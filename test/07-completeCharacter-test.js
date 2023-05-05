process.env.NODE_ENV = "testing";

import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../app.js";

chai.use(chaiHttp);

const BASE_URL = "/api";

const characterTen = {
  name: "Violet Lancer",
  affinity: "Shadow",
  description: "test",
};

const createElement = {
  element: "Earth",
  characterId: 5,
};

const rarityOne = {
  rarity: 2,
  className: "Thruster",
  characterId: 5,
};

const rarityTwo = {
  rarity: 3,
  className: "Lancer",
  characterId: 5,
};

const rarityThree = {
  rarity: 4,
  className: "Griffin Lance",
  characterId: 5,
};

const rarityFour = {
  rarity: 5,
  className: "Persephone",
  characterId: 5,
};

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
  characterId: 5,
};

const createPersonality = {
  personality: "Lance",
  characterId: 5,
};

const createPersonalityTwo = {
  personality: "Lost Laboratory",
  characterId: 5,
};

const createAttributes = {
  hp: 4044,
  mp: 413,
  pwr: 286,
  int: 146,
  spd: 272,
  end: 214,
  spr: 178,
  lck: 205,
  characterId: 5,
};
