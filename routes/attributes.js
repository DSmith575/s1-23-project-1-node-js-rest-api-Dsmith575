/**
 * API Route for the attributes controller
 *
 * This route handles operations related to the attributes controller
 *
 * @file: attributes.js
 * @version: 1.0.0
 * @author: Deacon Smith <SMITDE5@student.op.ac.nz>
 * @created: 2023-04-19
 * @updated: 2023-05-04
 */

import { Router } from "express";
const router = Router();

import {
  getAttribute,
  getAttributes,
  createAttribute,
  updateAttribute,
  deleteAttribute,
} from "../controllers/attributes.js";

router.route("/").get(getAttributes).post(createAttribute);
router.route("/:id").get(getAttribute).put(updateAttribute).delete(deleteAttribute);

export default router;
