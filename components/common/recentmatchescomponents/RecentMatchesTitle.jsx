import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const RecentMatchesTitle = () => {
  return (
    <View style={styles.container}>
      {/* ----------------------------------------- */}
      <View style={styles.textRow}>
        <Text style={styles.text}>Recent Matches</Text>
        <TouchableOpacity
          onPress={() => {
            // TODO: Route to all live matches
          }}
        >
          <Text>Show all</Text>
        </TouchableOpacity>
      </View>
      {/* ----------------------------------------- */}
    </View>
  );
};

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

export default RecentMatchesTitle;
