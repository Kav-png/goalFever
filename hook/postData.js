import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const postData = (endpoint, query) => {
  const mutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.post(
          `https://sportscore1.p.rapidapi.com/${endpoint}`,
          {
            params: { ...query },
            headers: {
              "X-RapidAPI-Key":
                "1f6e575a84mshd541683c0aa837cp192745jsndeaa023f7c48",
              "X-RapidAPI-Host": "sportscore1.p.rapidapi.com",
            },
          }
        );
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch data from the API.");
      }
    },
    onSuccess: async () => {
      console.log("I'm first!");
    },
    onSettled: async () => {
      console.log("I'm second!");
    },
  });

  return mutation;
};

export default postData;
