import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useNearbyPlaces = (lat, lon, tag, radius) => {
  return useQuery({
    queryKey: ["nearbyPlaces", lat, lon, tag, radius],
    queryFn: async () => {
      const serverUrl = "http://localhost:3000"; // Replace with your server's URL
      const apiUrl = `${serverUrl}/api/nearby?lat=${lat}&lon=${lon}&tag=${tag}&radius=${radius}`;

      const response = await axios.get(apiUrl);

      return response.data;
    },
  });
};

export default useNearbyPlaces;
