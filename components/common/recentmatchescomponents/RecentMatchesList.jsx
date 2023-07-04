import { View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import RecentMatchesListContainer from "./RecentMatchesListContainer";
import { dateFetch } from "../../../utils";
import RecentMatchesFilter from "./RecentMatchesFilter";

const RecentMatchesList = () => {
  const dates = dateFetch(); // ********************************

  const [activeTab, setActiveTab] = useState(dates[0]);

  const functionThatSavesOrBreaksMe = () => {
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
        // onPressRefresh={onPressRefresh}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {functionThatSavesOrBreaksMe()}
    </View>
  );
};

export default RecentMatchesList;
