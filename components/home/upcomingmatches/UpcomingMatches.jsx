import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
const dayjs = require("dayjs");

import UpcomingMatchesCard from "../../common/cards/UpcomingMatchesCard";
import useFetch from "../../../hook/useFetch";

function UpcomingMatches(props) {
  const isLoading = false;
  const error = false;
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  var today = dayjs();

  let dateToPassAsQuery = [];
  dateToPassAsQuery.push(today.format("YYYY-MM-DD"));
  for (var i = 1; i < 5; i++) {
    const day1 = dayjs(today).add(i, "days").format("YYYY-MM-DD");
    dateToPassAsQuery.push(day1);
  }

  let dateToDisplay = [];
  dateToDisplay.push("Today");
  for (var i = 1; i < 5; i++) {
    const day2 = dayjs(today).add(i, "days").format("ddd D MMM");
    dateToDisplay.push(day2);
  }

  const [selectedMatch, setSelectedMatch] = useState();
  const [selectedDate, setSelectedDate] = useState(); // Selected date to display
  // const { data, isLoading, error } = useFetch(`sports/1/events/date/${cardDate}`, {
  //   page: "1",
  // });

  const handleSelectDatePressQueryFetch = (
    dateToPassAsQuery,
    dateToDisplay
  ) => {
    setSelectedDate(dateToDisplay);
    // TODO: Route to a specific live match with the selected date
    const { data, isLoading, error } = useFetch(
      `sports/1/events/date/${dateToPassAsQuery}`,
      {
        page: "1",
      }
    );
    return (
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
    );
  };

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
      <View style={styles.tabsContainer}>
        <FlatList
          data={dateToDisplay}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(selectedDate, item)}
              onPress={handleSelectDatePressQueryFetch}
            >
              <Text style={styles.tabText(selectedDate, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: 4 }}
          horizontal
        />
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
  tabsContainer: {
    width: "100%",
    marginBottom: 12,
  },
  tab: (selectedDate, item) => ({
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: selectedDate === item ? "#444262" : "#C1C0C8",
  }),
  tabText: (selectedDate, item) => ({
    fontFamily: "DMMedium",
    color: selectedDate === item ? "#444262" : "#C1C0C8",
  }),
});

export default UpcomingMatches;
