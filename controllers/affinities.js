import { PrismaClient } from "@prisma/client";
import Joi from "joi";
const prisma = new PrismaClient();

const affinitySchema = Joi.object({
  bonus5: Joi.string().required(),
  bonus15: Joi.string().required(),
  bonus30: Joi.string().required(),
  bonus50: Joi.string().required(),
  bonus75: Joi.string().required(),
  bonus80: Joi.string().required(),
  bonus105: Joi.string().required(),
  bonus120: Joi.string().required(),
  bonus140: Joi.string().required(),
  bonus175: Joi.string().required(),
  bonus200: Joi.string().required(),
  bonus215: Joi.string().required(),
  bonus225: Joi.string().required(),
  bonus255: Joi.string().required(),
  characterId: Joi.number().required(),
});

const getAffinity = async (req, res) => {
  try {
    const { id } = req.params;

    const affinity = await prisma.affinity_bonus.findUnique({
      where: { id: Number(id) },
      //include {
      //x: true,
      //},
    });

    if (!affinity) {
      return res
        .status(200)
        .json({ msg: `No affinity with the id : ${id} found` });
    }

    return res.json({
      data: affinity,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const getAffinities = async (req, res) => {
  try {
    const affinities = await prisma.affinity_bonus.findMany({
      // character: {
      //   select: {
      //     name: true,
      //   },
      // },
    });

    if (affinities.length === 0) {
      return res.status(200).json({ msg: "No affinities found" });
    }
    return res.json({
      data: affinities,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const createAffinities = async (req, res) => {
  try {
    const { error, value } = affinitySchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        msg: error.details[0].message,
      });
    }

    const {
      bonus5,
      bonus15,
      bonus30,
      bonus50,
      bonus75,
      bonus80,
      bonus105,
      bonus120,
      bonus140,
      bonus175,
      bonus200,
      bonus215,
      bonus225,
      bonus255,
      characterId,
    } = value;

    await prisma.affinity_bonus.create({
      data: {
        bonus5,
        bonus15,
        bonus30,
        bonus50,
        bonus75,
        bonus80,
        bonus105,
        bonus120,
        bonus140,
        bonus175,
        bonus200,
        bonus215,
        bonus225,
        bonus255,
        characterId,
      },
    });

    const newAffinities = await prisma.affinity_bonus.findMany({
      // include: {
      //     rarity: true,
      // },
    });

    return res.status(201).json({
      msg: "Character affinity created successfully",
      data: newAffinities,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const updatedAffinity = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = affinitySchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        msg: error.details[0].message,
      });
    }

    const {
      bonus5,
      bonus15,
      bonus30,
      bonus50,
      bonus75,
      bonus80,
      bonus105,
      bonus120,
      bonus140,
      bonus175,
      bonus200,
      bonus215,
      bonus225,
      bonus255,
      characterId,
    } = value;

    const updatedAffinities = await prisma.affinity_bonus.update({
      where: { id: Number(id) },
      data: {
        bonus5,
        bonus15,
        bonus30,
        bonus50,
        bonus75,
        bonus80,
        bonus105,
        bonus120,
        bonus140,
        bonus175,
        bonus200,
        bonus215,
        bonus225,
        bonus255,
        characterId,
      },
    });

    return res.status(200).json({
      msg: `Affinities with the id: ${id} successfully updated`,
      data: updatedAffinities,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const deleteAffinity = async (req, res) => {
  try {
    const { id } = req.params;

    const affinity = await prisma.affinity_bonus.findUnique({
      where: { id: Number(id) },
    });

    if (!affinity) {
      return res
        .status(200)
        .json({ msg: `No affinity with the id: ${id} found` });
    }

    await prisma.affinity.delete({
      where: { id: Number(id) },
    });

    return res.json({
      data: affinity,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export {
  getAffinity,
  getAffinities,
  createAffinities,
  updatedAffinity,
  deleteAffinity,
};
