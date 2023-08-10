import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import UpcomingMatchesCard from "../cards/UpcomingMatchesCard";
import axios from "axios";
import useFetch from "../../../hook/useFetch";

const RecentMatchesListContainer = ({ currentDate }) => {
  const { data, isLoading, error, refetch } = useFetch(
    `sports/1/events/date/${currentDate}`,
    {
      page: "1",
    }
  );

  useEffect(() => {
    // Fetch data whenever currentDate changes
    refetch();
  }, [currentDate]);

  return (
    <View>
      {isLoading ? (
        <ActivityIndicator size="large" colors="#312651" /> // Loading indicator for the data source
      ) : error ? (
        <Text>Something went wrong</Text> //  Something went wrong error message
      ) : (
        data.data?.slice(0, 50).map((item) => (
          <UpcomingMatchesCard
            item={item}
            selectedMatch={2023} // change this to match the ID of the match you want to see
            handleCardPress={() => {}}
            key={`upcoming-matches-${item?.id}`} // TODO: Temp key, add key from API when needed
          />
        ))
      )}
    </View>
  );
};

export default RecentMatchesListContainer;
