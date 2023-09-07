import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FONT, SIZES } from "../../../constants";

// Displays the Details of an event taking item as a prop and handles routing
const EventDetailsMainTop = ({ item }) => {
  const id = item?.id;
  const router = useRouter();
  const selectedMatch = 0;

  const handleCardPressTeamHome = () => {
    const teamId = item?.home_team?.id;
    const teamName = item?.home_team?.name;
    return router.push({
      pathname: `/team-details/${teamId}`,
      params: { teamId: teamId, teamName: teamName },
    });
  };

  const handleCardPressTeamAway = () => {
    const teamId = item?.away_team?.id;
    const teamName = item?.away_team?.name;
    return router.push({
      pathname: `/team-details/${teamId}`,
      params: { teamId: teamId, teamName: teamName },
    });
  };

  return (
    <View>
      <View style={styles.containerWrapper(selectedMatch, id)}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.logoContainer(selectedMatch, id)}
            onPress={() => handleCardPressTeamHome()}
          >
            <Image
              source={{
                uri: item.home_score?.has_logo
                  ? "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg"
                  : item.home_team?.logo,
              }}
              resizeMode="contain"
              style={styles.logoImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.logoContainer(selectedMatch, id)}
            onPress={() => handleCardPressTeamAway()}
          >
            <Image
              source={{
                uri: item.away_score?.has_logo
                  ? "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg"
                  : item.away_team?.logo,
              }}
              resizeMode="contain"
              style={styles.logoImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          {item.home_team?.name?.length > 18 ? (
            <Text style={styles.teamName(selectedMatch, id)}>
              {item.home_team?.name?.substring(0, 18)}...
            </Text>
          ) : (
            <Text style={styles.teamName(selectedMatch, id)}>
              {item.home_team?.name}
            </Text>
          )}
          {item.away_team.name.length > 18 ? (
            <Text style={styles.teamName(selectedMatch, id)}>
              {item.away_team.name?.substring(0, 18)}...
            </Text>
          ) : (
            <Text style={styles.teamName(selectedMatch, id)}>
              {item.away_team?.name}
            </Text>
          )}
        </View>
        <View style={styles.stateOfMatchWrapper}>
          <Text style={styles.stateOfMatch(selectedMatch, id)}>
            {item.status === "finished" || item.status === "inprogress"
              ? item.status.charAt(0).toUpperCase() + item.status.slice(1)
              : item.start_at.substring(11, 19)}
          </Text>
          <View>
            {item.status === "inprogress" ? (
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.scoreText(selectedMatch, id)}>
                  {item.home_score?.display}
                </Text>
                <Text style={styles.scoreText(selectedMatch, id)}>-</Text>
                <Text style={styles.scoreText(selectedMatch, id)}>
                  {item.away_score?.display}
                </Text>
              </View>
            ) : (
              <View></View>
            )}
            {item.status === "finished" ? (
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.scoreText(selectedMatch, id)}>
                  {item.home_score.display}
                </Text>
                <Text style={styles.scoreText(selectedMatch, id)}>-</Text>
                <Text style={styles.scoreText(selectedMatch, id)}>
                  {item.away_score.display}
                </Text>
              </View>
            ) : (
              <View></View>
            )}
          </View>
          <View
            style={{
              ...styles.container,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text style={styles.teamName(selectedMatch, id)}>
                {item.league?.name}
              </Text>
            </View>
          </View>
          <Text style={styles.stateOfMatch(selectedMatch, id)}>
            {item.section?.name}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerWrapper: (selectedMatch, id) => ({
    flexDirection: "row",
    marginBottom: SIZES.xSmall,
    width: "100%",
    height: 150,
    padding: SIZES.medium,
    backgroundColor: selectedMatch === id ? "#312651" : "#FFF",
    position: "relative",
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
    paddingHorizontal: SIZES.xSmall,
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
});

export default EventDetailsMainTop;
