import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ManagerTransfers from "../../components/common/managerdetails/ManagerTransfers";
import PlayerDetailsMainTop from "../../components/common/playerdetails/PlayerDetailsMainTop";
import MoreInformation from "../../components/common/teamdetails/MoreInformation";
import TeamSeasons from "../../components/common/teamdetails/TeamSeasons";
import { COLORS, FONT, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";

/**
 * `PlayerDetails` displays player details, including their
 * name, main team, past seasons, and additional information.
 */
const PlayerDetails = () => {
  const params = useLocalSearchParams();
  const id = params.playersId;
  const name = params.playersName;
  const { data, isLoading, error, refetch } = useFetch(`players/${id}`, {});

  useEffect(() => {
    refetch();
  }, [params.playersId]);

  return (
    <View>
      <Stack.Screen
        options={{
          headerStyle: {},
          headerShadowVisible: false,
          headerTitle: name,
        }}
      />
      <>
        <ScrollView>
          {isLoading ? (
            <ActivityIndicator size="large" colors="#312651" /> // Loading indicator for the data source
          ) : error ? (
            <Text>Something went wrong</Text> //  Something went wrong error message
          ) : (
            <View style={{ flexDirection: "column" }}>
              <View style={styles.cardContainer}>
                <PlayerDetailsMainTop item={data.data} type="players" />
              </View>
              {console.log(data.data[0]?.main_team[0].name)}
              <View style={{ margin: 5 }}>
                <ManagerTransfers id={id} type="players" />
              </View>
              <View>
                <View style={styles.cardContainer}>
                  <Text style={styles.leagueText}>Past Seasons</Text>
                </View>
              </View>
              <TeamSeasons id={id} type="players" />
              <MoreInformation data={data} type="players" />
            </View>
          )}
        </ScrollView>
      </>
    </View>
  );
};

const PlayerDetailsApp = () => {
  const queryClientPlayerDetails = new QueryClient();
  return (
    <QueryClientProvider client={queryClientPlayerDetails}>
      <PlayerDetails />
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    position: "relative",
    backgroundColor: COLORS.white,
    borderRadius: SIZES.xSmall,
    margin: SIZES.xSmall,
    padding: SIZES.xSmall,
    justifyContent: "center",
  },
  leagueText: {
    fontSize: SIZES.medium,
    fontFamily: FONT.bold,
    color: "#312651",
  },
});

export default PlayerDetailsApp;
