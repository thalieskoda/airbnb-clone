import { Stack, Tabs } from "expo-router";
import React from "react";
import { View, Text } from "react-native";
import { ExploreHeader } from "@/components/exploreHeader";
import { Listings } from "@/components/listings";
import { useState } from "react";
const Page = () => {
  const [category, setCategory] = useState("Tiny homes");
  const onDataChanged = (category: string) => {
    console.log("CHANGED:", category);
    setCategory(category);
  };
  return (
    <View style={{ flex: 1, marginTop:130}}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      <Listings listings={[]} category={category} />
    </View>
  );
};

export default Page;
