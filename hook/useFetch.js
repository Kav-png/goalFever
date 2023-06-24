import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useFetch = (endpoint, query) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["search"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://jsearch.p.rapidapi.com/${endpoint}`,
        {
          params: { ...query },
          headers: {
            "X-RapidAPI-Key":
              "1f6e575a84mshd541683c0aa837cp192745jsndeaa023f7c48",
            "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
          },
        }
      );
      return data;
    },
  });
  //   Iteration 2 of code check JavascriptMastery for second way

  return { data, isLoading, error };
};

export default useFetch;
