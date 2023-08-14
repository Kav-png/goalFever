import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import useFetch from "../../../hook/useFetch";
import UpcomingMatchesCard from "../cards/UpcomingMatchesCard";
import useFetchTeamMatches from "../../../hook/useFetchTeamMatches";
import useFetchTeam from "../../../hook/useFetchTeam";

const TeamsMatches = ({ teamId }) => {
  const router = useRouter();
  const { data, isLoading, error, refetch } = useFetchTeam(
    `teams/${teamId}/events`,
    {},
    "teams-matches"
  );

  useEffect(() => {
    // Fetch data whenever teamId changes
    refetch();
  }, [teamId]);

  const handleCardPress = (index) => {
    const eventId = data.data[index]?.id;
    return router.push({
      pathname: `/event-details/${eventId}`,
      params: { eventId: eventId },
    });
  };

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
              handleCardPress={handleCardPress}
              key={`teams-matches-${item?.id}`} // TODO: Temp key, add key from API when needed
              index={index}
            />
          ))}
        </View>
      )}
    </View>
  );
};

export default TeamsMatches;
