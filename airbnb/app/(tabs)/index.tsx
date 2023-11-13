import { Stack, Tabs } from "expo-router";
import React from "react";
import { View, Text } from "react-native";
import { ExploreHeader } from "@/components/exploreHeader";
import { Listings } from "@/components/listings";
import { useState } from "react";
import { useMemo } from "react";
import listingsData from "../../assets/data/dummyData.json";
const Page = () => {
  const [category, setCategory] = useState("Tiny homes");
// when the page reloads, it memorizes the data
  const items = useMemo(()=> listingsData as any, []);
  const onDataChanged = (category: string) => {
    setCategory(category);
  };
  return (
    <View style={{ flex: 1, marginTop:130}}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      <Listings listings={items} category={category} />
    </View>
  );
};

export default Page;
