import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import useNearbyPlaces from "../../hook/useNearbyPlaces";
import MapsSearchScreen from "./MapsSearchScreen";
import ViewOfMap from "./ViewOfMap";
import AutocompleteSearch from "./components/AutocompleteSearch";

// displays the map and the search bar and search screen
// fetches data from the api and displays it on the map
// params: none

const MapsContainer = () => {
  const [showContentA, setShowContentA] = useState(false);
  const [internalError, setInternalError] = useState(false);

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
        setInternalError("Permission to access location was denied");
      }
    } catch (error) {
      setInternalError("Error getting location:", error);
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
      {internalError ? <Text>{internalError}</Text> : null}
      {error ? <Text>{error}</Text> : null}
      {isLoading ? (
        <Text>Loading...</Text>
      ) : showContentA ? (
        <ViewOfMap
          onPress={toggleContent}
          isActive={showContentA}
          data={data}
          isLoading={isLoading}
          error={error}
          refetch={refetch}
          handleGetLocation={handleGetLocation}
        />
      ) : (
        <MapsSearchScreen
          onPress={toggleContent}
          isActive={showContentA}
          data={data}
          isLoading={isLoading}
          error={error}
          refetch={refetch}
          handleGetLocation={handleGetLocation}
        />
      )}
    </View>
  );
};

export default MapsContainer;
