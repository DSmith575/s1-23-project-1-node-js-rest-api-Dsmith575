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
