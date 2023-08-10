import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MapsSearchScreen from "./MapsSearchScreen";
import ViewOfMap from "./ViewOfMap";
import ToggleSwitch from "./ToggleSwitch";
import useFetchMaps from "../../hook/useFetchMaps";

const MapsContainer = () => {
  const [showContentA, setShowContentA] = useState(true);

  const toggleContent = () => {
    setShowContentA(!showContentA);
  };

  const { data, isLoading, error, refetch } = useFetchMaps({
    location: "51.481688,-0.190973",
    type: "stadium",
    radius: 10000,
  });

  function extractTeamNameFromURL(url) {
    const urlParts = url.split("/");
    const teamName = urlParts[3]; // The team name is at the 4th part of the URL
    return teamName;
  }

  // Example usage:
  const url = "https://www.chelseafc.com/en";
  const teamName = extractTeamNameFromURL(url);
  console.log(teamName); // Output: "chelseafc"

  return (
    <View style={{ flex: 1 }}>
      {/* {showContentA ? (
        <MapsSearchScreen
          onPress={toggleContent}
          isActive={showContentA}
          data={data}
          isLoading={isLoading}
          error={error}
          refetch={refetch}
        />
      ) : (
        <ViewOfMap
          onPress={toggleContent}
          isActive={showContentA}
          data={data}
          isLoading={isLoading}
          error={error}
          refetch={refetch}
        />
      )} */}
    </View>
  );
};

export default MapsContainer;
