import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { API_KEY } from "../constants";
const useFetchTeam = (endpoint, query, type) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [type],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://sportscore1.p.rapidapi.com/${endpoint}`,
        {
          params: { ...query },
          headers: {
            "X-RapidAPI-Key": API_KEY,
            "X-RapidAPI-Host": "sportscore1.p.rapidapi.com",
          },
        }
      );
      return data;
    },
  });
  //   Iteration 2 of code check JavascriptMastery for second way

  return { data, isLoading, error, refetch };
};

export default useFetchTeam;
