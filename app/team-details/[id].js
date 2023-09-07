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
import Lineup from "../../components/common/eventdetails/Lineup";
import ManagerInfo from "../../components/common/teamdetails/ManagerInfo";
import MoreInformation from "../../components/common/teamdetails/MoreInformation";
import TeamDetailsMainTop from "../../components/common/teamdetails/TeamDetailsMainTop";
import TeamSeasons from "../../components/common/teamdetails/TeamSeasons";
import TeamsMatches from "../../components/common/teamdetails/TeamsMatches";
import useFetch from "../../hook/useFetch";
import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";

/**
 * `TeamDetailsPage`  displays details about a specific team,
 * including its manager, lineup, upcoming matches, past seasons,
 * and additional information.
 */
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
    ...SHADOWS.small,
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

export default TeamDetailsPageApp;
