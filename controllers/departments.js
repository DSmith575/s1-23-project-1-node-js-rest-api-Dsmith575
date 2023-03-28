import { PrismaClient } from "@prisma/client";
import Joi from 'joi';

const prisma = new PrismaClient();

const departmentSchema = Joi.object({
  name: Joi.string().required(),
  institutionId: Joi.number().required(),
});

const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await prisma.department.findUnique({
      where: { id: Number(id) },
      include: {
        Course: true,
      }
    });

    if (!department) {
      return res
        .status(200)
        .json({ msg: `No department with the id: ${id} found` });
    }

    return res.json({ data: department });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const getDepartments = async (req, res) => {
  try {
    const departments = await prisma.department.findMany({
      include: {
        Course: true,
      }
    });

    if (departments.length === 0) {
      return res.status(200).json({ msg: "No departments found" });
    }

    return res.json({ data: departments });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const createDepartment = async (req, res) => {
  try {
    const { error, value } = departmentSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        msg: error.details[0].message,
      });
    }

    const { name, institutionId } = value;

    await prisma.department.create({
      data: { name, institutionId },
    });

    const newDepartments = await prisma.department.findMany(({

    }))

    return res.status(201).json({
      msg: "Department successfully created",
      data: newDepartments,
    });


  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    })
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = departmentSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        msg: error.details[0].message,
      });
    }

    const { name, institutionId } = value;
    
    const updatedDepartment = await prisma.department.update({
      where: {id: Number(id)},
      data: { name, institutionId },
    });

    return res.status(201).json({
      msg: "Department updated successfully",
      data: updatedDepartment,
    })
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};



const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const Departments = await prisma.Departments.findUnique({
      where: { id: Number(id) },
    });
    if (!departments) {
      return res
        .status(200)
        .json({ msg: `No Departments with the id: ${id} found` });
    }

    await prisma.institution.delete({
      where: { id: Number(id) },
    });
    return res.json({
      data: Departments,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export {
  getDepartment,
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
