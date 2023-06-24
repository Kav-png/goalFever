import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { getCurrentDate, getNextDate } from "../../../utils";
import UpcomingMatchesCard from "../../common/cards/UpcomingMatchesCard";
import useFetch from "../../../hook/useFetch";

function UpcomingMatches(props) {
  const isLoading = false;
  const error = false;
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [cardDate, setCardDate] = useState(getCurrentDate());
  const dateCurrent = getCurrentDate();
  const dateNext = getNextDate((dayIncrement = 1));

  console.log(dateCurrent);

  console.log(dateNext);

  // const { data, isLoading, error } = useFetch(`sports/1/events/date/${cardDate}`, {
  //   page: "1",
  // });

  const [selectedMatch, setSelectedMatch] = useState();

  const handleCardPress = (id) => {
    // TODO: Route to a specific live match
    setSelectedMatch(id);
  };

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.textRow}>
        <Text style={styles.text}>Upcoming Matches</Text>
        <TouchableOpacity
          onPress={() => {
            // TODO: Route to all live matches
          }}
        >
          <Text>Show all</Text>
        </TouchableOpacity>
      </View>
      <View>
        {isLoading ? (
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
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
  text: {
    fontFamily: "DMRegular",
    color: "#121212",
    height: 26,
    width: 183,
    fontSize: 20,
  },
  textRow: {
    marginBottom: 8,
    height: 26,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default UpcomingMatches;
