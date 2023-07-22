import axios from "axios";

const fetchData = async (endpoint, query) => {
  try {
    const options = {
      method: "POST",
      url: `https://sportscore1.p.rapidapi.com/${endpoint}`,
      params: { ...query },
      headers: {
        "X-RapidAPI-Key": "1f6e575a84mshd541683c0aa837cp192745jsndeaa023f7c48",
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
