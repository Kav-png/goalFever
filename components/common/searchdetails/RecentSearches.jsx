import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";

const RecentSearches = ({ recentSearches }) => {
  return (
    <View>
      <Text style={styles.recentSearchesText}>Recent Searches:</Text>
      <FlatList
        data={recentSearches.slice(0, 4)}
        keyExtractor={(index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.recentSearchesButton}>
            <Text style={{ fontFamily: "DMRegular" }}>{item}</Text>
          </TouchableOpacity>
        )}
      />
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
