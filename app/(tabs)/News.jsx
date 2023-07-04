import { View, Text } from "react-native";
import React from "react";
import NewsHeading from "../../components/news/NewsHeading";
import NewsList from "../../components/news/NewsList";

const News = () => {
  return (
    <View>
      <NewsHeading />
      <NewsList />
    </View>
  );
};

export default News;

// Starting News Build
//   - News Card
// TODO:  - Fetch Data from new API
//   - Redirect to page
