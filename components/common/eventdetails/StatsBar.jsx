import React from "react";
import { StyleSheet, View } from "react-native";
import { SIZES } from "../../../constants";

// Calculates the ratio between two values and displays it as a bar
const StatsBar = ({ value1, value2 }) => {
  // Calculate the ratio of the values
  const totalValue = value1 + value2;
  const ratio1 = (value1 / totalValue) * 100;
  const ratio2 = (value2 / totalValue) * 100;
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.bar,
          { width: ratio1 <= 100 ? ratio1 : 100, backgroundColor: "#b3b3b3" },
        ]}
      />
      <View
        style={[
          styles.bar,
          {
            width: ratio2 <= 100 ? ratio2 : 100,
            backgroundColor: "#d9d9d9",
            backfaceVisibility: "",
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 100,
    height: SIZES.large,
    borderRadius: SIZES.xSmall,
    backgroundColor: "#E0E0E0",
    overflow: "hidden",
  },
  bar: {
    height: "100%",
  },
});

export default StatsBar;
