import {
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
} from "react-native";
import React, { useCallback, useState } from "react";
import UpcomingMatchesCard from "../cards/UpcomingMatchesCard";
import useFetch from "../../../hook/useFetch";

const UpcomingMatchContent = ({ dateToPassAsQueryItem }) => {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const handleCardPress = (id) => {
    // TODO: Route to a specific live match
    setSelectedMatch(id);
  };
  const { data, isLoading, error, refetch } = useFetch(
    `sports/1/events/date/${dateToPassAsQueryItem}`,
    {
      page: "1",
    }
  );

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {isLoading ? (
        <ActivityIndicator size="large" colors="#312651" /> // Loading indicator for the data source
      ) : error ? (
        <Text>Something went wrong</Text> //  Something went wrong error message
      ) : (
        data.data?.slice(0, 10).map((item, index) => (
          <UpcomingMatchesCard
            item={item}
            selectedMatch={selectedMatch}
            handleCardPress={handleCardPress}
            key={`upcoming-matches-${item?.id}`} // TODO: Temp key, add key from API when needed
          />
        ))
      )}
      {console.log(data)}
    </ScrollView>
  );
};

export default UpcomingMatchContent;
