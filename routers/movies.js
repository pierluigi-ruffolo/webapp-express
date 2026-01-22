import express from "express";
import controllerMovie from "../controllers/controllerMovie.js";
const router = express.Router();

const { index, show, storeReviews } = controllerMovie;

/* INDEX */
router.get("/", index);
/* show */
router.get("/:slug", show);
/* Store reviews */
router.post("/:id/reviews", storeReviews);
export default router;
