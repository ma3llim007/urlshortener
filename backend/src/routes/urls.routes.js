import { Router } from "express";
import authenticateAndVerify from "../middlewares/authenticateAndVerifyUser.js";
import { createUrl, deleteUrl, getUrlsByUserId, redirectUrl, storeClicks } from "../controllers/urls.controller.js";

const router = Router();

router.route("/get-urls").get(authenticateAndVerify, getUrlsByUserId);
router.route("/create-url").post(authenticateAndVerify, createUrl);
router.route("/delete-url/:urlId").delete(authenticateAndVerify, deleteUrl);
router.route("/redirect/:url").get(authenticateAndVerify, redirectUrl);
router.route("/stock-click/").post(authenticateAndVerify, storeClicks);

export default router;
