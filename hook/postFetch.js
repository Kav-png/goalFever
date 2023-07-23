import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const usePostFetch = (endpoint, query) => {
  const postData = async (data) => {
    const response = await axios.post(
      `https://football98.p.rapidapi.com/${endpoint}/search`,
      data,
      {
        headers: {
          "X-RapidAPI-Key":
            "1f6e575a84mshd541683c0aa837cp192745jsndeaa023f7c48",
          "X-RapidAPI-Host": "football98.p.rapidapi.com",
        },
      }
    );
    return response.data;
  };

  const mutation = useMutation(postData, {
    onSuccess: () => {
      queryClient.invalidateQueries(["search", endpoint, query]);
    },
  });

  return {
    data: mutation.data,
    isLoading: mutation.isLoading,
    error: mutation.error,
    refetch: mutation.mutate,
  };
};

export default usePostFetch;