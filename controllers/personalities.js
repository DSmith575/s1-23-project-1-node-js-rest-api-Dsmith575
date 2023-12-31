/**
 * API Controller for managing character personality data.
 *
 * This controller handles CRUD operations related to personality creation
 *
 * @file: personalities.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-04-19
 * @updated: 2023-05-10
 */

import { PrismaClient } from "@prisma/client";
import Joi from "joi";
const prisma = new PrismaClient();

const personalitySchema = Joi.object({
  personality: Joi.string().required(),
  characterId: Joi.number().required(),
});

const validPersonalities = [
  "Beast",
  "Blacksmith",
  "Cat Lover",
  "Clergy",
  "Cooking",
  "Dragon Palace",
  "Eastern",
  "Elf",
  "Glasses",
  "Guiding Light",
  "IDA School",
  "Luring Shadow",
  "Mask",
  "Miglance Palace",
  "Minstrel",
  "New Radical Dreamers",
  "New Time Drift",
  "Phantom Thieves of Hearts",
  "Protagonist",
  "Scientist",
  "Sweet tooth",
  "Synth Human",
  "Alchemist",
  "Amnesia",
  "Animal Talker",
  "Art",
  "Avenger",
  "Baruoki",
  "Bind",
  "Bookworm",
  "Cat Hater",
  "Childhood Friend",
  "Chronos Empire",
  "COA",
  "Concerto Artes",
  "Cursed",
  "Dog lover",
  "Dragon",
  "Dragon Killer",
  "Dwarf",
  "Fairy",
  "Fishman",
  "Fleareth",
  "Forager",
  "Funeral",
  "Geo",
  "Glutton",
  "Gun",
  "Hood",
  "Itto-Ryu",
  "KMS",
  "Lost Laboratory",
  "Lovesick",
  "Machinery",
  "Military",
  "Miner",
  "Mounted",
  "Napper",
  "Nicknamer",
  "Ninja",
  "Northern",
  "Outlaw",
  "Power to Rule",
  "Purgatory",
  "Royalty",
  "Scallywag",
  "Scars of the Wheel of Time",
  "Sharp Ears",
  "Shield",
  "Spicy Lover",
  "Spirit Talker",
  "Spirit-fused",
  "Straw Dummy",
  "Tales of",
  "Titan",
  "Weapons",
  "West",
  "Woodcutter",
  "Zoology",
  "Staff",
  "Sword",
  "Katana",
  "Ax",
  "Lance",
  "Bow",
  "Fists",
  "Hammer",
];

const paginationDefault = {
  amount: 10, // The number of items per page
  page: 1, // The page number
};

const getPersonality = async (req, res) => {
  try {
    const { id } = req.params;

    const personality = await prisma.personality.findUnique({
      where: { id: Number(id) },
    });

    if (!personality) {
      return res
        .status(200)
        .json({ msg: `No personality with the id: ${id} found` });
    }

    return res.json({
      data: personality,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const getPersonalities = async (req, res) => {
  try {
    const sortBy = req.query.sortBy || "personality";
    const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

    const amount = req.query.amount || paginationDefault.amount;
    const page = req.query.page || paginationDefault.page;

    const query = {
      take: Number(amount),
      skip: (Number(page) - 1) * Number(amount),
      orderBy: {
        [sortBy]: sortOrder,
      },
      select: {
        character: {
          select: {
            name: true,
          },
        },
        personality: true,
        characterId: true,
      },
    };

    if (req.query.personalities) {
      query.where = {
        personality: {
          in: req.query.personality || undefined,
        },
      };
    }

    const personalities = await prisma.personality.findMany(query);

    if (personalities.length === 0) {
      return res.status(200).json({ msg: "No personalities found" });
    }

    const hasNextPage = personalities.length === Number(amount);

    return res.json({
      data: personalities,
      nextPage: hasNextPage ? Number(page) + 1 : null,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const createPersonality = async (req, res) => {
  try {
    const { error, value } = personalitySchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        msg: error.details[0].message,
      });
    }

    const { personality, characterId } = value;

    // Checks if input is the same as any of required names
    if (!validPersonalities.includes(personality)) {
      return res.status(400).json({
        msg: `Invalid personality, accepted values are ${validPersonalities.join(
          ", "
        )}`,
      });
    }

    // Custom validation to check if a personality with the same name exists on a character
    const existingPersonality = await prisma.personality.findFirst({
      where: { personality: personality, characterId: characterId },
    });

    if (existingPersonality) {
      return res.status(409).json({
        msg: `Personality with the value ${personality} already exists for the character with the id ${characterId}`,
      });
    }

    await prisma.personality.create({
      data: { personality, characterId },
    });

    const newPersonalities = await prisma.personality.findMany({});

    return res.status(201).json({
      msg: "Personality successfully created",
      data: newPersonalities,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const updatePersonality = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = personalitySchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        msg: error.details[0].message,
      });
    }

    const { personality, characterId } = value;

    // Checks if input is the same as any of required names
    if (!validPersonalities.includes(personality)) {
      return res.status(400).json({
        msg: `Invalid personality, accepted values are ${validPersonalities.join(
          ", "
        )}`,
      });
    }

    // Custom validation to check if a personality with the same name exists on a character
    const existingPersonality = await prisma.personality.findFirst({
      where: { personality: personality, characterId: characterId },
    });

    if (existingPersonality) {
      return res.status(409).json({
        msg: `Personality with the value ${personality} already exists for the character with the id ${characterId}`,
      });
    }

    const updatedPersonality = await prisma.personality.update({
      where: { id: Number(id) },
      data: { personality, characterId },
    });

    return res.status(200).json({
      msg: `Personality with the id: ${id} successfully updated`,
      data: updatedPersonality,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const deletePersonality = async (req, res) => {
  try {
    const { id } = req.params;

    const personality = await prisma.personality.findUnique({
      where: { id: Number(id) },
    });

    if (!personality) {
      return res
        .status(200)
        .json({ msg: `No personality with the id: ${id} found` });
    }

    await prisma.personality.delete({
      where: { id: Number(id) },
    });

    return res.json({
      msg: `Personality with the id: ${id} successfully deleted`,
      data: personality,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export {
  getPersonality,
  getPersonalities,
  createPersonality,
  updatePersonality,
  deletePersonality,
};
