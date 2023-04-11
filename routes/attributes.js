import { Router } from "express";
const router = Router();

import {
    getAttribute,
    getAttributes,
    createAttribute,
    updateAttribute,
    deleteAttribute
} from "../controllers/attributes.js";

router.route("/").get(getAttributes).post(createAttribute);
router.route("/:id").get(getAttribute).put(updateAttribute).delete(deleteAttribute);

export default router;