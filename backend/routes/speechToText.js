const express = require("express");
const router = express.Router();
const speech = require("@google-cloud/speech");
const client = new speech.SpeechClient({
  keyFilename: "config/googleCredentials.json",
});

router.post("/", async (req, res) => {
  const audio = req.body.audio; // base64 encoded audio
  const request = {
    audio: {
      content: audio,
    },
    config: {
      encoding: "LINEAR16",
      sampleRateHertz: 16000,
      languageCode: "en-US",
    },
  };

  try {
    const [response] = await client.recognize(request);
    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join("\n");
    res.send({ transcription });
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

module.exports = router;
