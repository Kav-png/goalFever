// import React, { useRef, useState } from "react";
// import {
//   View,
//   Text,
//   Platform,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   SafeAreaView,
// } from "react-native";
// import MapView from "react-native-maps";
// import MapMarker from "./MapMarker";
// import { useNavigation } from "expo-router";
// import { Feather, Entypo } from "@expo/vector-icons";
// import StadiumCard from "../common/cards/mapscomponents/StadiumCard";
// import ToggleSwitch from "./ToggleSwitch";
// import { ActivityIndicator } from "react-native";
// const { width, height } = Dimensions.get("window");
// const ViewOfMap = ({ onPress, isActive, data, error, isLoading, refetch }) => {
//   const [activeIndex, setActiveIndex] = useState(-1);
//   const mapRef = (useRef < MapView) | (null > null);
//   const navigation = useNavigation();

//   const handleMarkerPress = (index) => {
//     if (Platform.OS === "ios") {
//       setTimeout(() => {
//         mapRef.current?.animateCamera({
//           center: { latitude: index.latitude, longitude: index.longitude },
//         });
//       }, 100);

//       setActiveIndex(index);
//       //   navigation.setOptions({ tabBarStyle: { display: "none" } });
//     }
//   };

//   const unFocusProperty = () => {
//     setActiveIndex(-1);
//     // navigation.setOptions({ tabBarStyle: { display: "flex" } });
//   };

//   // position cross at centre of screen

//   return (
//     <View style={{ flex: 1, overflow: "hidden" }}>
//       <SafeAreaView style={{ flex: 1 }}>
//         <MapView style={{ height: "100%", width: "100%" }}>
//           {error ? (
//             <Text>No stadiums found</Text> //  Something went wrong error message
//           ) : (
//             data?.map((i, index) => (
//               <MapMarker
//                 lat={i.lat}
//                 long={i.lon}
//                 onPress={() => handleMarkerPress(index)}
//                 color={activeIndex === index ? "#399bc6" : "#49c03f"}
//                 key={index}
//               />
//             ))
//           )}
//         </MapView>
// <>
//   <View style={styles.toggleStyle}>
//     <ToggleSwitch onPress={onPress} isActive={isActive} />
//   </View>
// </>
// {activeIndex > -1 && (
//   <>
//     {Platform.OS === "ios" && (
//       <TouchableOpacity style={styles.exit} onPress={unFocusProperty}>
//         <Entypo
//           name="cross"
//           size={30}
//           color="black"
//           style={{ padding: 1 }}
//           onPress={unFocusProperty}
//         />
//       </TouchableOpacity>
//     )}
//     <View style={styles.stadiumCardStyle}>
//       <StadiumCard
//         item={data[activeIndex]}
//         selectedMatch={0}
//         id={data[activeIndex].place_id}
//       />
//     </View>
//   </>
// )}
//       </SafeAreaView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   map: {
//     flex: 1,
//   },
//   exit: {
//     position: "absolute",
//     top: height * 0.015,
//     left: width * 0.87,
//     width: "7.5%",
//     height: "3.75%",
//     borderRadius: 20,
//     backgroundColor: "white",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   attachedComponent: {
//     position: "absolute",
//     top: 20, // Adjust the top position as needed
//     left: 20, // Adjust the left position as needed
//     // Add other styling properties for your attached component
//     // For example:
//     backgroundColor: "white",
//     padding: 10,
//     borderRadius: 5,
//     elevation: 4,
//   },
//   stadiumCardStyle: {
//     flexDirection: "column-reverse",
//     top: height * 0.24,
//     paddingLeft: width * 0.05,
//     width: "95%",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   toggleStyle: {
//     flexDirection: "column-reverse",
//     top: height * 0.795,
//     paddingRight: width * 0.25,
//     width: "75%",
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });

// export default ViewOfMap;

// // TODO: Place Card have, preferably a card relating to information on the club, and from google map find an expo route that takes them to the cluib information where they can see the recent informations about events and etc

import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import MapView from "react-native-maps";
import MapMarker from "./MapMarker";
import { useNavigation } from "expo-router";
import { Feather, Entypo } from "@expo/vector-icons";
import StadiumCard from "../common/cards/mapscomponents/StadiumCard";
import ToggleSwitch from "./ToggleSwitch";
import { ActivityIndicator } from "react-native";

const { width, height } = Dimensions.get("window");

const ViewOfMap = ({ onPress, isActive, data, error, isLoading, refetch }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const mapRef = useRef(null);
  const navigation = useNavigation();

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

  const handleRegionChangeComplete = (region) => {
    // You can use the region object to update the map's current position if needed
  };

  const unFocusProperty = () => {
    setActiveIndex(-1);
  };

  return (
    <View style={{ flex: 1, overflow: "hidden" }}>
      <SafeAreaView style={{ flex: 1 }}>
        <MapView
          style={{ height: "100%", width: "100%" }}
          ref={mapRef}
          onRegionChangeComplete={handleRegionChangeComplete}
        >
          {error ? (
            <Text>No stadiums found</Text>
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
            <ToggleSwitch onPress={onPress} isActive={isActive} />
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
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  attachedComponent: {
    position: "absolute",
    top: 20, // Adjust the top position as needed
    left: 20, // Adjust the left position as needed
    // Add other styling properties for your attached component
    // For example:
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    elevation: 4,
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
    paddingRight: width * 0.25,
    width: "75%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ViewOfMap;
