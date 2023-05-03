/**
 * API Controller for managing character data.
 *
 * This controller handles CRUD operations related to character creation
 *
 * @file: characters.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-04-17
 * @updated: 2023-04-17
 *
 * @SCHEMA
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

const getCharacter = async (req, res) => {
  try {
    const { id } = req.params;

    const character = await prisma.character.findUnique({
      where: { id: Number(id) },
      // include: {
      //     attributes: true,
      // },
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
            spd: true,
            end: true,
            spr: true,
            lck: true,
          },
        },
        element: {
          select: {
            element: true,
          },
        },
      },
    });

    if (!character) {
      return res
        .status(200)
        .json({ msg: `No Character with the id: ${id} found` });
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
    const characters = await prisma.character.findMany({
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
            spd: true,
            end: true,
            spr: true,
            lck: true,
          },
        },
        element: {
          select: {
            element: true,
          },
        },
      },
    });

    if (characters.length === 0) {
      return res.status(200).json({ msg: "No characters found" });
    }
    return res.json({
      data: characters,
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
        msg: `Invalid affinity. Allowed values are ${validAffinities.join(
          ", "
        )}`,
      });
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    //Check if a character already exists with the name trying to create
    const existingCharacter = await prisma.character.findFirst({
      where: {
        name: {
          contains: name.toLowerCase(), // Perform case-insensitive search
        },
      },
    });

    if (existingCharacter) {
      return res.status(409).json({
        msg: `Character with the name ${name} already exists in the database`,
      });
    }

    await prisma.character.create({
      data: { name, description, affinity },
    });

    const newCharacters = await prisma.character.findMany({});

    return res.status(201).json({
      msg: "Character successfully created",
      data: newCharacters,
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

    if (!validAffinities.includes(affinity)) {
      return res.status(400).json({
        msg: `Invalid affinity. Allowed values are ${validAffinities.join(
          ", "
        )}}`,
      });
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
      return res
        .status(200)
        .json({ msg: `No character with the id: ${id} found` });
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
