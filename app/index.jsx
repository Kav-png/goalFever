import { View, Text } from "react-native";
import { Redirect } from "expo-router";

const StartPage = () => {
  return <Redirect href="/Home" />;
  // Force redirects to the home screen
};

export default StartPage;
