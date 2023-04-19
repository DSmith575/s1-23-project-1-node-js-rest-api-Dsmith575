/**
 * API Controller for managing character data.
 *
 * This controller handles CRUD operations related to character creation
 *
 * @file: elements.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-04-19
 * @updated: 2023-04-19
 *
 * @SCHEMA
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
