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

const MapsContainer = () => {
  const [showContentA, setShowContentA] = useState(false);

  const [currentLocation, setCurrentLocation] = useState([
    51.5086905952269, -0.11864778959789828,
  ]);

  const toggleContent = () => {
    setShowContentA(!showContentA);
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
      {/* <GetTeamsByStadium /> */}
      {/* <MapsData /> */}
    </View>
  );
};

export default MapsContainer;
