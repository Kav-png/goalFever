import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";

/**
 * The RecentMatchesTitle displays the title "Recent Matches"
 * in a styled container.
 */
const RecentMatchesTitle = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textRow}>
        <Text style={styles.text}>Recent Matches</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.xSmall,
  },
  text: {
    fontFamily: FONT.bold,
    color: COLORS.gray,
    height: 30,
    width: 183,
    fontSize: SIZES.large,
  },
  textRow: {
    marginBottom: SIZES.x2Small,
    height: SIZES.x26Large,
    paddingHorizontal: SIZES.xSmall,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default RecentMatchesTitle;
