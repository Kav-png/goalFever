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
      <View style={{ marginHorizontal: 5 }}>
        {sortedData || sortedByAgeData ? (
          sortedOrder()
        ) : (
          <View style={{}}>
            <FlatList
              data={uniqueData.slice(0, 40)}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <SearchCard item={item} />}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default SearchResults;
