import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useLocalSearchParams } from "expo-router";
import useFetch from "../../hook/useFetch";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const SearchDetails = () => {
  const { searchCurrentQuery } = useLocalSearchParams();

  const { data, isLoading, error, refetch } = useFetch(
    `${searchCurrentQuery}`,
    {}
  );

  useEffect(() => {
    // Fetch data whenever currentDate changes
    refetch();
  }, [searchCurrentQuery]);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fcffff" }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#fcffff" },
          headerShadowVisible: false,
          headerTitle: "",
        }}
      />
      <>
        <ScrollView
          showVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={"lightgrey"} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : data.data.length === 0 ? (
            <Text>No data</Text>
          ) : (
            <View style={{ padding: 10, paddingBottom: 100 }}>
              {console.log(data)}
            </View>
          )}
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

const SearchDetailsApp = () => {
  const queryClient3 = new QueryClient();
  return (
    <QueryClientProvider client={queryClient3}>
      <SearchDetails />
    </QueryClientProvider>
  );
};

export default SearchDetailsApp;
