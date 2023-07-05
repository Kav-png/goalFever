import { View, Text, ScrollView } from "react-native";
import React from "react";
import NewsHeading from "../../components/news/NewsHeading";
import NewsList from "../../components/news/NewsList";
import { SafeAreaView } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NewsContent from "../../components/news/NewsContent";

const News = () => {
  const queryClient3 = new QueryClient();
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: 10 }}>
          <SafeAreaView>
            {/* <NewsHeading /> */}
            <QueryClientProvider client={queryClient3}>
              {/* <NewsContent /> */}
            </QueryClientProvider>
          </SafeAreaView>
        </View>
      </ScrollView>
    </View>
  );
};

export default News;

// Starting News Build
//   - News Card
// TODO:  - Fetch Data from new API
//   - Redirect to page
// Turn into all sports news page worse come worst
//
