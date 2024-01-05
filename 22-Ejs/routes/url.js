const express = require("express");
const {handleGenerateNewShortURL, handleGetAnalytics, handleAddAnalytics, handleDeleteEntry} = require("../controller/url");

const router = express.Router();

// creating the short url on post request
router.post("/url",handleGenerateNewShortURL);

router.get("/:shortId", handleAddAnalytics);

// get analytics on get request
router.get("/analytics/:shortId", handleGetAnalytics);

router.delete("/:shortId", handleDeleteEntry)
module.exports = router;