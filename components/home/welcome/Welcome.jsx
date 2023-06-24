import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Welcome = () => {
  return (
    <View>
      <Text style={styles.welcomeMessage}>Welcome</Text>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  welcomeMessage: {
    fontFamily: "DMRegular",
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
});

export default Welcome;
