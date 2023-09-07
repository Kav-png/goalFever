import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AnimatedStatistics from "../../components/common/eventdetails/AnimatedStatistics";
import EventDetailsMainTop from "../../components/common/eventdetails/EventDetailsMainTop";
import Lineup from "../../components/common/eventdetails/Lineup";
import OddsBar from "../../components/common/eventdetails/OddsBar";
import MoreInformation from "../../components/common/teamdetails/MoreInformation";
import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";

/**
 * The `EventDetailsPage` displays details of a specific event,
 * including its main odds, lineup, league information, round information, and season information
 */
const EventDetailsPage = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const id = params.eventId;
  const { data, isLoading, error, refetch } = useFetch(`events/${id}`, {});

  useEffect(() => {
    refetch();
  }, [params.eventId]);

  const handleCardPressLeague = () => {
    const leaguesId = data.data?.league?.id;
    const leaguesName = data.data?.league?.name;
    return router.push({
      pathname: `/leagues-details/${id}`,
      params: { leaguesId: leaguesId, leaguesName: leaguesName },
    });
  };

  return (
    <View>
      <Stack.Screen
        options={{
          headerStyle: {},
          headerShadowVisible: false,
          headerTitle: "",
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
              <View
                style={[
                  {
                    width: "95%",
                  },
                  styles.cardContainer,
                ]}
              >
                <EventDetailsMainTop item={data.data} />
              </View>
              {data.data?.main_odds ? (
                <View style={styles.cardContainer}>
                  <OddsBar
                    label="Win"
                    value={data.data?.main_odds?.outcome_1?.value}
                    change={data.data?.main_odds?.outcome_1?.change}
                  />
                  <OddsBar
                    label="Draw"
                    value={data.data?.main_odds?.outcome_X?.value}
                    change={data.data?.main_odds?.outcome_X?.change}
                  />
                  <OddsBar
                    label="Loss"
                    value={data.data?.main_odds?.outcome_2?.value}
                    change={data.data?.main_odds?.outcome_2?.change}
                  />
                </View>
              ) : null}
              <View style={[{ margin: 5 }, styles.cardContainer]}>
                <Lineup eventId={id} type={"events"} amountOfLineups={2} />
              </View>
              <View>
                {data.data?.league ? (
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={styles.logoLeagueContainer}
                      onPress={() => handleCardPressLeague()}
                    >
                      {data.data.league?.has_logo ? (
                        <Image
                          source={{
                            uri: data.data?.league.logo,
                          }}
                          resizeMode="contain"
                          style={styles.logoImage}
                        />
                      ) : (
                        <View></View>
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[{ paddingHorizontal: 50 }, styles.cardContainer]}
                      onPress={() => handleCardPressLeague()}
                    >
                      <Text style={styles.leagueText}>
                        {data.data?.league.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
                {data.data?.round_info ? (
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={[{ paddingHorizontal: 50 }, styles.cardContainer]}
                    >
                      <Text style={styles.leagueText}>
                        Round - {data.data?.round_info.round}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
                {data.data?.season ? (
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      style={[{ paddingHorizontal: 50 }, styles.cardContainer]}
                    >
                      <Text style={styles.leagueText}>
                        {data.data?.season.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
                <TouchableOpacity
                  style={[{ margin: 5 }, styles.cardContainer]}
                  onPress={() => refetch()}
                >
                  <Text style={styles.leagueText}>Reload Information</Text>
                </TouchableOpacity>
                <MoreInformation data={data} />
              </View>
              <View style={[{ margin: 5 }, styles.cardContainer]}>
                <AnimatedStatistics eventId={id} />
              </View>
            </View>
          )}
        </ScrollView>
      </>
    </View>
  );
};

const EventDetailsPageApp = () => {
  const queryClientEventDetails = new QueryClient();
  return (
    <QueryClientProvider client={queryClientEventDetails}>
      <EventDetailsPage />
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

export default EventDetailsPageApp;
