import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SIZES } from "../../constants";
import StadiumCard from "../common/cards/mapscomponents/StadiumCard";
import ToggleSwitch from "./ToggleSwitch";

const { width, height } = Dimensions.get("window");
// dispays the list of stadiums in the area
// the user can toggle between the list and the map
// the user can also get the current location
// params: onPress, isActive, data, error, isLoading, refetch, handleGetLocation
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
      <ScrollView
        contentContainerStyle={{ marginLeft: SIZES.xSmall, marginTop: 60 }}
      >
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
    marginBottom: SIZES.xSmall,
    width: "95%",
    alignSelf: "center",
  },
});

export default MapsSearchScreen;
