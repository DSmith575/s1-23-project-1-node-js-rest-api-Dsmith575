import { Router } from "express";
const router = Router();

import {
    getRarity,
    getRarities,
    createRarity,
    updateRarity,
    deleteRarity
} from "../controllers/raritys.js";

router.route("/").get(getRarities).post(createRarity);
router.route("/:id").get(getRarity).put(updateRarity).delete(deleteRarity);

export default router;