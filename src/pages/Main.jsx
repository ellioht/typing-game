import React, { useState, useEffect } from "react";
import ApiClient from "../ApiClient";
import "./css/Main.css";

const Main = (props) => {
  const [word, setWord] = useState(""); // Word to type
  const [words, setWords] = useState([]); // Words from api
  const [inputText, setInputText] = useState("");
  const [updateHalfway, setUpdateHalfway] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [typeSpeed, setTypeSpeed] = useState(0); // words per minute
  const [sliceWords, setSliceWords] = useState([]); // [firstHalf, word, secondHalf]

  // Fetch single word from the API
  const fetchWord = async () => {
    const response = await ApiClient.getWords(20);
    console.log(response.data);
    setWords(response.data);
  };

  useEffect(() => {
    setWord(words[0]);
  }, [words]);

  useEffect(() => {
    splitWords(words, word);
  }, [word]);

  useEffect(() => {
    fetchWord();
  }, [updateHalfway]);

  // Handle input change
  const handleChange = (event) => {
    setInputText(event.target.value.toLowerCase());
  };

  // Handle button click
  const handleClick = () => {
    const endTime = new Date().getTime();
    const timeTaken = (endTime - startTime) / 1000; // convert to seconds
    const typingSpeed = Math.round((word.length / timeTaken) * 60); // calculate words per minute
    setStartTime(new Date().getTime());
    setTypeSpeed(typingSpeed);

    const currentIndex = words.indexOf(word);
    if (currentIndex < words.length - 1) {
      setWord(words[currentIndex + 1]);
    } else {
      setUpdateHalfway(!updateHalfway);
    }
    setInputText("");
  };

  // Handle Enter key press
  const handleKeyPress = (event) => {
    // check if value is the same as word
    if (inputText === word) {
      if (event.key === "Enter" || event.keyCode === 13) {
        event.preventDefault();
        handleClick();
      }
    }
  };

  // Split words
  const splitWords = (words, word) => {
    const index = words.indexOf(word);
    const firstHalf = words.slice(0, index).join(" ");
    const secondHalf = words.slice(index + 1, words.length).join(" ");
    setSliceWords([firstHalf, word, secondHalf]);
  };

  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <div className="flex items-center justify-center gap-4 wordsBox">
        <div className="element1">
          <h1 className="text-3xl font-bold text-black mb-4 whitespace-nowrap">{sliceWords[0]}</h1>
        </div>
        <div className="element2">
          <h1 className="text-3xl font-bold text-red-500 mb-4">
            {sliceWords[1]?.split("").map((char, index) => (
              <span key={index} className={char === inputText[index] ? "text-green-500" : ""}>
                {char}
              </span>
            ))}
          </h1>
        </div>
        <div className="element3">
          <h1 className="text-3xl font-bold text-black mb-4 whitespace-nowrap">{sliceWords[2]}</h1>
        </div>
      </div>

      <div className="bg-gray-500 rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center gap-4">
          {/* <h1 className="text-3xl font-bold text-white mb-4">{word}</h1> */}
          <h1 className="text-3xl font-bold text-white mb-4">{typeSpeed} wpm</h1>
        </div>
        <input
          type="text"
          placeholder="Type the word"
          value={inputText}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          className="bg-gray-200 text-gray-800 rounded-lg px-4 py-2 w-full"
        />
      </div>
    </div>
  );
};

export default Main;
