import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import ViewOfMap from "../../components/maps/ViewOfMap";
import MapsContainer from "../../components/maps/MapsContainer";

const Maps = () => {
  return (
    <SafeAreaView style={{ flex: 1, overflow: "hidden" }}>
      <MapsContainer />
    </SafeAreaView>
  );
};

export default Maps;
