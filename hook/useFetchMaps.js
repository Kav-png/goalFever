import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useFetchMaps = (query) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["Map"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://trueway-places.p.rapidapi.com/FindPlacesNearby`,
        {
          params: { ...query },
          headers: {
            "X-RapidAPI-Key":
              "1f6e575a84mshd541683c0aa837cp192745jsndeaa023f7c48",
            "X-RapidAPI-Host": "trueway-places.p.rapidapi.com",
          },
        }
      );
      return data;
    },
  });
  //   Iteration 2 of code check JavascriptMastery for second way

  return { data, isLoading, error, refetch };
};

export default useFetchMaps;
