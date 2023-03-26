import { Router } from "express";
const router = Router();

import {
  getDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment,
  createDepartment,
} from "../controllers/departments.js";

router.route("/").get(getDepartments).post(createDepartment);
router
  .route("/:id")
  .put(updateDepartment)
  .delete(deleteDepartment)
  .get(getDepartment);

export default router;
