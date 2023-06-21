import "./App.css";
import React, { useState, useEffect } from "react";
import { ApiClient } from "./ApiClient";

function App() {
  const apiClient = new ApiClient();

  const [word, setWord] = useState(""); // Word to type
  const [words, setWords] = useState([]); // Words from api
  const [updateWord, setUpdateWord] = useState(false); // Update word
  const [inputText, setInputText] = useState("");
  const [updateHalfway, setUpdateHalfway] = useState(false);

  // Fetch single word from the API
  const fetchWord = async () => {
    const response = await apiClient.getWords();
    setWords(response.data);
  };
  
  useEffect(() => {
    fetchWord();
  }, [updateHalfway]);

  useEffect(() => {
    setWord(words[0]);
  }, [words]);

  // Handle input change
  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  // Handle button click
  const handleClick = () => {
    const currentIndex = words.indexOf(word);
    if (currentIndex < words.length - 1) {
      setWord(words[currentIndex + 1]);
    } else {
      setWord(words[0]);
    }
    setInputText("");

    // if half way of words array, fetch new words
    if (currentIndex === Math.floor(words.length / 2)) {
      setUpdateHalfway(!updateHalfway);
      console.log("Halfway");
    } 
  };

  // Handle Enter key press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div className="App">
      <h1>{word}</h1>
      <h2>{words}</h2>
      <input type="text" placeholder="Enter a word" value={inputText} onChange={handleChange} onKeyPress={handleKeyPress} />
      <button onClick={inputText === word ? handleClick : undefined}>Get new word</button>
    </div>
  );
}

export default App;
