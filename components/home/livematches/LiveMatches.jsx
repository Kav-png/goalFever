import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";
import useFetch from "../../../hook/useFetch";
import LiveMatchesCard from "../../common/cards/LiveMatchesCard";

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
            contentContainerStyle={{ columnGap: 10 }}
            maxToRenderPerBatch={12}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 2,
  },
  text: {
    fontFamily: FONT.regular,
    color: COLORS.gray,
    height: SIZES.x26Large,
    width: 183,
    fontSize: SIZES.large,
  },
  textRow: {
    marginBottom: 4,
    height: SIZES.x26Large,
    paddingHorizontal: SIZES.medium,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default LiveMatches;
