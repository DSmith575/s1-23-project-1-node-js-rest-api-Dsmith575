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
  getCharacter,
  getCharacters,
  createCharacter,
  updateCharacter,
  deleteCharacter,
} from "../controllers/characters.js";

router.route("/").get(getCharacters).post(createCharacter);
router
  .route("/:id")
  .get(getCharacter)
  .put(updateCharacter)
  .delete(deleteCharacter);

export default router;
