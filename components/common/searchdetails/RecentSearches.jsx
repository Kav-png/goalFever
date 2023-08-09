import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const RecentSearches = ({ recentSearches }) => {
  const recentSearchesList = recentSearches.slice(0, 4).map((item, index) => (
    <TouchableOpacity
      key={index.toString()}
      style={styles.recentSearchesButton}
    >
      <Text style={{ fontFamily: "DMRegular" }}>{item}</Text>
    </TouchableOpacity>
  ));
  return (
    <View>
      <Text style={styles.recentSearchesText}>Recent Searches:</Text>
      {recentSearchesList}
    </View>
  );
};
const styles = StyleSheet.create({
  recentSearchesText: {
    marginTop: 10,
    fontFamily: "DMBold",
    marginLeft: 10,
    fontSize: 16,
  },
  recentSearchesButton: {
    borderColor: "grey",
    borderWidth: 1,
    padding: 5,
    paddingHorizontal: 5,
    marginHorizontal: 10,
    marginTop: 7,
    borderRadius: 8,
  },
});

export default RecentSearches;
