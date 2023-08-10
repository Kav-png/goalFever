import React, { useState } from "react";
import { View, Text } from "react-native";
import stadiumData from "./stadiumData.json";
import stringSimilarity from "string-similarity"; // Import the string-similarity package

const GetTeamsByStadium = () => {
  const [searchedTeams, setSearchedTeams] = useState([]);

  // Function to search for teams based on stadium name
  const searchTeamsByStadium = (stadiumName) => {
    const teams = [];

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

    return teams;
  };

  // Example usage: search for teams based on stadium name
  const teamsForStadium = searchTeamsByStadium("OlD"); // Replace 'Stade' with your search term

  return (
    <View>
      <Text>Teams for Stadium:</Text>
      {teamsForStadium.map((team, index) => (
        <Text key={index}>{team}</Text>
      ))}
    </View>
  );
};

export default GetTeamsByStadium;
