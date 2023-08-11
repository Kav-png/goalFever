import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Constants from "expo-constants";

const useNearbyPlaces = (lat, lon, tag, radius) => {
  return useQuery({
    queryKey: ["nearbyPlaces", lat, lon, tag, radius],
    queryFn: async () => {
      const { manifest } = Constants;

      const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;
      const apiUrl = `${uri}/api/nearby?lat=${lat}&lon=${lon}&tag=${tag}&radius=${radius}`;

      const response = await axios.get(apiUrl);

      return response.data;
    },
  });
};

export default useNearbyPlaces;
