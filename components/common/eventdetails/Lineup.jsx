import React, { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { SIZES } from "../../../constants";
import useFetchLineups from "../../../hook/useFetchLineups";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

// displays lineups of a team based on the players passed in and dictates
// how many lineups there should be
const Lineup = ({ eventId, type, amountOfLineups }) => {
  const router = useRouter();
  const { data, isLoading, error, refetch } = useFetchLineups(
    `${type}/${eventId}/lineups`,
    {}
  );

  useEffect(() => {
    refetch();
  }, [eventId]);

  const handlePlayerPress = (id, playerName) => {
    console.log("Inside function" + id + " " + playerName);
    return router.push({
      pathname: `/players-details/${id}`,
      params: { playersId: id, playersName: playerName },
    });
  };

  /**
   * The function `renderPlayer` takes in a player object and an index, and returns a React component
   * that displays the player's photo, name, and position.
   */
  const renderPlayer = (player, index) => (
    <TouchableOpacity
      key={index}
      style={styles.player}
      onPress={() => handlePlayerPress(player.player_id, player.player.name)}
    >
      <Image source={{ uri: player.player.photo }} style={styles.playerImage} />
      <Text style={styles.playerName}>{player.player.name}</Text>
      <Text style={styles.positionName}>{player.position_name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.formationText}>Lineups</Text>
      {isLoading ? (
        <ActivityIndicator size="large" colors="#312651" /> // Loading indicator for the data source
      ) : error ? (
        <Text>Something went wrong</Text> //  Something went wrong error message
      ) : (
        data?.data?.slice(0, amountOfLineups).map((lineup) => (
          <View key={lineup?.id} style={styles.lineupContainer}>
            <Text style={styles.formationText}>{lineup.formation}</Text>
            {Number(lineup?.formation?.split("-")[0]) === 1 ||
            Number(lineup?.formation?.split("-")[0]) === 2 ||
            Number(lineup?.formation?.split("-")[0]) === 3 ||
            Number(lineup?.formation?.split("-")[0]) === 4 ||
            Number(lineup?.formation?.split("-")[0]) === 5 ? (
              <View style={styles.playersContainer}>
                {/* Goalkeeper */}
                <View style={styles.row}>
                  {lineup?.lineup_players.slice(0, 1).map(renderPlayer)}
                </View>
                <View style={styles.row}>
                  {lineup?.lineup_players
                    ?.slice(1, Number(lineup?.formation.split("-")[0]) + 1)
                    .map(renderPlayer)}
                </View>
                <View style={styles.row}>
                  {lineup?.lineup_players
                    ?.slice(
                      Number(lineup?.formation.split("-")[0]) + 1,
                      Number(lineup?.formation.split("-")[0]) +
                        1 +
                        Number(lineup?.formation.split("-")[1])
                    )
                    .map(renderPlayer)}
                </View>
                <View style={styles.row}>
                  {lineup?.lineup_players
                    ?.slice(
                      Number(lineup?.formation.split("-")[0]) +
                        1 +
                        Number(lineup?.formation.split("-")[1]),
                      Number(lineup?.formation.split("-")[0]) +
                        1 +
                        Number(lineup?.formation.split("-")[1]) +
                        Number(lineup?.formation.split("-")[2])
                    )
                    .map(renderPlayer)}
                </View>
                {Number(lineup?.formation.split("-")[3]) ? (
                  <View style={styles.row}>
                    {lineup?.lineup_players
                      ?.slice(
                        Number(lineup?.formation.split("-")[0]) +
                          1 +
                          Number(lineup?.formation.split("-")[1]) +
                          Number(lineup?.formation.split("-")[2]),
                        Number(lineup?.formation.split("-")[0]) +
                          1 +
                          Number(lineup?.formation.split("-")[1]) +
                          Number(lineup?.formation.split("-")[2]) +
                          Number(lineup?.formation.split("-")[3])
                      )
                      .map(renderPlayer)}
                  </View>
                ) : null}
              </View>
            ) : (
              <Text>No lineup available</Text>
            )}
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  lineupContainer: {
    marginBottom: SIZES.large,
    alignItems: "center",
  },
  formationText: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    marginBottom: SIZES.xSmall,
  },
  playersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  player: {
    alignItems: "center",
    marginHorizontal: SIZES.xSmall,
    marginBottom: SIZES.xSmall,
  },
  playerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: SIZES.x3Small,
  },
  playerName: {
    fontSize: SIZES.xSmall,
    fontWeight: "bold",
    marginBottom: 2,
  },
  positionName: {
    fontSize: SIZES.xSmall,
    color: "gray",
  },
  row: {
    flexDirection: "row",
  },
});

export default Lineup;
