import { PrismaClient } from "@prisma/client";
import Joi from "joi";
const prisma = new PrismaClient();

const raritySchema = Joi.object({
  rarity: Joi.number().required(),
  className: Joi.string().required(),
  characterId: Joi.number().required(),
});

const validRarities = [2, 3, 4, 5];

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
    const rarities = await prisma.rarity.findMany({});

    if (rarities.length === 0) {
      return res.status(200).json({ msg: "No rarities found" });
    }
    return res.json({
      data: rarities,
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
        msg: `Invalid rarity. Allowed values are ${validRarities[0]}, ${validRarities[1]}, ${validRarities[2]}, ${validRarities[3]}`,
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
      data: rarity,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export { getRarity, getRarities, createRarity, updateRarity, deleteRarity };
