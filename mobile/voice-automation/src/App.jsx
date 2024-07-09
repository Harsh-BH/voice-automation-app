import React, { useState, useEffect } from "react";
import { View, Button, Text } from "react-native";
import Voice from "react-native-voice";
import axios from "axios";
import { API_URL } from "@env";

const App = () => {
  const [recognized, setRecognized] = useState("");
  const [started, setStarted] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (e) => {
    setStarted("√");
  };

  const onSpeechRecognized = (e) => {
    setRecognized("√");
  };

  const onSpeechResults = (e) => {
    setResults(e.value);
  };

  const startRecognizing = async () => {
    try {
      await Voice.start("en-US");
      setRecognized("");
      setStarted("");
      setResults([]);
    } catch (e) {
      console.error(e);
    }
  };

  const handleVoiceCommand = async () => {
    if (results.length > 0) {
      try {
        const response = await axios.post(`${API_URL}/dialogflow`, {
          query: results[0],
        });
        console.log(response.data.response);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View>
      <Button onPress={startRecognizing} title="Start Recognizing" />
      <Text>{`Started: ${started}`}</Text>
      <Text>{`Recognized: ${recognized}`}</Text>
      <Text>{`Results: ${results.join(", ")}`}</Text>
      <Button onPress={handleVoiceCommand} title="Send Command" />
    </View>
  );
};

export default App;
