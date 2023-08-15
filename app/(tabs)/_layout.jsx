import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const tabsNavigator = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="Home"
        options={{
          headerShown: false,
          tabBarIcon: () => <Feather name="home" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="Maps"
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="google-maps"
              size={24}
              color="black"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default tabsNavigator;
