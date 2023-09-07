import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONT, SHADOWS, SIZES } from "../../../constants/theme";

/* `LiveMatchesCard` displays graphically the live matches information */
const LiveMatchesCard = ({ item, selectedMatch }) => {
  const id = item?.id;
  const router = useRouter();

  /**
   * `handleCardPress` navigates to the event details page with the specified event ID.
   */
  const handleCardPress = () => {
    return router.push({
      pathname: `/event-details/${id}`,
      params: { eventId: id },
    });
  };

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

  const handleCardPressLeague = () => {
    const leaguesId = item?.league?.id;
    const leaguesName = item?.league?.name;
    return router.push({
      pathname: `/leagues-details/${id}`,
      params: { leaguesId: leaguesId, leaguesName: leaguesName },
    });
  };

  return (
    <TouchableOpacity
      style={styles.containerWrapper(selectedMatch, id)}
      onPress={() => handleCardPress()}
    >
      <View style={styles.stateOfMatchWrapper}>
        <Text style={styles.stateOfMatch(selectedMatch, id)}>
          {item.status_more}
        </Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.logoContainer(selectedMatch, id)}
          onPress={() => handleCardPressTeamHome()}
        >
          <Image
            source={{
              uri: item.home_score.has_logo
                ? "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg"
                : item.home_team.logo,
            }}
            resizeMode="contain"
            style={styles.logoImage}
          />
        </TouchableOpacity>
        <Text style={styles.scoreText(selectedMatch, id)}>
          {item.home_score.display}
        </Text>
        <Text style={styles.scoreText(selectedMatch, id)}>-</Text>
        <Text style={styles.scoreText(selectedMatch, id)}>
          {item.away_score.display}
        </Text>
        <TouchableOpacity
          style={styles.logoContainer(selectedMatch, id)}
          onPress={() => handleCardPressTeamAway()}
        >
          <Image
            source={{
              uri: item.away_score.has_logo
                ? "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg"
                : item.away_team.logo,
            }}
            resizeMode="contain"
            style={styles.logoImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.teamNameWrapper}>
        {item.home_team.name.length > 12 ? (
          <Text style={styles.teamName(selectedMatch, id)}>
            {item.home_team.name.substring(0, 12)}...
          </Text>
        ) : (
          <Text style={styles.teamName(selectedMatch, id)}>
            {item.home_team.name}
          </Text>
        )}
        {item.away_team.name.length > 12 ? (
          <Text style={styles.teamName(selectedMatch, id)}>
            {item.away_team.name.substring(0, 12)}...
          </Text>
        ) : (
          <Text style={styles.teamName(selectedMatch, id)}>
            {item.away_team.name}
          </Text>
        )}
      </View>
      <View style={styles.container}></View>
      <View style={{ ...styles.container, justifyContent: "flex-start" }}>
        <TouchableOpacity
          style={styles.logoLeagueContainer(selectedMatch, id)}
          onPress={() => handleCardPressLeague()}
        >
          {item.league.has_logo ? (
            <Image
              source={{
                uri: item.league.logo,
              }}
              resizeMode="contain"
              style={styles.logoImage}
            />
          ) : (
            <View></View>
          )}
        </TouchableOpacity>
        <View style={{ justifyContent: "center", paddingLeft: 5 }}>
          <Text style={styles.teamName(selectedMatch, id)}>
            {item.league.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  teamNameWrapper: {
    marginTop: SIZES.x3Small,
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: 1,
  },
  container: {
    marginTop: SIZES.x3Small,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  containerWrapper: (selectedMatch, id) => ({
    width: 250,
    padding: 14,
    borderRadius: SIZES.medium,
    ...SHADOWS.small,
    backgroundColor: selectedMatch === id ? COLORS.tertiary : COLORS.white,
    margin: SIZES.x3Small,
  }),
  logoContainer: (selectedMatch, id) => ({
    width: 50,
    height: 50,
    backgroundColor: selectedMatch === id ? COLORS.white : COLORS.lightWhite,
    borderRadius: SIZES.xLarge,
    justifyContent: "center",
    alignItems: "center",
  }),
  logoLeagueContainer: (selectedMatch, id) => ({
    width: 30,
    height: 30,
    backgroundColor: selectedMatch === id ? COLORS.white : COLORS.lightWhite,
    borderRadius: SIZES.xLarge,
    justifyContent: "center",
    alignItems: "center",
  }),
  logoImage: {
    width: "70%",
    height: "70%",
  },
  scoreText: (selectedMatch, id) => ({
    fontSize: SIZES.xxLarge,
    fontFamily: FONT.bold,
    color: selectedMatch === id ? COLORS.lightWhite : COLORS.tertiary,
  }),
  stateOfMatch: (selectedMatch, id) => ({
    fontSize: SIZES.xSmall,
    fontFamily: FONT.bold,
    color: selectedMatch === id ? COLORS.lightWhite : COLORS.tertiary,
  }),
  stateOfMatchWrapper: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  teamName: (selectedMatch, id) => ({
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    color: selectedMatch === id ? COLORS.lightWhite : COLORS.tertiary,
  }),
});

export default LiveMatchesCard;
