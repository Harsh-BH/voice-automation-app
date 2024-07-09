const express = require("express");
const bodyParser = require("body-parser");
const speechToTextRoute = require("./routes/speechToText");
const dialogflowRoute = require("./routes/dialogflow");

const app = express();
app.use(bodyParser.json());

app.use("/speech-to-text", speechToTextRoute);
app.use("/dialogflow", dialogflowRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
