import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import axios from "axios";

const NearbyRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://192.168.55.114:19000/api/nearby",
          {
            params: {
              lat: 40.748817,
              lon: -73.985428,
              tag: "restaurant",
              radius: 50,
            },
          }
        );
        setRestaurants(response.data);
      } catch (error) {
        console.error("Error fetching nearby restaurants:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text>Nearby Restaurants:</Text>
      {restaurants.map((restaurant) => (
        <Text key={restaurant.place_id}>{restaurant.name}</Text>
      ))}
    </View>
  );
};

export default NearbyRestaurants;
