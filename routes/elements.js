/**
 * API Route for the elements controller
 *
 * This route handles operations related to the elements controller
 *
 * @file: elements.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-04-19
 * @updated: 2023-05-04
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
