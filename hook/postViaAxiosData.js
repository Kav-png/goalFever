import axios from "axios";
import { API_KEY } from "../constants";

const fetchData = async (endpoint, query) => {
  try {
    const options = {
      method: "POST",
      url: `https://sportscore1.p.rapidapi.com/${endpoint}`,
      params: { ...query },
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "sportscore1.p.rapidapi.com",
      },
    };

    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data from the API.");
  }
};

export default fetchData;
