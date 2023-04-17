import { Router } from "express";
const router = Router();

import {
    getAffinity,
    getAffinities,
    createAffinities,
    updatedAffinity,
    deleteAffinity
} from "../controllers/affinities.js";

router.route("/").get(getAffinities).post(createAffinities);
router.route("/:id").get(getAffinity).put(updatedAffinity).delete(deleteAffinity);

export default router;