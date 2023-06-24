import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";

import Welcome from "../../components/home/welcome/Welcome";
import LiveMatches from "../../components/home/livematches/LiveMatches";
import UpcomingMatches from "../../components/home/upcomingmatches/UpcomingMatches";

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
            <UpcomingMatches />
          </View>
        </ScrollView>
      </QueryClientProvider>
    </View>
  );
};

export default Home;

// Home structure --------------------------------
//  - Home.jsx
// TODO: - Welcome.jsx
//         - Should Contain Search Bar and filter buttons for the data
//         - SearchBar.jsx
//         - FilterButtons.jsx
//         - SearchResults.jsx (routing)
//         - FilterResults.jsx (routing)
// TODO: - LiveMatches.jsx
//         - Live Matches Heading
//         - Live Matches Cards
//         - Live Matches Cards Details (routing)
//         - LiveMatchCard.jsx
//         - LiveMatchCardDetails.jsx (routing)
// TODO: - UpcomingMatches.jsx
//         - UpcomingMatchesHeading
//         - UpcomingMatches Cards
//         - UpcomingMatches Cards Details (routing)
//         - UpcomingMatchCard.jsx
//         - UpcomingMatchCardDetails.jsx (routing)
