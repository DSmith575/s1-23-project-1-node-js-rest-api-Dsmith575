import { Router } from "express";
const router = Router();

 import {
    getCourse
} from "../controllers/courses.js";

router.route("/").get(getCourse);

export default router;