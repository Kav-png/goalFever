import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONT, SIZES } from "../../../constants";

// displays more information about the player or team
// depending on the type of data passed
// params: data, type
const MoreInformation = ({ data, type }) => {
  const switchFunction = () => {
    switch (type) {
      case "players":
        return (
          <View>
            {data.data?.preferred_foot ? (
              <TouchableOpacity
                style={[{ paddingHorizontal: 50 }, styles.cardContainer]}
              >
                <Text style={styles.leagueText}>
                  Preferred foot - {data.data.preferred_foot}
                </Text>
              </TouchableOpacity>
            ) : null}
            {data.data?.height_meters ? (
              <TouchableOpacity
                style={[{ paddingHorizontal: 50 }, styles.cardContainer]}
              >
                <Text style={styles.leagueText}>
                  Height - {data.data.height_meters}
                </Text>
              </TouchableOpacity>
            ) : null}
            {data.data?.shirt_number ? (
              <TouchableOpacity
                style={[{ paddingHorizontal: 50 }, styles.cardContainer]}
              >
                <Text style={styles.leagueText}>
                  Shirt number - {data.data.shirt_number}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        );
      case "teams":
        return (
          <View>
            {data.data?.venue ? (
              <View>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={[{ paddingHorizontal: 50 }, styles.cardContainer]}
                  >
                    <Text style={styles.leagueText}>
                      {data.data.venue.stadium?.en}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[{ paddingHorizontal: 50 }, styles.cardContainer]}
                  >
                    <Text style={styles.leagueText}>
                      {data.data.venue.city.en}
                    </Text>
                  </TouchableOpacity>
                </View>
                {data.data.venue.country_name?.en ? (
                  <TouchableOpacity
                    style={[{ paddingHorizontal: 50 }, styles.cardContainer]}
                  >
                    <Text style={styles.leagueText}>
                      {data.data.venue.country_name.en}
                    </Text>
                  </TouchableOpacity>
                ) : null}
                {data.data?.attendance ? (
                  <TouchableOpacity
                    style={[{ paddingHorizontal: 50 }, styles.cardContainer]}
                  >
                    <Text style={styles.leagueText}>
                      Attendance - {data.data.attendance}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            ) : null}
          </View>
        );
      default:
        break;
    }
  };
  return <View>{switchFunction()}</View>;
};
const styles = StyleSheet.create({
  logoLeagueContainer: {
    width: 70,
    height: 70,
    backgroundColor: "#FFF",
    borderRadius: SIZES.large,
    justifyContent: "center",
    alignItems: "center",
    margin: SIZES.xSmall,
  },
  cardContainer: {
    position: "relative",
    backgroundColor: COLORS.white,
    borderRadius: SIZES.xSmall,
    margin: SIZES.xSmall,
    padding: SIZES.xSmall,
    justifyContent: "center",
  },
  logoImage: {
    width: "70%",
    height: "70%",
  },
  leagueText: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    color: "#312651",
  },
});

export default MoreInformation;
