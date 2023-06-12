/**
 * API Controller for managing character data.
 *
 * This controller handles CRUD operations related to character creation
 *
 * @file: characters.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-04-17
 * @updated: 2023-05-10
 */

import { PrismaClient } from "@prisma/client";
import Joi from "joi";
const prisma = new PrismaClient();

const characterSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  affinity: Joi.string().required(),
});

const validAffinities = ["Light", "Shadow"];

const paginationDefault = {
  amount: 10, // The number of items per page
  page: 1, // The page number
};

const getCharacter = async (req, res) => {
  try {
    const { id } = req.params;

    const character = await prisma.character.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        description: true,
        rarity: {
          select: {
            rarity: true,
            className: true,
          },
        },
        element: {
          select: {
            element: true,
          },
        },
        personality: {
          select: {
            personality: true,
          },
        },
        affinity: true,
        affinityBonus: {
          select: {
            bonus5: true,
            bonus15: true,
            bonus30: true,
            bonus50: true,
            bonus75: true,
            bonus80: true,
            bonus105: true,
            bonus120: true,
            bonus140: true,
            bonus175: true,
            bonus200: true,
            bonus215: true,
            bonus225: true,
            bonus255: true,
          },
        },
        attributes: {
          // Include the related Attributes model
          select: {
            hp: true,
            mp: true,
            pwr: true,
            int: true,
            spd: true,
            end: true,
            spr: true,
            lck: true,
          },
        },
      },
    });

    if (!character) {
      return res.status(200).json({ msg: `No Character with the id: ${id} found` });
    }

    return res.json({
      data: character,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const getCharacters = async (req, res) => {
  try {
    const sortBy = req.query.sortBy || "name";
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
        id: true,
        name: true,
        description: true,
        rarity: {
          select: {
            rarity: true,
            className: true,
          },
        },
        element: {
          select: {
            element: true,
          },
        },
        personality: {
          select: {
            personality: true,
          },
        },
        affinity: true,
        affinityBonus: {
          select: {
            bonus5: true,
            bonus15: true,
            bonus30: true,
            bonus50: true,
            bonus75: true,
            bonus80: true,
            bonus105: true,
            bonus120: true,
            bonus140: true,
            bonus175: true,
            bonus200: true,
            bonus215: true,
            bonus225: true,
            bonus255: true,
          },
        },
        attributes: {
          // Include the related Attributes model
          select: {
            hp: true,
            mp: true,
            pwr: true,
            int: true,
            spd: true,
            end: true,
            spr: true,
            lck: true,
          },
        },
      },
    };

    if (req.query.name || req.query.affinity) {
      query.where = {
        name: {
          in: req.query.name || undefined,
        },
        affinity: {
          in: req.query.affinity || undefined,
        },
      };
    }

    const characters = await prisma.character.findMany(query);

    if (characters.length === 0) {
      return res.status(200).json({ msg: "No characters found" });
    }

    const hasNextPage = characters.length === Number(amount);

    return res.json({
      data: characters,
      nextPage: hasNextPage ? Number(page) + 1 : null,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const createCharacter = async (req, res) => {
  try {
    const { error, value } = characterSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        msg: error.details[0].message,
      });
    }

    const { name, description, affinity } = value;

    if (!validAffinities.includes(affinity)) {
      return res.status(400).json({
        msg: `Invalid affinity. Allowed values are ${validAffinities.join(", ")}`,
      });
    }

    //Check if a character already exists with the name trying to create
    const existingCharacter = await prisma.character.findFirst({
      where: {
        name: {
          contains: name.toLowerCase(),
        },
      },
    });

    if (existingCharacter) {
      return res.status(409).json({
        msg: `Character with the name ${name} already exists in the database`,
      });
    }

    const newCharacter = await prisma.character.create({
      data: { name, description, affinity },
    });

    // const newCharacters = await prisma.character.findMany({});

    return res.status(201).json({
      msg: "Character successfully created",
      data: newCharacter,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const updateCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = characterSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        msg: error.details[0].message,
      });
    }

    const { name, description, affinity } = value;

    // Validate affinity
    if (!validAffinities.includes(affinity)) {
      return res.status(400).json({
        msg: `Invalid affinity. Allowed values are ${validAffinities.join(", ")}`,
      });
    }

    const existingCharacter = await prisma.character.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingCharacter) {
      return res.status(404).json({
        msg: `Character with the id: ${id} not found`,
      });
    }

    if (existingCharacter.name !== name) {
      const duplicateCharacter = await prisma.character.findFirst({
        where: {
          OR: [
            {
              name: {
                equals: name,
              },
            },
            {
              id: Number(id),
            },
          ],
        },
      });

      if (duplicateCharacter) {
        return res.status(409).json({
          msg: `Character with the name ${name} already exists in the database`,
        });
      }
    }

    const updatedCharacter = await prisma.character.update({
      where: { id: Number(id) },
      data: { name, description, affinity },
    });

    return res.status(200).json({
      msg: `Character with the id: ${id} successfully updated`,
      data: updatedCharacter,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const deleteCharacter = async (req, res) => {
  try {
    const { id } = req.params;

    const character = await prisma.character.findUnique({
      where: { id: Number(id) },
    });

    if (!character) {
      return res.status(200).json({ msg: `No character with the id: ${id} found` });
    }

    await prisma.character.delete({
      where: { id: Number(id) },
    });

    return res.json({
      msg: `Character with the id: ${id} successfully deleted`,
      data: character,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export {
  getCharacter,
  getCharacters,
  createCharacter,
  updateCharacter,
  deleteCharacter,
};
