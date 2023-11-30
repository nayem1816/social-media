const express = require("express");
const auth = require("../../middlewares/auth");
const ReactionsController = require("./reactions.controller");

const router = express.Router();

router.post("/", auth(), ReactionsController.createReact);
router.get("/:postId", auth(), ReactionsController.getAllReactByPostId);

module.exports = router;
