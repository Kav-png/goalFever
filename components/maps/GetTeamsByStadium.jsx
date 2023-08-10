// import React, { useState, useEffect } from "react";
// import { View, Text } from "react-native";

// const GetTeamsByStadium = () => {
//   const [stadiumData, setStadiumData] = useState({});

//   useEffect(() => {
//     // Load the JSON data from the file
//     const loadStadiumData = async () => {
//       try {
//         const response = await fetch("./stadium.json");
//         const data = await response.json();
//         console.log("Stadium data loaded:", data);
//         setStadiumData(data);
//       } catch (error) {
//         console.error("Error loading stadium data:", error);
//       }
//     };

//     loadStadiumData();
//   }, []);

//   // Function to search for teams based on stadium name
//   const searchTeamsByStadium = (stadiumName) => {
//     const teams = [];

//     for (const country in stadiumData) {
//       const countryStadiums = stadiumData[country];

//       for (const stadium of countryStadiums) {
//         if (
//           stadium.stadium_name.toLowerCase().includes(stadiumName.toLowerCase())
//         ) {
//           teams.push(stadium.team);
//         }
//       }
//     }

//     return teams;
//   };

//   // Example usage: search for teams based on stadium name
//   const teamsForStadium = searchTeamsByStadium("Stamford Bridge");

//   return (
//     <View>
//       <Text>Teams for Stadium:</Text>
//       {teamsForStadium.map((team, index) => (
//         <Text key={index}>{team}</Text>
//       ))}
//     </View>
//   );
// };

// export default GetTeamsByStadium;

// import React, { useState } from "react";
// import { View, Text, ScrollView } from "react-native";
// import stadiumData from "./stadium.json"; // Adjust the path accordingly

// const GetTeamsByStadium = () => {
//   const [searchedTeams, setSearchedTeams] = useState([]);

//   // Function to search for teams based on stadium name
//   const searchTeamsByStadium = (stadiumName) => {
//     const teams = [];

//     for (const country in stadiumData) {
//       const countryStadiums = stadiumData[country];

//       for (const stadium of countryStadiums) {
//         if (
//           stadium.stadium_name.toLowerCase().includes(stadiumName.toLowerCase())
//         ) {
//           teams.push(stadium.team);
//         }
//       }
//     }

//     return teams;
//   };

//   // Example usage: search for teams based on stadium name
//   const teamsForStadium = searchTeamsByStadium("Old");

//   return (
//     <ScrollView>
//       <Text>Teams for Stadium:</Text>
//       {teamsForStadium.map((team, index) => (
//         <Text key={index}>{team}</Text>
//       ))}
//     </ScrollView>
//   );
// };

// export default GetTeamsByStadium;
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
