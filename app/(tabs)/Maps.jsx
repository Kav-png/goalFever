import { View, Text } from "react-native";
import React from "react";
import ViewOfMap from "../../components/maps/ViewOfMap";

const Maps = () => {
  return (
    <View style={{ flex: 1, overflow: "hidden" }}>
      <ViewOfMap />
    </View>
  );
};

export default Maps;
