import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import stringSimilarity from "string-similarity";
import { COLORS, SIZES } from "../../../constants";
import SearchTeamCardContainer from "../../common/cards/searchcomponents/SearchTeamCardContainer";
import stadiumData from "../stadiumData.json";

// Component to search for teams based on stadium name
// This component is used in the SearchScreen
// It takes in the address as a prop and returns the teams that play in
// that stadium
// uses json file with stadium data to search for teams
const GetTeamsByStadium = ({ address, setIsMoreInformationAvailable }) => {
  const [searchedTeams, setSearchedTeams] = useState([]);

  // Function to search for teams based on stadium name
  const searchTeamsByStadium = (stadiumName) => {
    const teams = [];
    setIsMoreInformationAvailable(false);

    for (const country in stadiumData) {
      const countryStadiums = stadiumData[country];

      for (const stadium of countryStadiums) {
        const similarity = stringSimilarity.compareTwoStrings(
          stadium.stadium_name.toLowerCase(),
          stadiumName.toLowerCase()
        );

        // Adjust the similarity threshold as needed
        if (similarity > 0.6) {
          teams.push(stadium.team);
        }
      }
    }
    if (teams) {
      setIsMoreInformationAvailable(true);
      return teams;
    } else {
      setIsMoreInformationAvailable(false);
      return teams;
    }
  };

  // Function to search for teams based on address
  const searchTeamsByAddress = (address) => {
    const teams = [];

    for (const country in stadiumData) {
      const countryStadiums = stadiumData[country];

      for (const stadium of countryStadiums) {
        const similarity = stringSimilarity.compareTwoStrings(
          stadium.team.toLowerCase(),
          address.toLowerCase()
        );

        // Adjust the similarity threshold as needed
        if (similarity > 0.6) {
          teams.push(stadium.team);
        }
      }
    }
    if (teams) {
      setIsMoreInformationAvailable(true);
      return teams;
    } else {
      setIsMoreInformationAvailable(false);
      return teams;
    }
  };

  // Whenever address changes, run both search functions and update the results that are displayed
  useEffect(() => {
    const teamsByStadium = searchTeamsByStadium(address);
    const teamsByAddress = searchTeamsByAddress(address);

    // Combine and remove duplicates from both arrays
    const allTeams = [...new Set([...teamsByStadium, ...teamsByAddress])];

    setSearchedTeams(allTeams);
  }, [address]);

  return (
    <View style={styles.container}>
      {searchedTeams.map((team, index) => (
        <View key={index}>
          <Text style={styles.text} key={index}>
            {team}
          </Text>
          <SearchTeamCardContainer teams={team} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: COLORS.white,
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: SIZES.xSmall,
  },
  container: {
    backgroundColor: "lightblue",
    borderRadius: SIZES.xSmall,
  },
});

export default GetTeamsByStadium;
