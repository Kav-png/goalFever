import { View, ScrollView } from "react-native";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";

import Welcome from "../../components/home/welcome/Welcome";
import LiveMatches from "../../components/home/livematches/LiveMatches";
import RecentMatches from "../../components/home/recentmatches/RecentMatches";

/* The `Home` renders the home screen and assigns query client */
const Home = () => {
  const queryClient = new QueryClient();
  const queryClient2 = new QueryClient();

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 10 }}>
          <SafeAreaView>
            <QueryClientProvider client={queryClient}>
              <Welcome />
              <LiveMatches />
            </QueryClientProvider>
          </SafeAreaView>
          <QueryClientProvider client={queryClient2}>
            <RecentMatches />
          </QueryClientProvider>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
