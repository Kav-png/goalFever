import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import postFetch from "../../../hook/postFetch";

const SearchScreenTab = ({ searchSelected }) => {
  const { data, isLoading, error, refetch } = postFetch(`${searchSelected}`, {
    page: "1",
  });
  return (
    <View>
      <Text>searchScreenTab</Text>
      {isLoading ? (
        <ActivityIndicator size="large" colors="#312651" /> // Loading indicator for the data source
      ) : error ? (
        <Text>Something went wrong</Text> //  Something went wrong error message
      ) : (
        console.log(data)
      )}
    </View>
  );
};

export default SearchScreenTab;
