/**
 * API Route for the personalities controller
 *
 * This route handles operations related to the personalities controller
 *
 * @file: personalities.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-05-04
 * @updated: 2023-05-04
 */

import { Router } from "express";
const router = Router();

import {
  getPersonality,
  getPersonalities,
  createPersonality,
  updatePersonality,
  deletePersonality,
} from "../controllers/personalities.js";

router.route("/").get(getPersonalities).post(createPersonality);
router
  .route("/:id")
  .get(getPersonality)
  .put(updatePersonality)
  .delete(deletePersonality);

export default router;
