import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PlayerDetailsMainTop from "../../components/common/playerdetails/PlayerDetailsMainTop";
import TeamDetailsMainTop from "../../components/common/teamdetails/TeamDetailsMainTop";
import TeamSeasons from "../../components/common/teamdetails/TeamSeasons";
import TeamsMatches from "../../components/common/teamdetails/TeamsMatches";
import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";

/**
 * LeagueDetails` displays details
 *  about a league, including the title holders, most titles, recent matches, and team seasons.
 */
const LeagueDetails = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = params.leaguesId;
  const name = params.leaguesName;
  const { data, isLoading, error, refetch } = useFetch(`leagues/${id}`, {});

  useEffect(() => {
    refetch();
  }, [params.leaguesId]);

  const handleCardPressTitle = (index) => {
    const teamId = data.data.title_holder_team?.id;
    const teamName = data.data.title_holder_team?.name;
    return router.push({
      pathname: `/team-details/${teamId}`,
      params: { teamId: teamId, teamName: teamName },
    });
  };

  const handleCardPressMostTitles = (index) => {
    const teamId = data.data.most_titles_team?.id;
    const teamName = data.data.most_titles_team?.name;
    return router.push({
      pathname: `/team-details/${teamId}`,
      params: { teamId: teamId, teamName: teamName },
    });
  };

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
              <View style={{ margin: 10 }}>
                {data.data?.name ? (
                  <PlayerDetailsMainTop item={data.data} type="leagues" />
                ) : null}
                {data.data?.title_holder_team ? (
                  <View>
                    <View style={styles.cardContainer}>
                      <Text style={styles.leagueText}>Title Holders</Text>
                    </View>
                    <View style={styles.cardContainer}>
                      <TeamDetailsMainTop
                        item={data.data.title_holder_team}
                        handleCardPress={handleCardPressTitle}
                        index={0}
                        type="pressable"
                      />
                    </View>
                  </View>
                ) : null}
                {data.data?.most_titles_team ? (
                  <View>
                    <View style={styles.cardContainer}>
                      <Text style={styles.leagueText}>Most Titles</Text>
                    </View>
                    <View style={styles.cardContainer}>
                      <TeamDetailsMainTop
                        item={data.data.most_titles_team}
                        handleCardPress={handleCardPressMostTitles}
                        index={0}
                        type="pressable"
                      />
                    </View>
                  </View>
                ) : null}
                <View style={styles.cardContainer}>
                  <Text style={styles.leagueText}>Recent Matches</Text>
                </View>
                <TeamsMatches id={id} type="leagues" />
              </View>
              <TeamSeasons id={id} type="leagues" />
            </View>
          )}
        </ScrollView>
      </>
    </View>
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

const LeagueDetailsApp = () => {
  const queryClientLeagueDetails = new QueryClient();
  return (
    <QueryClientProvider client={queryClientLeagueDetails}>
      <LeagueDetails />
    </QueryClientProvider>
  );
};

export default LeagueDetailsApp;
