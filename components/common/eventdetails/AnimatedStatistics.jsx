import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import StatsBar from "./StatsBar";
import useFetchStats from "../../../hook/useFetchStats";
import { ActivityIndicator } from "react-native";

const AnimatedStatistics = ({ eventId }) => {
  const { data, isLoading, error, refetch } = useFetchStats(
    `events/${eventId}/statistics`,
    {}
  );
  useEffect(() => {
    refetch();
  }, [eventId]);
  function formatString(inputString) {
    const words = inputString.split("_");
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    return capitalizedWords.join(" ");
  }

  if (isLoading) {
    return <ActivityIndicator size="large" color="#312651" />;
  } else if (error) {
    return <Text>Something went wrong</Text>;
  }

  return (
    <View style={styles.container}>
      {data.data.map((statistic) => (
        <View key={statistic.id} style={styles.statisticContainer}>
          <Text style={styles.statisticText}>
            {formatString(statistic.name)}:
          </Text>
          <Text>
            Home {statistic.home.substring(0, 4)} - Away{" "}
            {statistic.away.substring(0, 4)}
          </Text>
          <StatsBar
            value1={parseInt(statistic.home)}
            value2={parseInt(statistic.away)}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: "nowrap",
    justifyContent: "space-between",
  },
  statisticContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    marginBottom: 5,
    justifyContent: "space-between",
    borderRadius: 10,
    padding: 10,
  },
  statisticName: {
    marginBottom: 5,
  },
  ratioContainer: {
    flexDirection: "row",
    height: 10, // Height of the ratio bar
    borderRadius: 5,
    overflow: "hidden",
  },
  bar: {
    backgroundColor: "red", // Adjust the color as needed
    height: "100%",
  },
  statisticText: {
    marginRight: 10,
  },
});

export default AnimatedStatistics;
