import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

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
    marginTop: 10,
  },
  sortButton: {
    backgroundColor: "#312651",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  sortButtonText: {
    color: "white",
    fontSize: 14,
  },
  clearSortButton: {
    backgroundColor: "#FF5733",
    padding: 8,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  clearSortButtonText: {
    color: "white",
    fontSize: 14,
  },
});

export default SortButtons;
