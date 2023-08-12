import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Constants from "expo-constants";

const useAutocomplete = (query) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["autocomplete", query],
    queryFn: async () => {
      const { manifest } = Constants;

      const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;
      const apiUrl = `${uri}/api/autocomplete?q=${query}`;

      const response = await axios.get(apiUrl);

      return response.data;
    },
  });

  return { data, isLoading, error, refetch };
};

export default useAutocomplete;
