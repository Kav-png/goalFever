import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MapsSearchScreen from "./MapsSearchScreen";
import ViewOfMap from "./ViewOfMap";
import ToggleSwitch from "./ToggleSwitch";
import useFetchMaps from "../../hook/useFetchMaps";
import SearchBarQueryMain from "../common/searchbar/SearchBarQueryMain";
import MapsData from "./MapsData";
import GetTeamsByStadium from "./components/GetTeamsbyStadium";
import useNearbyPlaces from "../../hook/useNearbyPlaces";
import AutocompleteSearch from "./components/AutocompleteSearch";
import * as Location from "expo-location";
import { Button } from "react-native";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const MapsContainer = () => {
  const [showContentA, setShowContentA] = useState(false);

  const [currentLocation, setCurrentLocation] = useState([
    51.5086905952269, -0.11864778959789828,
  ]);

  const toggleContent = () => {
    setShowContentA(!showContentA);
  };

  const handleGetLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        console.log("User location:", location.coords);
        setCurrentLocation([
          location.coords.latitude,
          location.coords.longitude,
        ]);
        // You can use the location data as needed
      } else {
        console.error("Permission to access location was denied");
      }
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  const { data, isLoading, error, refetch } = useNearbyPlaces(
    currentLocation[0],
    currentLocation[1],
    "stadium",
    50000
  );

  useEffect(() => {
    refetch();
  }, [currentLocation]);

  return (
    <View style={{ flex: 1 }}>
      <AutocompleteSearch setCurrentLocation={setCurrentLocation} />
      <View style={styles.useMyLocation}>
        <TouchableOpacity onPress={handleGetLocation}>
          <Text>Use My Location</Text>
        </TouchableOpacity>
      </View>
      {showContentA ? (
        <ViewOfMap
          onPress={toggleContent}
          isActive={showContentA}
          data={data}
          isLoading={isLoading}
          error={error}
          refetch={refetch}
        />
      ) : (
        <MapsSearchScreen
          onPress={toggleContent}
          isActive={showContentA}
          data={data}
          isLoading={isLoading}
          error={error}
          refetch={refetch}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  useMyLocation: {
    top: height * 0.07,
    marginLeft: width * 0.56,
    width: "45%",
    width: "30%",
    padding: 8,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 5,
    position: "absolute",
  },
});

export default MapsContainer;
