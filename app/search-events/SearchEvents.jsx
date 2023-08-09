import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import React, { useState } from "react";
import SearchBarQueryMain from "../../components/common/searchbar/SearchBarQueryMain";
import { Stack, useRouter } from "expo-router";
import fetchData from "../../hook/postViaAxiosData";
import { useEffect } from "react";
import { Button } from "react-native";
import SearchResults from "../../components/common/searchdetails/SearchResults";
import { dateFetch, dateFetchWordFormat } from "../../utils";
import RecentMatchesFilter from "../../components/common/recentmatchescomponents/RecentMatchesFilter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UpcomingMatchesCard from "../../components/common/cards/UpcomingMatchesCard";
import SearchEventsResult from "../../components/common/searchevents/SearchEventsResult";

const SearchEvents = () => {
  const dates = dateFetchWordFormat(); // ********************************

  const [indexOfDate, setIndexOfDate] = useState(0);
  const [activeTab, setActiveTab] = useState(dates[0]);

  const functionThatSavesOrBreaksMe = () => {
    switch (activeTab) {
      case dates[0]:
        return (
          <SearchEventsResult currentDate={dates[0]} index={indexOfDate} />
        );
      case dates[1]:
        return (
          <SearchEventsResult currentDate={dates[1]} index={indexOfDate} />
        );
      case dates[2]:
        return (
          <SearchEventsResult currentDate={dates[2]} index={indexOfDate} />
        );
      case dates[3]:
        return (
          <SearchEventsResult currentDate={dates[3]} index={indexOfDate} />
        );
      case dates[4]:
        return (
          <SearchEventsResult currentDate={dates[4]} index={indexOfDate} />
        );
      default:
        break;
    }
  };

  useEffect(() => {
    setIndexOfDate(dates.indexOf(activeTab));
  }, [activeTab]);
  return (
    <SafeAreaView style={{}}>
      <Stack.Screen
        options={{
          headerStyle: {},
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <>
        <View style={styles.container}>
          <RecentMatchesFilter
            dates={dates}
            // onPressRefresh={onPressRefresh}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          {functionThatSavesOrBreaksMe()}
        </View>
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    position: "absolute",
  },
});

const SearchEventsApp = () => {
  const queryClientSearchEvents = new QueryClient();
  return (
    <QueryClientProvider client={queryClientSearchEvents}>
      <SearchEvents />
    </QueryClientProvider>
  );
};

export default SearchEventsApp;
