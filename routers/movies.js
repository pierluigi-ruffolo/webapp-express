import express from "express";
import controllerMovie from "../controllers/controllerMovie.js";
import upload from "../middlewares/handleFile.js";
const router = express.Router();

const { index, show, store, storeReviews } = controllerMovie;

/* INDEX */
router.get("/", index);
/* show */
router.get("/:slug", show);
/* store movies */
router.post("/", upload.single("image"), store);
/* Store reviews */
router.post("/:id/reviews", storeReviews);

export default router;
