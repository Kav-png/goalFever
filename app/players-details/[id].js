import { View, Text } from "react-native";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import useFetch from "../../hook/useFetch";
import PlayerDetailsMainTop from "../../components/common/playerdetails/PlayerDetailsMainTop";
import TeamSeasons from "../../components/common/teamdetails/TeamSeasons";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";
import ManagerTransfers from "../../components/common/managerdetails/ManagerTransfers";
import TeamDetailsMainTop from "../../components/common/teamdetails/TeamDetailsMainTop";
import { TouchableOpacity } from "react-native";
import MoreInformation from "../../components/common/teamdetails/MoreInformation";

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
    backgroundColor: "white",
    borderRadius: 10,
    margin: 10,
    padding: 10,
    justifyContent: "center",
  },
  leagueText: {
    fontSize: 16,
    fontFamily: "DMBold",
    color: "#312651",
  },
});

export default PlayerDetailsApp;
