import axios from "axios";

// const apiKey = process.env.REACT_APP_API_KEY;
const API_URL = "https://random-word-api.vercel.app";

export default class ApiClient {
  static getWords(words) {
    const url = `${API_URL}/api?words=${words}`;
    return axios.get(url);
  };
}
