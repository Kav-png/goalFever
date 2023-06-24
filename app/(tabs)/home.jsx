import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaView } from "react-native-safe-area-context";

import Welcome from "../../components/home/welcome/Welcome";

const Home = () => {
  const router = useRouter();
  const queryClient = new QueryClient();

  return (
    <View>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1, padding: 16 }}>
              <Welcome />
            </View>
          </ScrollView>
        </SafeAreaView>
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
