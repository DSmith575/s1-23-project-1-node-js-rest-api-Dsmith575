/**
 * API Controller for managing character attribute data.
 *
 * This controller handles CRUD operations related to attribute creation
 *
 * @file: attributes.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-04-17
 * @updated: 2023-05-04
 */

import { PrismaClient } from "@prisma/client";
import Joi from "joi";
const prisma = new PrismaClient();

const attributeSchema = Joi.object({
  hp: Joi.number().required(),
  mp: Joi.number().required(),
  pwr: Joi.number().required(),
  int: Joi.number().required(),
  spd: Joi.number().required(),
  end: Joi.number().required(),
  spr: Joi.number().required(),
  lck: Joi.number().required(),
  characterId: Joi.number().required(),
});

const paginationDefault = {
  amount: 10, // The number of items per page
  page: 1, // The page number
};

const getAttribute = async (req, res) => {
  try {
    const { id } = req.params;

    const attribute = await prisma.attribute.findUnique({
      where: { id: Number(id) },
    });

    if (!attribute) {
      return res
        .status(200)
        .json({ msg: `No attribute with the id: ${id} found` });
    }

    return res.json({
      data: attribute,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const getAttributes = async (req, res) => {
  try {
    const sortBy = req.query.sortBy || "characterId";
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
        characterId: true,
        hp: true,
        mp: true,
        pwr: true,
        int: true,
        spd: true,
        end: true,
        spr: true,
        lck: true,
      },
    };

    if (
      req.query.hp ||
      req.query.mp ||
      req.query.pwr ||
      req.query.int ||
      req.query.spd ||
      req.query.end ||
      req.query.spr ||
      req.query.lck
    ) {
      query.where = {
        hp: {
          equals: Number(req.query.hp) || undefined,
        },
        mp: {
          equals: Number(req.query.mp) || undefined,
        },
        pwr: {
          equals: Number(req.query.pwr) || undefined,
        },
        int: {
          equals: Number(req.query.int) || undefined,
        },
        spd: {
          equals: Number(req.query.spd) || undefined,
        },
        end: {
          equals: Number(req.query.end) || undefined,
        },
        spr: {
          equals: Number(req.query.spr) || undefined,
        },
        lck: {
          equals: Number(req.query.lck) || undefined,
        },
      };
    }

    const attributes = await prisma.attribute.findMany(query);

    if (attributes.length === 0) {
      return res.status(200).json({ msg: "No attributes found" });
    }

    const hasNextPage = attributes.length === Number(amount);

    return res.json({
      data: attributes,
      nextPage: hasNextPage ? Number(page) + 1 : null,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const createAttribute = async (req, res) => {
  try {
    const { error, value } = attributeSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        msg: error.details[0].message,
      });
    }

    const { hp, mp, pwr, int, spd, end, spr, lck, characterId } = value;

    await prisma.attribute.create({
      data: { hp, mp, pwr, int, spd, end, spr, lck, characterId },
    });

    const newAttributes = await prisma.attribute.findMany({});

    return res.status(201).json({
      msg: "Character attribute created successfully",
      data: newAttributes,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const updateAttribute = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = attributeSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        msg: error.details[0].message,
      });
    }

    const { hp, mp, pwr, int, spd, end, spr, lck, characterId } = value;

    const updatedAttribute = await prisma.attribute.update({
      where: { id: Number(id) },
      data: { hp, mp, pwr, int, spd, end, spr, lck, characterId },
    });

    return res.status(200).json({
      msg: `Attribute with the id: ${id} successfully updated`,
      data: updatedAttribute,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const deleteAttribute = async (req, res) => {
  try {
    const { id } = req.params;

    const attribute = await prisma.attribute.findUnique({
      where: { id: Number(id) },
    });

    if (!attribute) {
      return res
        .status(200)
        .json({ msg: `No attribute with the id: ${id} found` });
    }

    await prisma.attribute.delete({
      where: { id: Number(id) },
    });

    return res.json({
      msg: `Attribute with the id ${id} successfully deleted`,
      data: attribute,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export {
  getAttribute,
  getAttributes,
  createAttribute,
  updateAttribute,
  deleteAttribute,
};
