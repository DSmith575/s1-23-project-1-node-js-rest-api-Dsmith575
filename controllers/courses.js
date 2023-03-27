import { PrismaClient } from "@/prisma/client";

const prisma = new PrismaClient();

const getCourse = async (req, res) => {
    try {
        const { id } = req.params;

        const course = await prisma.department.findUnique({
            where: { id: Number(id) }, 
        });

        if (!course) {
            return res
            .status(200)
            .json({msg: `No course with the id: ${id} found`});
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

        if (getCourses.length === 0) {
            return res.status(200).json({msg: "No courses found"});
        }
    }
}