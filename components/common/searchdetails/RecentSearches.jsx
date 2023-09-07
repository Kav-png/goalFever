import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";

// Displays Recent Searches
const RecentSearches = ({ recentSearches, setSearchPhrase }) => {
  const recentSearchesList = recentSearches.slice(0, 4).map((item, index) => (
    <TouchableOpacity
      key={index.toString()}
      style={styles.recentSearchesButton}
      onPress={() => setSearchPhrase(item)}
    >
      <Text style={{ fontFamily: FONT.regular }}>{item}</Text>
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
    marginTop: SIZES.xSmall,
    fontFamily: FONT.bold,
    marginLeft: SIZES.xSmall,
    fontSize: SIZES.medium,
  },
  recentSearchesButton: {
    borderColor: COLORS.gray,
    borderWidth: 1,
    padding: SIZES.x3Small,
    paddingHorizontal: SIZES.x3Small,
    marginHorizontal: SIZES.xSmall,
    marginTop: SIZES.x2Small,
    borderRadius: SIZES.x2Small,
  },
});

export default RecentSearches;
