/**
 * API Route for the raritiys controller
 *
 * This route handles operations related to the raritys controller
 *
 * @file: raritys.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-04-19
 * @updated: 2023-05-04
 */

import { Router } from "express";
const router = Router();

import {
  getRarity,
  getRarities,
  createRarity,
  updateRarity,
  deleteRarity,
} from "../controllers/raritys.js";

router.route("/").get(getRarities).post(createRarity);
router.route("/:id").get(getRarity).put(updateRarity).delete(deleteRarity);

export default router;
