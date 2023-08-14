import { View, Text } from "react-native";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import useFetch from "../../hook/useFetch";
import { useEffect } from "react";
import TeamDetailsMainTop from "../../components/common/teamdetails/TeamDetailsMainTop";
import { ScrollView } from "react-native";
import { ActivityIndicator } from "react-native";
import ManagerInfo from "../../components/common/teamdetails/ManagerInfo";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import MoreInformation from "../../components/common/teamdetails/MoreInformation";
import TeamsMatches from "../../components/common/teamdetails/TeamsMatches";
import Lineup from "../../components/common/eventdetails/Lineup";
import TeamSeasons from "../../components/common/teamdetails/TeamSeasons";

const TeamDetailsPage = () => {
  const params = useLocalSearchParams();
  const id = params.teamId;
  const name = params.teamName;
  const { data, isLoading, error, refetch } = useFetch(`teams/${id}`, {});

  useEffect(() => {
    refetch();
  }, [params.teamId]);

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
                <TeamDetailsMainTop
                  item={data.data}
                  handleCardPress={() => {}}
                  index={0}
                  type="main-screen"
                />
              </View>
              <View style={[{ margin: 10 }, styles.cardContainer]}>
                <ManagerInfo item={data.data.manager} />
              </View>
              <View style={[{ margin: 5 }, styles.cardContainer]}>
                <Lineup eventId={id} type={"teams"} amountOfLineups={1} />
              </View>
              <View style={{ margin: 10 }}>
                <View style={styles.cardContainer}>
                  <Text style={styles.leagueText}>Upcoming Matches</Text>
                </View>
                <TeamsMatches id={id} type="teams" />
              </View>
              <View>
                <View style={styles.cardContainer}>
                  <Text style={styles.leagueText}>Past Seasons</Text>
                </View>
                <TeamSeasons id={id} type="teams" />
              </View>
              <MoreInformation data={data} type="teams" />
            </View>
          )}
        </ScrollView>
      </>
    </View>
  );
};

const TeamDetailsPageApp = () => {
  const queryClientTeamDetails = new QueryClient();
  return (
    <QueryClientProvider client={queryClientTeamDetails}>
      <TeamDetailsPage />
    </QueryClientProvider>
  );
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

export default TeamDetailsPageApp;
