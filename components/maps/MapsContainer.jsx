import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MapsSearchScreen from "./MapsSearchScreen";
import ViewOfMap from "./ViewOfMap";
import ToggleSwitch from "./ToggleSwitch";
import useFetchMaps from "../../hook/useFetchMaps";
// import GetTeamsByStadium from "./GetTeamsByStadium";
import SearchBarQueryMain from "../common/searchbar/SearchBarQueryMain";

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

  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [searchPhraseSubmitted, setSearchPhraseSubmitted] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <SearchBarQueryMain
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
        setSearchPhraseSubmitted={setSearchPhraseSubmitted}
        searchPhraseSubmitted={searchPhraseSubmitted}
      />
      {showContentA ? (
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
      )}
      {/* <GetTeamsByStadium /> */}
    </View>
  );
};

export default MapsContainer;
