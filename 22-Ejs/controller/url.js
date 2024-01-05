const URL = require("../models/url");
const shortid = require("short-id");

// invokes on post request
async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
    // console.log(body); // will print the url provided by the user
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
  return res.render("home", {id : shortId});
}

// add entries in the database for the analytics
async function handleAddAnalytics(req, res) {
  const shortId = req.params.shortId;
  // find the entry/user for shortId and updating the visitHistory array
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
  // redirecting to that user/entry's redirectURL property(original url)
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

async function handleDeleteEntry(req, res) {
  const shortId = req.params.shortId;
  // console.log(shortId);
  const entry = await URL.findOneAndDelete({ shortId });
  // console.log(entry);
  return res.send(`short URL for ${entry.redirectURL} is deleted`);
}

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleAddAnalytics,
  handleDeleteEntry
};
