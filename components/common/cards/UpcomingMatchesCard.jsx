import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

// Displays Data of each match that has been selected in the data array
// Has a conditional rendering that checks if the sections of
// data structure is available ot not and rendering only ones that are available
const UpcomingMatchesCard = ({ item, selectedMatch }) => {
  const id = item?.id;
  const router = useRouter();

  /**
   * The handleCardPress set defines four functions that handle different card press events
   * and navigate to different
   * routes using expo router, leading to the details page of selected route
   */
  const handleCardPress = () => {
    const eventId = item?.id;
    return router.push({
      pathname: `/event-details/${eventId}`,
      params: { eventId: eventId },
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
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={styles.containerWrapper(selectedMatch, id)}
        onPress={() => handleCardPress()}
      >
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
          {item.home_team.name?.length > 18 ? (
            <Text style={styles.teamName(selectedMatch, id)}>
              {item.home_team.name?.substring(0, 18)}...
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
            <TouchableOpacity
              style={styles.logoLeagueContainer(selectedMatch, id)}
              onPress={() => handleCardPressLeague()}
            >
              {item.league?.has_logo ? (
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
          </View>
          <Text style={styles.stateOfMatch(selectedMatch, id)}>
            {item.section?.name}
          </Text>
        </View>
      </TouchableOpacity>
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
  logoLeagueContainer: (selectedMatch, id) => ({
    width: 30,
    height: 30,
    backgroundColor: selectedMatch === id ? "#FFF" : "#F3F4F8",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  }),
});

export default UpcomingMatchesCard;
