import { View, Text, StyleSheet } from "react-native";
import React from "react";

const SearchCard = () => {
  return (
    <View style={styles.container}>
      <Text>SearchCard</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
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
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default SearchCard;
