import express from "express";
import controllerMovie from "../controllers/controllerMovie.js";
const router = express.Router();

const { index, show } = controllerMovie;

/* INDEX */
router.get("/", index);
/* show */
router.get("/:id", show);

export default router;
