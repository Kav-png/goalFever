import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";

import LiveMatchesCard from "../../common/cards/LiveMatchesCard";
import useFetch from "../../../hook/useFetch";

/* LiveMatches renders a list of live matches. */
function LiveMatches(props) {
  const { data, isLoading, error } = useFetch("sports/1/events/live", {
    page: "1",
  });

  const [selectedMatch, setSelectedMatch] = useState();

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.textRow}>
        <Text style={styles.text}>Live Matches</Text>
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
              <LiveMatchesCard item={item} selectedMatch={selectedMatch} />
            )}
            keyExtractor={(item) => item?.id}
            horizontal={true}
            contentContainerStyle={{ columnGap: 12 }}
            maxToRenderPerBatch={12}
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
