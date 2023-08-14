import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

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
                {data.data.attendance ? (
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
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  cardContainer: {
    position: "relative",
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    justifyContent: "center",
  },
  logoImage: {
    width: "70%",
    height: "70%",
  },
  leagueText: {
    fontSize: 16,
    fontFamily: "DMBold",
    color: "#312651",
  },
});

export default MoreInformation;
