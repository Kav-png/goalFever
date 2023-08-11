import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import GetTeamsByStadium from "./components/GetTeamsbyStadium";
import { useState } from "react";

const MoreInformationStadiumCard = ({ address }) => {
  const [moreInformation, setMoreInformation] = useState(false);
  const [isMoreInformationAvailable, setIsMoreInformationAvailable] =
    useState(false);

  return (
    <View style={styles.containerMoreInformation}>
      <TouchableOpacity
        style={styles.applyBtnMoreInformation}
        onPress={setMoreInformation(!moreInformation)}
      >
        <Text style={styles.applyBtnTextMoreInformation}>More Information</Text>
      </TouchableOpacity>
      {moreInformation ? (
        <View>
          <GetTeamsByStadium
            address={address}
            setIsMoreInformationAvailable={setIsMoreInformationAvailable}
          />
          {isMoreInformationAvailable ? (
            <Text>More Information</Text>
          ) : (
            <Text>More Information Not Available</Text>
          )}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
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
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "grey",
  },
  applyBtnTextMoreInformation: {
    fontSize: 15,
    color: "grey",
  },
});

export default MoreInformationStadiumCard;
