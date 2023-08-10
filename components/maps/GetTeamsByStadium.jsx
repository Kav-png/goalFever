import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

const GetTeamsByStadium = () => {
  const [stadiumData, setStadiumData] = useState({});

  useEffect(() => {
    // Load the JSON data from the file
    const loadStadiumData = async () => {
      try {
        const response = await fetch("./stadium.json");
        const data = await response.json();
        console.log("Stadium data loaded:", data);
        setStadiumData(data);
      } catch (error) {
        console.error("Error loading stadium data:", error);
      }
    };

    loadStadiumData();
  }, []);

  // Function to search for teams based on stadium name
  const searchTeamsByStadium = (stadiumName) => {
    const teams = [];

    for (const country in stadiumData) {
      const countryStadiums = stadiumData[country];

      for (const stadium of countryStadiums) {
        if (
          stadium.stadium_name.toLowerCase().includes(stadiumName.toLowerCase())
        ) {
          teams.push(stadium.team);
        }
      }
    }

    return teams;
  };

  // Example usage: search for teams based on stadium name
  const teamsForStadium = searchTeamsByStadium("Stamford Bridge");

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
