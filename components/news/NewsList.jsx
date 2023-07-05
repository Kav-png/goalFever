import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import NewsListCard from "./NewsListCard";
import useFetchNews from "../../hook/useFetchNews";

const NewsList = ({ league }) => {
  const { data, isLoading, error, refetch } = useFetchNews(`${league}`, {});
  // const data = [0, 1, 2, 3, 4, 5, 6, 7];
  // fetch data from api
  useEffect(() => {
    refetch();
  }, [league]);
  return (
    <View>
      {/* Pass data using data.map to fetch news */}
      {isLoading ? (
        <ActivityIndicator size="large" colors="#312651" /> // Loading indicator for the data source
      ) : error ? (
        <Text>Something went wrong</Text> //  Something went wrong error message
      ) : (
        data.map((item, index) => <NewsListCard key={index} data={item} />)
      )}
    </View>
  );
};

export default NewsList;
