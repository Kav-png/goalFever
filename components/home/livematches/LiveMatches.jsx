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
import useFetch from "../../../hook/useFetch";

function LiveMatches(props) {
  // const isLoading = false;
  // const error = false;
  // const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const { data, isLoading, error } = useFetch("sports/1/events/live", {
    page: "1",
  });

  const [selectedMatch, setSelectedMatch] = useState();

  const handleCardPress = (id) => {
    // TODO: Route to a specific live match
    setSelectedMatch(id);
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
            data={data.data}
            renderItem={({ item }) => (
              <LiveMatchesCard
                item={item}
                selectedMatch={selectedMatch}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => item?.id}
            horizontal={true}
            contentContainerStyle={{ columnGap: 12 }}
            initialNumToRender={12}
          />
        )}
      </View>
    </View>
  );
}

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

export default LiveMatches;
