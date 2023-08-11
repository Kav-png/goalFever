import React from "react";
import { View, Text } from "react-native";
import useNearbyPlaces from "../../hook/useNearbyPlaces";
import GetTeamsByStadium from "./components/GetTeamsbyStadium";
// Adjust the import path

const MapsData = ({ searchPhrase }) => {
  const {
    data: poiData,
    isLoading,
    error,
  } = useNearbyPlaces(51.5086905952269, -0.11864778959789828, "stadium", 50000);
  if (isLoading) {
    return <Text>Loading...</Text>;
  } else {
    console.log(poiData);
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  // when searchPhrase changes, run the useNearbyPlaces function and update the results that are displayed
  return (
    <View>
      {poiData.map((poi) => (
        <View>
          <Text style={{ backgroundColor: "green" }} key={poi.place_id}>
            {poi.name}
          </Text>
          <View style={{ backgroundColor: "red" }}>
            <GetTeamsByStadium address={poi.name} />
          </View>
        </View>
      ))}
    </View>
  );
};

export default MapsData;
