import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import LiveMatchesCard from "../../common/cards/LiveMatchesCard";

function LiveMatches(props) {
  const isLoading = false;
  const error = false;

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // dummy data
  const [selectedMatch, setSelectedMatch] = useState();

  const handleCardPress = (item) => {
    // TODO: Route to a specific live match
    setSelectedMatch(item);
  };

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.textRow}>
        <Text style={styles.text}>Live Matches</Text>
        <TouchableOpacity
          onPress={() => {
            // TODO: Route to all live matches
          }}
        >
          <Text>Show all</Text>
        </TouchableOpacity>
      </View>
      <View>
        {isLoading ? (
          <ActivityIndicator size="large" colors="#312651" /> // Loading indicator for the data source
        ) : error ? (
          <Text>Something went wrong</Text> //  Something went wrong error message
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <LiveMatchesCard
                item={item}
                selectedMatch={selectedMatch}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item}
            horizontal={true}
            contentContainerStyle={{ columnGap: 12 }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
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

export default LiveMatches;
