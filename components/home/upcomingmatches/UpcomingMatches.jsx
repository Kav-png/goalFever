import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import MaterialCardWithImageAndTitle1 from "../../MaterialCardWithImageAndTitle1";

function UpcomingMatches(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.upcomingMatches4}>Upcoming Matches</Text>
      <MaterialCardWithImageAndTitle1
        style={styles.materialCardWithImageAndTitle1}
      ></MaterialCardWithImageAndTitle1>
      <MaterialCardWithImageAndTitle1
        style={styles.materialCardWithImageAndTitle2}
      ></MaterialCardWithImageAndTitle1>
      <MaterialCardWithImageAndTitle1
        style={styles.materialCardWithImageAndTitle3}
      ></MaterialCardWithImageAndTitle1>
      <MaterialCardWithImageAndTitle1
        style={styles.materialCardWithImageAndTitle4}
      ></MaterialCardWithImageAndTitle1>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  upcomingMatches4: {
    fontFamily: "DMRegular",
    color: "#121212",
    fontSize: 20,
  },
  materialCardWithImageAndTitle1: {
    height: 88,
    width: 358,
    marginTop: 7,
  },
  materialCardWithImageAndTitle2: {
    height: 88,
    width: 358,
    marginTop: 10,
  },
  materialCardWithImageAndTitle3: {
    height: 88,
    width: 358,
    marginTop: 16,
  },
  materialCardWithImageAndTitle4: {
    height: 88,
    width: 358,
    marginTop: 16,
  },
});

export default UpcomingMatches;
