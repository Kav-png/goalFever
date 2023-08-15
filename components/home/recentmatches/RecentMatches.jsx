import { View, Text } from "react-native";
import React from "react";
import RecentMatchesTitle from "../../common/recentmatchescomponents/RecentMatchesTitle";
import RecentMatchesList from "../../common/recentmatchescomponents/RecentMatchesList";

/**
 * The function renders
 * a view with a static title and a dynamic list of
 * recent matches.
 */
function RecentMatches() {
  return (
    <View>
      {/* // * Static */}
      <RecentMatchesTitle />
      {/* Dynamic */}
      <RecentMatchesList />
    </View>
  );
}

export default RecentMatches;
