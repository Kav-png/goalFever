import { Tabs } from "expo-router";

const tabsNavigator = () => {
  return (
    <Tabs>
      <Tabs.Screen name="Home" />
      <Tabs.Screen name="Stats" />
      <Tabs.Screen name="Maps" />
    </Tabs>
  );
};

export default tabsNavigator;
