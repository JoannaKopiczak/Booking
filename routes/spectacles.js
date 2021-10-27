const express = require("express");
const router = express.Router();
//const checkAuth = require("../middleware/checkAuth");
const { getAllSpectacles, addSpectacle } = require("../controller/spectacle");

router.get("/", getAllSpectacles);
router.post("/addspectacle", addSpectacle);

module.exports = router;

