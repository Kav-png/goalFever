import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import NewsFooter from "../../../news/NewsFooter";
import PhoneCallButton from "./PhoneCallButton";
import { useState } from "react";
import GetTeamsByStadium from "../../../maps/components/GetTeamsbyStadium";

const StadiumCard = ({ item, selectedMatch, id }) => {
  const [moreInformation, setMoreInformation] = useState(false);
  const [isMoreInformationAvailable, setIsMoreInformationAvailable] =
    useState(false);
  return (
    <View style={styles.containerWrapper(selectedMatch, id)}>
      <View style={styles.attachedComponent}>
        <Text style={styles.nameHeader}>{item?.name}</Text>
        <Text>{item?.distance} m away</Text>
        <View style={styles.containerMoreInformation}>
          <TouchableOpacity
            style={styles.applyBtnMoreInformation}
            onPress={() => setMoreInformation(!moreInformation)}
          >
            <Text style={styles.applyBtnTextMoreInformation}>
              More Information
            </Text>
          </TouchableOpacity>
        </View>
        {moreInformation ? (
          <View>
            <GetTeamsByStadium
              address={item.address.name}
              setIsMoreInformationAvailable={setIsMoreInformationAvailable}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerWrapper: (selectedMatch, id) => ({
    flexDirection: "row",
    width: "95%",
    padding: 10,
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
    justifyContent: "center",
    alignItems: "center",
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
    width: "90%",
  },
  applyBtn: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "grey",
  },
  applyBtnText: {
    fontSize: 15,
    color: "grey",
  },
  containerMoreInformation: {
    padding: 4,
    backgroundColor: "#FFF",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  applyBtnMoreInformation: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    height: 30,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },
  applyBtnTextMoreInformation: {
    fontSize: 15,
    color: "grey",
  },
});

export default StadiumCard;
