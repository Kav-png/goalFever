import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useCallback, useState } from "react";
import { useRouter } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";

import Welcome from "../../components/home/welcome/Welcome";
import LiveMatches from "../../components/home/livematches/LiveMatches";
import RecentMatches from "../../components/home/recentmatches/RecentMatches";

const Home = () => {
  const router = useRouter();
  const queryClient = new QueryClient();

  return (
    <View>
      <QueryClientProvider client={queryClient}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, padding: 10 }}>
            <SafeAreaView>
              <Welcome />
              <LiveMatches />
            </SafeAreaView>
            <RecentMatches />
          </View>
        </ScrollView>
      </QueryClientProvider>
    </View>
  );
};

export default Home;

// Home structure --------------------------------
//  - Home.jsx
// *   - Welcome.jsx
//         - Should Contain Search Bar and filter buttons for the data
// *         - SearchBar.jsx
//  TODO: 1  - FilterButtons.jsx
//         - SearchResults.jsx (routing)
//         - FilterResults.jsx (routing)
// * - LiveMatches.jsx
//  *      - Live Matches Heading
// *       - Live Matches Cards
//         - Live Matches Cards Details (routing)
// *        - LiveMatchCard.jsx
//         - LiveMatchCardDetails.jsx (routing)
// * - UpcomingMatches.jsx
//  *       - UpcomingMatchesHeading
//  *       - UpcomingMatches Cards
//         - UpcomingMatches Cards Details (routing)
//  *       - UpcomingMatchCard.jsx
//         - UpcomingMatchCardDetails.jsx (routing)
// TODO: 2 Fetch Data from API
