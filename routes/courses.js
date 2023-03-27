import { Router } from "express";
const router = Router();

import {
  getCourse,
  getCourses,
  updateCourse,
  deleteCourse,
  createCourse,
} from "../controllers/courses.js";

router.route("/").get(getCourses).post(createCourse);
router.route("/:id").put(updateCourse).delete(deleteCourse).get(getCourse);

export default router;
