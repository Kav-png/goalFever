import { View, Text } from "react-native";
import React from "react";
import RecentMatchesTitle from "../../common/recentmatchescomponents/RecentMatchesTitle";
import RecentMatchesList from "../../common/recentmatchescomponents/RecentMatchesList";

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
