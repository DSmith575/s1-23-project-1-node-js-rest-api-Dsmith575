import { PrismaClient } from "@prisma/client";
import Joi from "joi";

const prisma = new PrismaClient();

const paginationDefault = {
  amount: 10, // The number of items per page
  page: 1, // The page number
};

const institutionSchema = Joi.object({
  name: Joi.string().required(),
  region: Joi.string().required(),
  country: Joi.string().required(),
});

const getInstitution = async (req, res) => {
  try {
    const { id } = req.params;

    const institution = await prisma.institution.findUnique({
      where: { id: Number(id) },
      include: {
        departments: true,
      },
    });

    if (!institution) {
      return res
        .status(200)
        .json({ msg: `No institution with the id: ${id} found` });
    }

    return res.json({
      data: institution,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const getInstitutions = async (req, res) => {
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
      include: {
        departments: true,
      },
    };

    if (req.query.name || req.query.region || req.query.country) {
      query.where = {
        name: {
          in: req.query.name || undefined,
        },
        region: {
          in: req.query.region || undefined,
        },
        country: {
          in: req.query.country || undefined,
        },
      };
    }

    const institutions = await prisma.institution.findMany(query);

    if (institutions.length === 0) {
      return res.status(200).json({ msg: "No institutions found" });
    }

    const hasNextPage = institutions.length === Number(amount);

    return res.json({
      data: institutions,
      nextPage: hasNextPage ? Number(page) + 1 : null,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const createInstitution = async (req, res) => {
  try {
    const { error, value } = institutionSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        msg: error.details[0].message,
      });
    }

    const { name, region, country } = value; // destructuring validated object

    await prisma.institution.create({
      data: { name, region, country },
    });

    const newInstitutions = await prisma.institution.findMany({
      include: {
        departments: true,
      },
    });

    return res.status(201).json({
      msg: "Institution successfully created",
      data: newInstitutions,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const updateInstitution = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = institutionSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        msg: error.details[0].message,
      });
    }

    const { name, region, country } = value;

    const updatedInstitution = await prisma.institution.update({
      where: {id: Number(id)},
      data: { name, region, country },
    });

    return res.status(201).json({
      msg: "Institution updated successfully",
      data: updatedInstitution,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const deleteInstitution = async (req, res) => {
  try {
    const { id } = req.params;

    const institution = await prisma.institution.findUnique({
      where: { id: Number(id) },
    });

    if (!institution) {
      return res
        .status(200)
        .json({ msg: `No institution with the id: ${id} found` });
    }

    await prisma.institution.delete({
      where: { id: Number(id) },
    });

    return res.json({
      data: institution,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export {
  getInstitutions,
  createInstitution,
  updateInstitution,
  deleteInstitution,
  getInstitution,
};
