import { Tabs } from "expo-router";
import React from "react";
import { View, Text } from "react-native";
import Colors from "@/constants/Colors";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Explore",
        }}
      />
    </Tabs>
  );
};

export default Layout;
