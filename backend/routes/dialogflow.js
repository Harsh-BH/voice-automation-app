const express = require("express");
const router = express.Router();
const dialogflow = require("dialogflow");
const sessionClient = new dialogflow.SessionsClient({
  keyFilename: "config/googleCredentials.json",
});
const sessionPath = sessionClient.sessionPath(
  "voice-automation-app-428915",
  "unique-session-id"
);

router.post("/", async (req, res) => {
  const query = req.body.query;
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: "en-US",
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    res.send({ response: result.fulfillmentText });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

module.exports = router;
