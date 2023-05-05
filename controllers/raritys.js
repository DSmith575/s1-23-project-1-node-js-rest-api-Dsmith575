/**
 * API Controller for managing character rarity data.
 *
 * This controller handles CRUD operations related to rarity creation
 *
 * @file: raritys.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-04-19
 * @updated: 2023-05-04
 */

import { PrismaClient } from "@prisma/client";
import Joi from "joi";
const prisma = new PrismaClient();

const raritySchema = Joi.object({
  rarity: Joi.number().required(),
  className: Joi.string().required(),
  characterId: Joi.number().required(),
});

const validRarities = [2, 3, 4, 5];

const paginationDefault = {
  amount: 10, // The number of items per page
  page: 1, // The page number
};

const getRarity = async (req, res) => {
  try {
    const { id } = req.params;

    const rarity = await prisma.rarity.findUnique({
      where: { id: Number(id) },
    });

    if (!rarity) {
      return res.status(200).json({ msg: `No rarity with the id ${id} found` });
    }

    return res.json({
      data: rarity,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const getRarities = async (req, res) => {
  try {
    const sortBy = req.query.sortBy || "rarity";
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
        rarity: true,
        className: true,
        characterId: true,
      },
    };

    if (req.query.rarity) {
      query.where = {
        rarity: {
          in: req.query.rarity || undefined,
        },
      };
    }

    const rarities = await prisma.rarity.findMany(query);

    if (rarities.length === 0) {
      return res.status(200).json({ msg: "No rarities found" });
    }

    const hasNextPage = rarities.length === Number(amount);

    return res.json({
      data: rarities,
      nextPage: hasNextPage ? Number(page) + 1 : null,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const createRarity = async (req, res) => {
  try {
    const { error, value } = raritySchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        msg: error.details[0].message,
      });
    }

    const { rarity, className, characterId } = value;

    // Validate rarity field
    if (!validRarities.includes(rarity)) {
      return res.status(400).json({
        msg: `Invalid rarity. Allowed values are ${validRarities.join(", ")}`,
      });
    }

    //Custom validation, this checks if a character already has an rarity with the same value.
    const existingRarity = await prisma.rarity.findFirst({
      where: { rarity: rarity, characterId: characterId },
    });

    //Checks if the class name already exists on a character
    const existingClassName = await prisma.rarity.findFirst({
      where: { className: className, characterId: characterId },
    });

    if (existingRarity) {
      return res.status(409).json({
        msg: `Rarity of ${rarity} already exists for the character with the id ${characterId}`,
      });
    }

    if (existingClassName) {
      return res.status(409).json({
        msg: `Rarity with the class name ${className} already exists for the character with the id ${characterId}`,
      });
    }

    await prisma.rarity.create({
      data: { rarity, className, characterId },
    });

    const newRarities = await prisma.rarity.findMany({});

    return res.status(201).json({
      msg: "Character rarity created successfully",
      data: newRarities,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const updateRarity = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = raritySchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        msg: error.details[0].message,
      });
    }

    const { rarity, className, characterId } = value;

    // Validate rarity field
    if (!validRarities.includes(rarity)) {
      return res.status(400).json({
        msg: `Invalid rarity. Allowed values are ${validRarities.join(", ")}`,
      });
    }

    //Custom validation, this checks if a character already has an rarity with the same value.
    const existingRarity = await prisma.rarity.findFirst({
      where: { rarity: rarity, characterId: characterId },
    });

    //Checks if the class name already exists on a character
    const existingClassName = await prisma.rarity.findFirst({
      where: { className: className, characterId: characterId },
    });

    const updatedRarity = await prisma.rarity.update({
      where: { id: Number(id) },
      data: { rarity, className, characterId },
    });

    return res.status(200).json({
      msg: `Rarity with the id: ${id} successfully updated`,
      data: updatedRarity,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const deleteRarity = async (req, res) => {
  try {
    const { id } = req.params;

    const rarity = await prisma.rarity.findUnique({
      where: { id: Number(id) },
    });

    if (!rarity) {
      return res
        .status(200)
        .json({ msg: `No rarity with the id: ${id} found` });
    }

    await prisma.rarity.delete({
      where: { id: Number(id) },
    });

    return res.json({
      msg: `Rarity with the id: ${id} successfully deleted`,
      data: rarity,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export { getRarity, getRarities, createRarity, updateRarity, deleteRarity };
