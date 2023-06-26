import { View, Text, FlatList } from "react-native";
import React from "react";
import UpcomingMatchesCard from "../cards/UpcomingMatchesCard";

const RecentMatchesListContainer = (data) => {
  return (
    <View>
      <FlatList
        data={data.slice(0, 10)}
        renderItem={({ item }) => {
          <UpcomingMatchesCard
            item={item}
            selectedMatch={1}
            handleCardPress={() => {}}
          />;
        }}
      />
    </View>
  );
};

export default RecentMatchesListContainer;
