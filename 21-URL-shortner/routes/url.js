const express = require("express");
const {handleGenerateNewShortURL, handleGetAnalytics, handleAddAnalytics} = require("../controller/url");

const router = express.Router();

// creating the short url on post request
router.post("/url",handleGenerateNewShortURL);

router.get("/:shortId", handleAddAnalytics);

// get analytics on get request
router.get("/analytics/:shortId", handleGetAnalytics);
module.exports = router;