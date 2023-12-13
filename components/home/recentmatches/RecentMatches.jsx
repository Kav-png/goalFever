import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { dateFetch } from "../../../utils";
import CustomTabs from "../../common/recentmatchescomponents/CustomTabs";
import RecentMatchesListContainer from "../../common/recentmatchescomponents/RecentMatchesListContainer";
import { COLORS, FONT, SIZES } from "../../../constants";

/**
 * The function renders
 * a view with a static titOle and a dynamic list of
 * recent matches.
 * The component inside renders a list of recent matches
 *  based on the selected date tab.
 */
function RecentMatches() {
  const dates = dateFetch();

  const [activeTab, setActiveTab] = useState(dates[0]);

  /**
   * `switchTabs` returns component based on the value of the `activeTab`
   * variable.
   */
  const switchTabs = () => {
    switch (activeTab) {
      case dates[0]:
        return <RecentMatchesListContainer currentDate={dates[0]} />;
      case dates[1]:
        return <RecentMatchesListContainer currentDate={dates[1]} />;
      case dates[2]:
        return <RecentMatchesListContainer currentDate={dates[2]} />;
      case dates[3]:
        return <RecentMatchesListContainer currentDate={dates[3]} />;
      case dates[4]:
        return <RecentMatchesListContainer currentDate={dates[4]} />;
      default:
        break;
    }
  };
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.textRow}>
          <Text style={styles.text}>Recent Matches</Text>
        </View>
      </View>
      {/* Should hold the Filter Buttons */}
      {/* Pass back: onPress Function, date selected */}
      <CustomTabs
        dates={dates}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {switchTabs()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.xSmall,
  },
  text: {
    fontFamily: FONT.bold,
    color: COLORS.gray,
    height: 30,
    width: 183,
    fontSize: SIZES.large,
  },
  textRow: {
    marginBottom: SIZES.x2Small,
    height: SIZES.x26Large,
    paddingHorizontal: SIZES.xSmall,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default RecentMatches;
