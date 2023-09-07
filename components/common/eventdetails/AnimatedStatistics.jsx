import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";
import useFetchStats from "../../../hook/useFetchStats";
import StatsBar from "./StatsBar";

// Displays the stats of an eventId in terms of bars and numbers
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
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <View></View>
        <Text style={styles.leagueText}>Home</Text>
        <Text style={styles.leagueText}>Away</Text>
      </View>
      {data.data.map((statistic) => (
        <View key={statistic.id} style={styles.statisticContainer}>
          <Text style={styles.statisticText}>
            {formatString(statistic.name)}:
          </Text>
          <Text>{statistic.home.substring(0, 4)}</Text>
          <StatsBar
            value1={parseInt(statistic.home)}
            value2={parseInt(statistic.away)}
          />
          <Text>{statistic.away.substring(0, 4)}</Text>
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
    backgroundColor: COLORS.white,
    marginBottom: SIZES.x3Small,
    borderRadius: SIZES.xSmall,
    padding: SIZES.xSmall,
  },
  statisticName: {
    marginBottom: SIZES.x3Small,
  },
  ratioContainer: {
    flexDirection: "row",
    height: SIZES.xSmall, // Height of the ratio bar
    borderRadius: SIZES.x3Small,
    overflow: "hidden",
  },
  bar: {
    backgroundColor: "red", // Adjust the color as needed
    height: "100%",
  },
  statisticText: {
    marginRight: SIZES.xSmall,
    width: "30%",
  },
  leagueText: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    color: "#312651",
  },
});

export default AnimatedStatistics;
