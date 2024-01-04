const URL = require("../models/url");
const shortid = require("short-id");

// invokes on post request
async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
//   console.log(body); // will print the url provided by the user
  if (!body.url) {
    return res.status(400).json({ err: "url is required" });
  }
  const shortId = shortid.generate();
  // setting the data for the userSchema , URL is the actual model so creating a model having properties like shortId that is created and redirectURL which is the original url that will come from the body and the visitHistory is an empty array . we will fill data into it later
  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortId });
}

async function handleAddAnalytics(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
}

// for get request to get all the analytics
async function handleGetAnalytics(req, res) {
  // getting the shortId from the request
  const shortId = req.params.shortId;

  // finding the user with the provided shortId in the database
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleAddAnalytics
};
