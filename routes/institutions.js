import { Router } from "express";
const router = Router(); // Accessing the Router() object from express. It allows you to handle various requests

// Importing the four CRUD functions
import {
  getInstitutions,
  createInstitution,
  updateInstitution,
  deleteInstitution,
  getInstitution,
} from "../controllers/institutions.js";

router.route("/").get(getInstitutions).post(createInstitution)
router.route("/:id").put(updateInstitution).delete(deleteInstitution).get(getInstitution)

export default router; // You do not need to enclose router in curly braces