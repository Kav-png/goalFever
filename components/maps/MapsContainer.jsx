import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MapsSearchScreen from "./MapsSearchScreen";
import ViewOfMap from "./ViewOfMap";
import ToggleSwitch from "./ToggleSwitch";
import useFetchMaps from "../../hook/useFetchMaps";
import GetTeamsByStadium from "./GetTeamsByStadium";

const MapsContainer = () => {
  //   const [showContentA, setShowContentA] = useState(true);

  //   const toggleContent = () => {
  //     setShowContentA(!showContentA);
  //   };

  //   const { data, isLoading, error, refetch } = useFetchMaps({
  //     location: "51.481688,-0.190973",
  //     type: "stadium",
  //     radius: 10000,
  //   });

  //   function extractTeamNameFromURL(url) {
  //     const urlWithoutProtocol = url.replace(/^(https?:\/\/)?(www\.)?/, ""); // Remove protocol and "www"
  //     const parts = urlWithoutProtocol.split("."); // Split by "."
  //     const teamName = parts[0]; // The team name is the first part before the domain
  //     return teamName;
  //   }

  //   // Example usage:
  //   const urls = [
  //     "https://www.chelseafc.com/en",
  //     "https://www.arsenal.com/the-club/emirates-stadium",
  //     "https://www.liverpoolfc.com/fans/fan-experience/visiting-anfield",
  //   ];

  //   const teamNames = urls.map((url) => extractTeamNameFromURL(url));
  //   console.log(teamNames);
  //   // Output: ["chelseafc", "arsenal", "liverpoolfc"]

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
      <GetTeamsByStadium />
    </View>
  );
};

export default MapsContainer;
