import { View, Text } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import TeamsMatches from "../../components/common/teamdetails/TeamsMatches";
import PlayerDetailsMainTop from "../../components/common/playerdetails/PlayerDetailsMainTop";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TeamSeasons from "../../components/common/teamdetails/TeamSeasons";
import useFetch from "../../hook/useFetch";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";
import TeamDetailsMainTop from "../../components/common/teamdetails/TeamDetailsMainTop";

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
                <PlayerDetailsMainTop item={data.data} type="leagues" />
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

const LeagueDetailsApp = () => {
  const queryClientLeagueDetails = new QueryClient();
  return (
    <QueryClientProvider client={queryClientLeagueDetails}>
      <LeagueDetails />
    </QueryClientProvider>
  );
};

export default LeagueDetailsApp;
