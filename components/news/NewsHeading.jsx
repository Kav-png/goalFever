import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

const NewsHeading = () => {
  return (
    <View style={styles.container}>
      {/* ----------------------------------------- */}
      <View style={styles.textRow}>
        <Text style={styles.text}>News</Text>
      </View>
      {/* ----------------------------------------- */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingBottom: 10,
  },
  text: {
    fontFamily: "DMBold",
    color: "#121212",
    height: 30,
    width: 183,
    fontSize: 30,
  },
  textRow: {
    marginBottom: 8,
    height: 30,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default NewsHeading;
