import { View, Text } from "react-native";
import React from "react";

const SearchEventsResult = ({
  isLoading,
  error,
  sortedOrder,
  sortedData,
  uniqueData,
}) => {
  return (
    <View>
      {isLoading ? <Text>Loading...</Text> : null}
      {error ? <Text>Error: {error}</Text> : null}
      <View style={{ marginHorizontal: 15 }}>
        {sortedData ? (
          sortedOrder()
        ) : (
          <FlatList
            data={uniqueData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <UpcomingMatchesCard
                item={item}
                handleCardPress={() => {}}
                activeTab={2020}
              />
            )}
          />
          // TODO: Change this function into an component (not a new one) but the old one but it switches between the two
        )}
      </View>
    </View>
  );
};

export default SearchEventsResult;
