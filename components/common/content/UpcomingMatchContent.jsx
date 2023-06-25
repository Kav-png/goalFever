import { View, Text, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import UpcomingMatchesCard from "../cards/UpcomingMatchesCard";
import useFetch from "../../../hook/useFetch";

const UpcomingMatchContent = ({ dateToPassAsQueryItem }) => {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const handleCardPress = (id) => {
    // TODO: Route to a specific live match
    setSelectedMatch(id);
  };
  //   const { data, isLoading, error } = useFetch(
  //     `sports/1/events/date/${dateToPassAsQuery}`,
  //     {
  //       page: "1",
  //     }
  //   );
  return (
    <View>
      {/* {isLoading ? (
        <ActivityIndicator size="large" colors="#312651" /> // Loading indicator for the data source
      ) : error ? (
        <Text>Something went wrong</Text> //  Something went wrong error message
      ) : (
        data.map((item) => (
          <UpcomingMatchesCard
            item={item}
            selectedMatch={selectedMatch}
            handleCardPress={handleCardPress}
            key={item} // TODO: Temp key, add key from API when needed
          />
        ))
      )} */}
      <View>
        <Text>
          {dateToPassAsQueryItem}
          {console.log(dateToPassAsQueryItem)}
        </Text>
      </View>
    </View>
  );
};

export default UpcomingMatchContent;
