import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import ViewOfMap from "../../components/maps/ViewOfMap";
import MapsContainer from "../../components/maps/MapsContainer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Maps = () => {
  const queryClientMaps = new QueryClient();
  return (
    <QueryClientProvider client={queryClientMaps}>
      <SafeAreaView style={{ flex: 1, overflow: "hidden" }}>
        <MapsContainer />
      </SafeAreaView>
    </QueryClientProvider>
  );
};

export default Maps;
