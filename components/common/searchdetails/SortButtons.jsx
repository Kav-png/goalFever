import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES } from "../../../constants/theme";

// Sort buttons for sorting players by transfer value and age
// params: handleSortButtonPress, handleSortByAgeButtonPress, ageAscending,
// ascending, handleClearSortButtonPress
const SortButtons = ({
  handleSortButtonPress,
  handleSortByAgeButtonPress,
  ageAscending,
  ascending,
  handleClearSortButtonPress,
}) => {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.sortButton}
        onPress={handleSortByAgeButtonPress}
      >
        <Text style={styles.sortButtonText}>
          Sort By Age {ageAscending ? "▲" : "▼"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.sortButton}
        onPress={handleSortButtonPress}
      >
        <Text style={styles.sortButtonText}>
          Sort By Transfer Value {ascending ? "▲" : "▼"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.clearSortButton}
        onPress={handleClearSortButtonPress}
      >
        <Text style={styles.clearSortButtonText}>Clear Sort</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: SIZES.xSmall,
  },
  sortButton: {
    backgroundColor: "#312651",
    padding: SIZES.xSmall,
    borderRadius: SIZES.x2Small,
    marginHorizontal: SIZES.x3Small,
  },
  sortButtonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
  },
  clearSortButton: {
    backgroundColor: "#FF5733",
    padding: SIZES.x2Small,
    borderRadius: SIZES.x2Small,
    marginHorizontal: SIZES.x3Small,
  },
  clearSortButtonText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
  },
});

export default SortButtons;
