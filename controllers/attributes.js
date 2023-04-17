import { PrismaClient } from "@prisma/client";
import Joi from "joi";
const prisma = new PrismaClient();

const attributeSchema = Joi.object({
  hp: Joi.number().required(),
  mp: Joi.number().required(),
  pwr: Joi.number().required(),
  spd: Joi.number().required(),
  end: Joi.number().required(),
  spr: Joi.number().required(),
  lck: Joi.number().required(),
  characterId: Joi.number().required(),
});

const getAttribute = async (req, res) => {
  try {
    const { id } = req.params;

    const attribute = await prisma.attribute.findUnique({
      where: { id: Number(id) },
      // include: {
      //     rarity: true,
      // },
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
    const attributes = await prisma.attribute.findMany({
      select: {
        hp: true,
        mp: true,
        pwr: true,
        spd: true,
        end: true,
        spr: true,
        lck: true,
        characterId: true,
        character: {
          // Include the related Attributes model
          select: {
            name: true,
          },
        },
      },
    });

    if (attributes.length === 0) {
      return res.status(200).json({ msg: "No attributes found" });
    }
    return res.json({
      data: attributes,
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

    const { hp, mp, pwr, spd, end, spr, lck, characterId } = value;

    await prisma.attribute.create({
      data: { hp, mp, pwr, spd, end, spr, lck, characterId },
    });

    const newAttributes = await prisma.attribute.findMany({
      // include: {
      //     rarity: true,
      // },
    });

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

    const { hp, mp, pwr, spd, end, spr, lck, characterId } = value;

    const updatedAttribute = await prisma.attribute.update({
      where: { id: Number(id) },
      data: { hp, mp, pwr, spd, end, spr, lck, characterId },
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
