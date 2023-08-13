import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React from "react";
import ToggleSwitch from "./ToggleSwitch";
import { StyleSheet } from "react-native";
import useFetchMaps from "../../hook/useFetchMaps";
import { useEffect } from "react";
import StadiumCard from "../common/cards/mapscomponents/StadiumCard";

const { width, height } = Dimensions.get("window");

const MapsSearchScreen = ({
  onPress,
  isActive,
  data,
  error,
  isLoading,
  refetch,
  handleGetLocation,
}) => {
  return (
    <View style={{ flex: 1, zIndex: 1 }}>
      <ScrollView contentContainerStyle={{ marginLeft: 10, marginTop: 60 }}>
        {isLoading ? (
          <ActivityIndicator size="large" colors="#312651" /> // Loading indicator for the data source
        ) : error ? (
          <Text>Something went wrong</Text> //  Something went wrong error message
        ) : (
          data?.map((item, index) => (
            <View
              style={styles.stadiumCardStyle}
              key={`${index}-${item.place_id}`}
            >
              <StadiumCard
                item={item}
                selectedMatch={0}
                id={item.place_id}
                index={index}
              />
            </View>
          ))
        )}
      </ScrollView>
      <View style={styles.toggleStyle}>
        <ToggleSwitch
          onPress={onPress}
          isActive={isActive}
          handleGetLocation={handleGetLocation}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleStyle: {
    position: "absolute",
    flexDirection: "column-reverse",
    top: height * 0.015,
    paddingLeft: width * 0.05,
    width: "45%",
  },
  stadiumCardStyle: {
    marginBottom: 10,
    width: "95%",
    alignSelf: "center",
  },
});

export default MapsSearchScreen;
