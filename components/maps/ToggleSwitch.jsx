import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");
const ToggleSwitch = ({ onPress, isActive, handleGetLocation }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        style={[
          styles.toggleContainer,
          isActive ? styles.toggleContainerActive : null,
        ]}
        onPress={onPress}
      >
        <View style={isActive ? styles.toggleActive : styles.toggle} />
      </TouchableOpacity>
      <View style={[{ marginLeft: 5 }, styles.textContainer]}>
        <Text>{isActive ? "Switch Map View" : "Switch List View"}</Text>
      </View>
      <View style={[{ marginLeft: 30 }, styles.textContainer]}>
        <TouchableOpacity onPress={handleGetLocation}>
          <Text>Use My Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    width: 50,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    paddingHorizontal: 2,
    backgroundColor: "#fff",
  },
  toggleContainerActive: {
    backgroundColor: "#007AFF",
  },
  toggle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#ccc",
  },
  toggleActive: {
    backgroundColor: "#fff",
  },
  textContainer: {
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ToggleSwitch;
