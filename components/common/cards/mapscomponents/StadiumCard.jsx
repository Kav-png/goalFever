import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GetTeamsByStadium from "../../../maps/components/GetTeamsbyStadium";
import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";

/* `StadiumCard` displays information about the locations of stadiums */
const StadiumCard = ({ item, selectedMatch, id }) => {
  const [moreInformation, setMoreInformation] = useState(false);
  const [isMoreInformationAvailable, setIsMoreInformationAvailable] =
    useState(true);
  return (
    <View style={styles.containerWrapper(selectedMatch, id)}>
      <View style={styles.attachedComponent}>
        <Text style={styles.nameHeader}>{item?.name}</Text>
        <Text>{(item?.distance / 1000).toFixed(2)} km away</Text>
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
        ) : isMoreInformationAvailable ? null : (
          <Text>More information not Available</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerWrapper: (selectedMatch, id) => ({
    flexDirection: "row",
    width: "95%",
    padding: SIZES.xSmall,
    borderRadius: SIZES.medium,
    ...SHADOWS.small,
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
    marginBottom: SIZES.xSmall,
    width: 50,
    height: 50,
    backgroundColor: selectedMatch === id ? "#FFF" : "#F3F4F8",
    borderRadius: SIZES.large,
    justifyContent: "center",
    alignItems: "center",
  }),
  logoImage: {
    width: "70%",
    height: "70%",
  },
  scoreText: (selectedMatch, id) => ({
    fontSize: SIZES.xSmall,
    fontFamily: FONT.regular,
    color: selectedMatch === id ? "#FAFAFC" : "#312651",
  }),
  stateOfMatch: (selectedMatch, id) => ({
    fontSize: SIZES.small,
    fontFamily: FONT.bold,
    color: selectedMatch === id ? "#FAFAFC" : "#312651",
  }),
  stateOfMatchWrapper: {
    justifyContent: "space-around",
    alignItems: "flex-end",
    flex: 3,
  },
  teamName: (selectedMatch, id) => ({
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    color: selectedMatch === id ? "#FAFAFC" : "#312651",
  }),
  location: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
  logoLeagueContainer: (selectedMatch, id) => ({
    width: SIZES.x2Large,
    height: SIZES.x2Large,
    backgroundColor: selectedMatch === id ? "#FFF" : "#F3F4F8",
    borderRadius: SIZES.large,
    justifyContent: "center",
    alignItems: "center",
  }),
  attachedComponent: {
    backgroundColor: COLORS.white,
    padding: SIZES.xSmall,
    borderRadius: SIZES.x3Small,
    elevation: SIZES.x4Small,
    width: "90%",
  },
  applyBtn: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    height: SIZES.x2Large,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  applyBtnText: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  containerMoreInformation: {
    padding: SIZES.x4Small,
    backgroundColor: "#FFF",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  applyBtnMoreInformation: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    height: SIZES.x2Large,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: COLORS.gray,
    justifyContent: "center",
    alignItems: "center",
  },
  applyBtnTextMoreInformation: {
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
});

export default StadiumCard;
