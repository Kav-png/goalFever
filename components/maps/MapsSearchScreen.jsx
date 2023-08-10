import { View, Text, Dimensions } from "react-native";
import React from "react";
import ToggleSwitch from "./ToggleSwitch";
import { StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const MapsSearchScreen = ({ onPress, isActive }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Maps Search Screen</Text>
      </View>
      <View style={styles.toggleStyle}>
        <ToggleSwitch onPress={onPress} isActive={isActive} />
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
});

export default MapsSearchScreen;
