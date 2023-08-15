import { View } from "react-native";
import React, { useState } from "react";
import RecentMatchesListContainer from "./RecentMatchesListContainer";
import { dateFetch } from "../../../utils";
import RecentMatchesFilter from "./RecentMatchesFilter";

/**
 * The `RecentMatchesList` component renders a list of recent matches
 *  based on the selected date tab.
 */
const RecentMatchesList = () => {
  const dates = dateFetch(); // ********************************

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
      {/* Should hold the Filter Buttons */}
      {/* Pass back: onPress Function, date selected */}
      <RecentMatchesFilter
        dates={dates}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {switchTabs()}
    </View>
  );
};

export default RecentMatchesList;
