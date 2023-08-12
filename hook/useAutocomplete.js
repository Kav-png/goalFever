import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Constants from "expo-constants";

const useAutocomplete = (query) => {
  const { manifest } = Constants;

  if (query.length < 3) {
    return { data: [], isLoading: false, error: null, refetch: () => {} };
  }

  const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;
  const apiUrl = `${uri}/api/autocomplete?q=${query}`;

  const { data, isLoading, error, refetch } = useQuery(
    ["autocomplete", query], // Add query as a dependency here
    async () => {
      try {
        const response = await axios.get(apiUrl);
        return response.data;
      } catch (error) {
        throw error;
      }
    }
  );

  return { data, isLoading, error, refetch };
};

export default useAutocomplete;
