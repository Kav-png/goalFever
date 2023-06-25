import React, { Component, useCallback, useState } from "react";
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
import FilterTabs from "../../common/datefiltertabs/FilterTabs";
import UpcomingMatchContent from "../../common/content/UpcomingMatchContent";

function UpcomingMatches(props) {
  var today = dayjs();

  let dateToPassAsQuery = [];
  dateToPassAsQuery.push(today.format("YYYY-MM-DD"));
  for (var i = 1; i < 5; i++) {
    const day1 = dayjs(today).add(i, "days").format("YYYY-MM-DD");
    dateToPassAsQuery.push(day1);
  }

  let dateToDisplay = [];
  dateToDisplay.push(today.format("ddd D MMM"));
  for (var i = 1; i < 5; i++) {
    const day2 = dayjs(today).add(i, "days").format("ddd D MMM");
    dateToDisplay.push(day2);
  }

  const [activeTab, setActiveTab] = useState(dateToDisplay[0]);
  const [selectedQueryDate, setSelectedQueryDate] = useState(
    today.format("YYYY-MM-DD")
  );

  const displayTabContent = () => {
    switch (activeTab) {
      case dateToDisplay[0]:
        return (
          <UpcomingMatchContent dateToPassAsQueryItem={selectedQueryDate} />
        );
      case dateToDisplay[1]:
        setSelectedQueryDate(dateToDisplay[1]);
        return (
          <UpcomingMatchContent dateToPassAsQueryItem={selectedQueryDate} />
        );
      case dateToDisplay[2]:
        setSelectedQueryDate(dateToDisplay[2]);
        return (
          <UpcomingMatchContent dateToPassAsQueryItem={selectedQueryDate} />
        );
      case dateToDisplay[3]:
        setSelectedQueryDate(dateToDisplay[3]);
        return (
          <UpcomingMatchContent dateToPassAsQueryItem={selectedQueryDate} />
        );
    }
  };

  return (
    <View style={[styles.container, props.style]}>
      {/* // */}
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
      {/* // */}
      <FilterTabs
        tabs={dateToDisplay}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <>{displayTabContent(dateToPassAsQuery)}</>
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
