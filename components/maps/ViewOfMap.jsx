import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView from "react-native-maps";
import { COLORS, SIZES } from "../../constants";
import StadiumCard from "../common/cards/mapscomponents/StadiumCard";
import MapMarker from "./MapMarker";
import ToggleSwitch from "./ToggleSwitch";

const { width, height } = Dimensions.get("window");

// displays the map with the markers
// also displays the stadium card when a marker is pressed
// also displays the toggle switch to switch between map and list view
// also displays the exit button to exit the stadium card
// params: onPress, isActive, data, error, isLoading, refetch, handleGetLocation
const ViewOfMap = ({
  onPress,
  isActive,
  data,
  error,
  isLoading,
  refetch,
  handleGetLocation,
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const mapRef = useRef(null);

  const handleMarkerPress = (index) => {
    if (Platform.OS === "ios") {
      const selectedMarker = data[index];
      mapRef.current?.animateToRegion({
        latitude: selectedMarker.lat,
        longitude: selectedMarker.lon,
        latitudeDelta: 0.2, // Adjust the zoom level as needed
        longitudeDelta: 0.2, // Adjust the zoom level as needed
      });

      setActiveIndex(index);
    }
  };

  const unFocusProperty = () => {
    setActiveIndex(-1);
  };

  return (
    <View style={{ flex: 1, overflow: "hidden" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <MapView style={{ height: "100%", width: "100%" }} ref={mapRef}>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text>No stadiums found, {error}</Text>
          ) : (
            data?.map((i, index) => (
              <MapMarker
                lat={i.lat}
                long={i.lon}
                onPress={() => handleMarkerPress(index)}
                color={activeIndex === index ? "#399bc6" : "#49c03f"}
                key={index}
              />
            ))
          )}
        </MapView>
        <>
          <View style={styles.toggleStyle}>
            <ToggleSwitch
              onPress={onPress}
              isActive={isActive}
              handleGetLocation={handleGetLocation}
            />
          </View>
        </>
        {activeIndex > -1 && (
          <>
            {Platform.OS === "ios" && (
              <TouchableOpacity style={styles.exit} onPress={unFocusProperty}>
                <Entypo
                  name="cross"
                  size={30}
                  color="black"
                  style={{ padding: 1 }}
                  onPress={unFocusProperty}
                />
              </TouchableOpacity>
            )}
            <View style={styles.stadiumCardStyle}>
              <StadiumCard
                item={data[activeIndex]}
                selectedMatch={0}
                id={data[activeIndex].place_id}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  exit: {
    position: "absolute",
    top: height * 0.015,
    left: width * 0.87,
    width: "7.5%",
    height: "3.75%",
    borderRadius: SIZES.large,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  attachedComponent: {
    position: "absolute",
    top: SIZES.large, // Adjust the top position as needed
    left: SIZES.large, // Adjust the left position as needed
    // Add other styling properties for your attached component
    // For example:
    backgroundColor: COLORS.white,
    padding: SIZES.xSmall,
    borderRadius: SIZES.x3Small,
    elevation: SIZES.x4Small,
  },
  stadiumCardStyle: {
    flexDirection: "column-reverse",
    top: height * 0.24,
    paddingLeft: width * 0.05,
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
  },
  toggleStyle: {
    flexDirection: "column-reverse",
    top: height * 0.795,
    paddingRight: width * 0.12,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ViewOfMap;
