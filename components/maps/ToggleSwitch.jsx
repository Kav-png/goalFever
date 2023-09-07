import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES } from "../../constants";

// displays a toggle switch to switch between map and list view
// params: onPress, isActive, handleGetLocation
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
    height: SIZES.x2Large,
    borderRadius: SIZES.medium,
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
    width: SIZES.x26Large,
    height: SIZES.x26Large,
    borderRadius: SIZES.small,
    backgroundColor: "#ccc",
  },
  toggleActive: {
    backgroundColor: "#fff",
  },
  textContainer: {
    paddingHorizontal: SIZES.xSmall,
    borderRadius: SIZES.large,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ToggleSwitch;
