import { View, Text, FlatList } from "react-native";
import React from "react";
import SearchTeamCard from "./SearchTeamCard";
import { useState } from "react";
import { useEffect } from "react";
import fetchData from "../../../../hook/postViaAxiosData";
import { Button } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const SearchTeamCardContainer = ({ teams }) => {
  const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFetchData = async () => {
    setIsLoading(true);
    setError("");
    setFetchedData([]);
    console.log(teams);
    try {
      const query = {
        name: teams,
      };
      const data = await fetchData("teams/search", query);
      console.log(data.data);
      setFetchedData(data.data);
    } catch (error) {
      setError("Failed to fetch data from the API.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, [teams]);

  return (
    <View>
      {isLoading ? <Text>Loading...</Text> : null}
      {error ? <Text>Error: {error}</Text> : null}
      <View style={{ marginHorizontal: 15 }}>
        {fetchedData.slice(0, 3).map((item, index) => (
          <SearchTeamCard item={item} key={index} />
        ))}
      </View>
    </View>
  );
};

const SearchTeamCardContainerApp = ({ teams }) => {
  const queryClientTeamCardMaps = new QueryClient();
  return (
    <QueryClientProvider client={queryClientTeamCardMaps}>
      <SearchTeamCardContainer teams={teams} />
    </QueryClientProvider>
  );
};

export default SearchTeamCardContainerApp;
