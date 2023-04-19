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
  getElement,
  getElements,
  createElement,
  updateElement,
  deleteElement,
} from "../controllers/elements.js";

router.route("/").get(getElements).post(createElement);
router.route("/:id").get(getElement).put(updateElement).delete(deleteElement);

export default router;
