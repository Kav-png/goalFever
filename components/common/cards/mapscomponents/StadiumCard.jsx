import { View, Text, StyleSheet } from "react-native";
import React from "react";

const StadiumCard = ({ item, selectedMatch, id }) => {
  return (
    <View style={styles.containerWrapper(selectedMatch, id)}>
      <View style={styles.attachedComponent}>
        <Text>StadiumCard</Text>
        <Text>{item}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerWrapper: (selectedMatch, id) => ({
    flexDirection: "row",
    marginBottom: 10,
    width: "100%",
    padding: 14,
    borderRadius: 16,
    ...{
      shadowColor: "#FFF",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    backgroundColor: selectedMatch === id ? "#312651" : "#FFF",
  }),
  container: {
    justifyContent: "space-around",
    flexDirection: "column",
    flex: 1,
  },
  logoContainer: (selectedMatch, id) => ({
    marginBottom: 10,
    width: 50,
    height: 50,
    backgroundColor: selectedMatch === id ? "#FFF" : "#F3F4F8",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  }),
  logoImage: {
    width: "70%",
    height: "70%",
  },
  scoreText: (selectedMatch, id) => ({
    fontSize: 10,
    fontFamily: "DMRegular",
    color: selectedMatch === id ? "#FAFAFC" : "#312651",
  }),
  stateOfMatch: (selectedMatch, id) => ({
    fontSize: 12,
    fontFamily: "DMBold",
    color: selectedMatch === id ? "#FAFAFC" : "#312651",
  }),
  stateOfMatchWrapper: {
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingHorizontal: 10,
    flex: 3,
  },
  teamName: (selectedMatch, id) => ({
    fontSize: 14,
    fontFamily: "DMBold",
    color: selectedMatch === id ? "#FAFAFC" : "#312651",
  }),
  location: {
    fontSize: 14,
    fontFamily: "DMRegular",
    color: "#B3AEC6",
  },
  logoLeagueContainer: (selectedMatch, id) => ({
    width: 30,
    height: 30,
    backgroundColor: selectedMatch === id ? "#FFF" : "#F3F4F8",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  }),
  attachedComponent: {
    // top: 100, // Adjust the top position as needed
    // left: 20, // Adjust the left position as needed
    // Add other styling properties for your attached component
    // For example:
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    elevation: 4,
  },
});

export default StadiumCard;
