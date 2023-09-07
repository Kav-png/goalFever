import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import useFetch from "../../../hook/useFetch";
import UpcomingMatchesCard from "../cards/UpcomingMatchesCard";
import useFetchTeamMatches from "../../../hook/useFetchTeamMatches";
import useFetchTeam from "../../../hook/useFetchTeam";

const TeamsMatches = ({ id, type }) => {
  const router = useRouter();
  const { data, isLoading, error, refetch } = useFetchTeam(
    `${type}/${id}/events`,
    {},
    `${type}-matches`
  );

  useEffect(() => {
    // Fetch data whenever id changes
    refetch();
  }, [id]);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" colors="#312651" /> // Loading indicator for the data source
      ) : error ? (
        <Text>Something went wrong</Text> //  Something went wrong error message
      ) : (
        <View>
          {data.data.slice(0, 10)?.map((item, index) => (
            <UpcomingMatchesCard
              item={item}
              selectedMatch={2023} // change this to match the ID of the match you want to see
              key={`${type}-matches-${item?.id}`} // TODO: Temp key, add key from API when needed
              index={index}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default TeamsMatches;
