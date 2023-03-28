import { PrismaClient } from "@prisma/client";
import Joi from "joi";

const prisma = new PrismaClient();

const courseSchema = Joi.object({
  name: Joi.string().required(),
  code: Joi.string().required(),
  credits: Joi.number().required(),
  departmentId: Joi.number().required(),
});

const getCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await prisma.department.findUnique({
      where: { id: Number(id) },
    });

    if (!course) {
      return res
        .status(200)
        .json({ msg: `No course with the id: ${id} found` });
    }
    return res.json({ data: department });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await prisma.department.findMany();

    if (courses.length === 0) {
      return res.status(200).json({ msg: "No courses found" });
    }

    return res.json({ data: courses });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const createCourse = async (req, res) => {
  try {
    const { error, value } = courseSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        msg: error.details[0].message,
      });
    }

    const { name, code, credits, departmentId } = value;

    await prisma.course.create({
      data: { name, code, credits, departmentId },
    });

    const newCourses = await prisma.institution.findMany();

    return res.status(201).json({
      msg: "Institution successfully created",
      data: newCourses,
    });

  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value }= courseSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        msg: error.details[0].message,
      });
    }

    const { name, code, credits, departmentId } = value;

    const updatedCourse = await prisma.course.update({
      where: {id: Number(id)},
      data: { name, code, credits, departmentId },
    });

    return res.status(201).json({
      msg: "Course updated successfully",
      data: updatedCourse,
    })
  }
}



const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await prisma.course.findUnique({
      where: { id: Number(id) },
    });

    if (!course) {
      return res
        .status(200)
        .json({ msg: `No course with the id: ${id} found` });
    }

    await prisma.course.delete({
      where: { id: Number(id) },
    });

    return res.json({
      data: course,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export { getCourse, getCourses, createCourse, updateCourse, deleteCourse };
