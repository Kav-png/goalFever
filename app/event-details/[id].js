import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import useFetch from "../../hook/useFetch";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import EventDetailsMainTop from "../../components/common/eventdetails/EventDetailsMainTop";
import OddsBar from "../../components/common/eventdetails/OddsBar";
import { Image } from "react-native";
import Lineup from "../../components/common/eventdetails/Lineup";
import AnimatedStatistics from "../../components/common/eventdetails/AnimatedStatistics";

const EventDetailsPage = () => {
  const params = useLocalSearchParams();
  const id = params.eventId;
  const { data, isLoading, error, refetch } = useFetch(`events/${id}`, {});

  useEffect(() => {
    refetch();
  }, [params.eventId]);
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
                <Lineup eventId={id} />
              </View>
              <View style={[{ margin: 5 }, styles.cardContainer]}>
                <AnimatedStatistics eventId={id} />
              </View>
              <View>
                {data.data?.league ? (
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity style={styles.logoLeagueContainer}>
                      {data.data.league?.has_logo ? (
                        <Image
                          source={{
                            uri: data.data.league.logo,
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
                    >
                      <Text style={styles.leagueText}>
                        {data.data.league.name}
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
                        Round - {data.data.round_info.round}
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
                        {data.data.season.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
                {data.data?.venue ? (
                  <View>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={[
                          { paddingHorizontal: 50 },
                          styles.cardContainer,
                        ]}
                      >
                        <Text style={styles.leagueText}>
                          {data.data.venue.stadium?.en}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          { paddingHorizontal: 50 },
                          styles.cardContainer,
                        ]}
                      >
                        <Text style={styles.leagueText}>
                          {data.data.venue.city.en}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {data.data.venue.country_name?.en ? (
                      <TouchableOpacity
                        style={[
                          { paddingHorizontal: 50 },
                          styles.cardContainer,
                        ]}
                      >
                        <Text style={styles.leagueText}>
                          {data.data.venue.country_name.en}
                        </Text>
                      </TouchableOpacity>
                    ) : null}
                    {data.data.attendance ? (
                      <TouchableOpacity
                        style={[
                          { paddingHorizontal: 50 },
                          styles.cardContainer,
                        ]}
                      >
                        <Text style={styles.leagueText}>
                          Attendance - {data.data.attendance}
                        </Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                ) : null}
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

export default EventDetailsPageApp;
