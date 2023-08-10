import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MapsSearchScreen from "./MapsSearchScreen";
import ViewOfMap from "./ViewOfMap";
import ToggleSwitch from "./ToggleSwitch";

const MapsContainer = () => {
  const [showContentA, setShowContentA] = useState(true);

  const toggleContent = () => {
    setShowContentA(!showContentA);
  };

  return (
    <View style={{ flex: 1 }}>
      {showContentA ? (
        <MapsSearchScreen onPress={toggleContent} isActive={showContentA} />
      ) : (
        <ViewOfMap onPress={toggleContent} isActive={showContentA} />
      )}
    </View>
  );
};

export default MapsContainer;
