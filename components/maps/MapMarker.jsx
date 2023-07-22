import { View, Text } from "react-native";
import React from "react";
import { Marker } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MapMarker = ({ lat, long, onPress, color }) => {
  return (
    <Marker coordinate={{ latitude: lat, longitude: long }} onPress={onPress}>
      <FontAwesome name="map-marker" size={32} color={color} />
    </Marker>
  );
};

export default MapMarker;
