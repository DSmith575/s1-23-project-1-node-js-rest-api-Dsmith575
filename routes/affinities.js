/**
 * API Route for the affinities controller
 *
 * This route handles operations related to the affinities controller
 *
 * @file: affinities.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-04-19
 * @updated: 2023-05-04
 */

import { Router } from "express";
const router = Router();

import {
  getAffinity,
  getAffinities,
  createAffinities,
  updatedAffinity,
  deleteAffinity,
} from "../controllers/affinities.js";

router.route("/").get(getAffinities).post(createAffinities);
router
  .route("/:id")
  .get(getAffinity)
  .put(updatedAffinity)
  .delete(deleteAffinity);

export default router;
