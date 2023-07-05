import { Tabs } from "expo-router";

const tabsNavigator = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Maps"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="News"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default tabsNavigator;
