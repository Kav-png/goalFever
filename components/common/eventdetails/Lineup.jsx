import React from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import useFetch from "../../../hook/useFetch";
import { useEffect } from "react";
import useFetchLineups from "../../../hook/useFetchLineups";
import data from "./lineupData.json";

const Lineup = ({ eventId }) => {
  const { data, isLoading, error, refetch } = useFetchLineups(
    `events/${eventId}/lineups`,
    {}
  );

  useEffect(() => {
    refetch();
  }, [eventId]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#312651" />;
  } else if (error) {
    return <Text>Something went wrong</Text>;
  }
  /**
   * The function `renderPlayer` takes in a player object and an index, and returns a React component
   * that displays the player's photo, name, and position.
   */
  const renderPlayer = (player, index) => (
    <View key={index} style={styles.player}>
      <Image source={{ uri: player.player.photo }} style={styles.playerImage} />
      <Text style={styles.playerName}>{player.player.name}</Text>
      <Text style={styles.positionName}>{player.position_name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.formationText}>Predicted / Confirmed Lineups</Text>
      {data.data.slice(0, 2).map((lineup) => (
        <View key={lineup.id} style={styles.lineupContainer}>
          <Text style={styles.formationText}>{lineup.formation}</Text>
          <View style={styles.playersContainer}>
            {/* Goalkeeper */}
            <View style={styles.row}>
              {lineup.lineup_players.slice(0, 1).map(renderPlayer)}
            </View>
            <View style={styles.row}>
              {lineup.lineup_players
                .slice(1, Number(lineup.formation.split("-")[0]) + 1)
                .map(renderPlayer)}
            </View>
            <View style={styles.row}>
              {lineup.lineup_players
                .slice(
                  Number(lineup.formation.split("-")[0]) + 1,
                  Number(lineup.formation.split("-")[0]) +
                    1 +
                    Number(lineup.formation.split("-")[1])
                )
                .map(renderPlayer)}
            </View>
            <View style={styles.row}>
              {lineup.lineup_players
                .slice(
                  Number(lineup.formation.split("-")[0]) +
                    1 +
                    Number(lineup.formation.split("-")[1]),
                  Number(lineup.formation.split("-")[0]) +
                    1 +
                    Number(lineup.formation.split("-")[1]) +
                    Number(lineup.formation.split("-")[2])
                )
                .map(renderPlayer)}
            </View>
            {Number(lineup.formation.split("-")[3]) ? (
              <View style={styles.row}>
                {lineup.lineup_players
                  .slice(
                    Number(lineup.formation.split("-")[0]) +
                      1 +
                      Number(lineup.formation.split("-")[1]) +
                      Number(lineup.formation.split("-")[2]),
                    Number(lineup.formation.split("-")[0]) +
                      1 +
                      Number(lineup.formation.split("-")[1]) +
                      Number(lineup.formation.split("-")[2]) +
                      Number(lineup.formation.split("-")[3])
                  )
                  .map(renderPlayer)}
              </View>
            ) : null}
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  lineupContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  formationText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  playersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  player: {
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 10,
  },
  playerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  playerName: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 2,
  },
  positionName: {
    fontSize: 10,
    color: "gray",
  },
  row: {
    flexDirection: "row",
  },
});

export default Lineup;
