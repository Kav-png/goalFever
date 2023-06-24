import React, { Component } from "react";
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

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.textRow}>
        <Text style={styles.text}>Live Matches</Text>
        <Text>Show all</Text>
      </View>
      <View>
        {isLoading ? (
          <ActivityIndicator size="large" colors="#312651" /> // Loading indicator for the data source
        ) : error ? (
          <Text>Something went wrong</Text> //  Something went wrong error message
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => <LiveMatchesCard item={item} />}
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
