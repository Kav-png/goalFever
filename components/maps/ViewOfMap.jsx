import React, { useRef, useState } from "react";
import { View, Text, Platform } from "react-native";
import MapView from "react-native-maps";
import MapMarker from "./MapMarker";
import { useNavigation } from "expo-router";

const ViewOfMap = () => {
  const londonLocations = [
    { latitude: 51.5074, longitude: -0.1278 }, // London city center
    { latitude: 51.5282, longitude: -0.0836 }, // Shoreditch
    { latitude: 51.4657, longitude: -0.1621 }, // Chelsea
    { latitude: 51.5072, longitude: -0.1276 }, // Westminster
    { latitude: 51.5079, longitude: -0.0877 }, // Tower Bridge
    { latitude: 51.522, longitude: -0.1113 }, // King's Cross
    { latitude: 51.4975, longitude: -0.1357 }, // Covent Garden
    { latitude: 51.5224, longitude: -0.0931 }, // St. Paul's Cathedral
    { latitude: 51.5123, longitude: -0.0907 }, // The Shard
    { latitude: 51.4951, longitude: -0.1421 }, // Buckingham Palace
  ];

  const [activeIndex, setActiveIndex] = useState(-1);
  const mapRef = (useRef < MapView) | (null > null);
  const navigation = useNavigation();

  const handleMarkerPress = (index) => {
    if (Platform.OS === "ios") {
      setTimeout(() => {
        mapRef.current?.animateCamera({
          center: { latitude: index.latitude, longitude: index.longitude },
        });
      }, 100);

      setActiveIndex(index);
      //   navigation.setOptions({ tabBarStyle: { display: "none" } });
    }
  };

  return (
    <View>
      <MapView style={{ height: "100%", width: "100%" }}>
        {londonLocations.map((i, index) => (
          <MapMarker
            lat={i.latitude}
            long={i.longitude}
            onPress={() => handleMarkerPress(index)}
            color={activeIndex === index ? "#399bc6" : "#49c03f"}
            key={index}
          />
        ))}
      </MapView>
      {/* {activeIndex > -1 && (
        <>
          {Platform.OS === "ios" && (
            <TouchableOpacity style={styles.exit} onPress={unFocusProperty}>
              <MaterialCommunityIcons
                name="close"
                color={theme["color-primary-500"]}
                size={24}
              />
            </TouchableOpacity>
          )}
          // TODO: Place Card have, preferably a card relating to information on the club, and from google map  find an expo route that takes them to the cluib information where they can see the recent informations about events and etc
        </>
      )} */}
    </View>
  );
};

export default ViewOfMap;
