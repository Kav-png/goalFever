import { View, Text, FlatList } from "react-native";
import React from "react";
import SearchCard from "../cards/SearchCard";

const SearchResults = ({
  isLoading,
  error,
  sortedOrder,
  sortedByAgeData,
  sortedData,
  uniqueData,
}) => {
  return (
    <View>
      {isLoading ? <Text>Loading...</Text> : null}
      {error ? <Text>Error: {error}</Text> : null}
      <View style={{ marginHorizontal: 15 }}>
        {sortedData || sortedByAgeData ? (
          sortedOrder()
        ) : (
          <FlatList
            data={uniqueData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <SearchCard item={item} />}
          />
        )}
      </View>
    </View>
  );
};

export default SearchResults;
