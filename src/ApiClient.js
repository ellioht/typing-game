import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;
const multipleUrl = "https://random-words5.p.rapidapi.com/getMultipleRandom";
const singleUrl = "https://random-words5.p.rapidapi.com/getRandom";

export class ApiClient {
  getWords() {
    return axios
      .get(multipleUrl, {
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": "random-words5.p.rapidapi.com",
        },
        params: {
          count: 8,
          minLength: 5,
          maxLength: 10,
        },
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.headers);
        }
        throw error;
      });
  }
  getWord() {
    return axios
      .get(singleUrl, {
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": "random-words5.p.rapidapi.com",
        },
        params: {
          minLength: 5,
          maxLength: 10,
        },
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.headers);
        }
        throw error;
      });
  }
}
